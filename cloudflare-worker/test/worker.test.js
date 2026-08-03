import assert from 'node:assert/strict';
import test from 'node:test';
import worker from '../src/index.js';

const allowedOrigin = 'https://codeholic08.github.io';

function request(question, origin = allowedOrigin) {
  return new Request('https://worker.example/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: origin,
    },
    body: JSON.stringify({ question }),
  });
}

function environment(success = true) {
  return {
    ALLOWED_ORIGIN: allowedOrigin,
    GEMINI_API_KEY: 'test-key',
    GEMINI_MODEL: 'gemini-3.5-flash-lite',
    CHAT_RATE_LIMITER: {
      limit: async () => ({ success }),
    },
  };
}

test('blocks requests from other origins', async () => {
  const response = await worker.fetch(request('What are his skills?', 'https://example.com'), environment());
  assert.equal(response.status, 403);
});

test('refuses an unrelated question without calling Gemini', async () => {
  const originalFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    throw new Error('Gemini should not be called');
  };

  try {
    const response = await worker.fetch(request('What is the capital of France?'), environment());
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.match(body.answer, /only answer questions about Maaz/i);
    assert.equal(called, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('returns a concise Gemini answer for an in-scope question', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, options) => {
    const requestBody = JSON.parse(options.body);
    assert.equal(requestBody.generationConfig.maxOutputTokens, 1024);
    assert.equal(requestBody.generationConfig.thinkingConfig.thinkingLevel, 'minimal');
    assert.match(requestBody.systemInstruction.parts[0].text, /Vice President of Communications, NYU Graduate Student Council/);
    assert.match(requestBody.systemInstruction.parts[0].text, /6,000\+ students/);
    assert.match(requestBody.systemInstruction.parts[0].text, /Write for a non-technical reader by default/);
    assert.match(requestBody.systemInstruction.parts[0].text, /Avoid acronyms, product names, architecture details/);
    assert.match(requestBody.contents[0].parts[0].text, /PLAIN-LANGUAGE MODE \(mandatory\)/);
    assert.match(requestBody.contents[0].parts[0].text, /no bullet list/);
    assert.doesNotMatch(requestBody.systemInstruction.parts[0].text, /929.*726.*4505/);
    return new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: 'Maaz works on vector search at NYU.' }] } }],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };

  try {
    const response = await worker.fetch(request('What is Maaz working on?'), environment());
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.answer, 'Maaz works on vector search at NYU.');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('returns the resume PDF directly without calling Gemini', async () => {
  const originalFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    throw new Error('Gemini should not be called for direct resources');
  };

  try {
    const response = await worker.fetch(request('Give me his resume'), environment());
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.links.length, 1);
    assert.equal(body.links[0].label, 'Open resume PDF');
    assert.equal(body.links[0].url, 'https://codeholic08.github.io/Resume.pdf');
    assert.equal(called, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('returns requested social profile links directly', async () => {
  const response = await worker.fetch(request('Share his LinkedIn, Instagram, and GitHub'), environment());
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(body.links.map((link) => link.label), ['Open LinkedIn', 'Open GitHub', 'Open Instagram']);
  assert.ok(body.links.every((link) => link.url.startsWith('https://')));
});

test('enforces the server rate limit', async () => {
  const response = await worker.fetch(request('What are Maaz skills?'), environment(false));
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Retry-After'), '60');
});

test('caps generated answers at 120 words', async () => {
  const originalFetch = globalThis.fetch;
  const longAnswer = Array.from({ length: 140 }, (_, index) => `word${index + 1}`).join(' ');
  globalThis.fetch = async () => new Response(JSON.stringify({
    candidates: [{ content: { parts: [{ text: longAnswer }] } }],
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  try {
    const response = await worker.fetch(request('Summarize Maaz experience'), environment());
    const body = await response.json();
    assert.equal(body.answer.split(/\s+/).length, 120);
    assert.match(body.answer, /\.\.\.$/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
