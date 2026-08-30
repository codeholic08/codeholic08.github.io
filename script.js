const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

function closeMenu() {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileNav.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
});

const portraitCarousel = document.querySelector('[data-portrait-carousel]');
const portraitToggles = document.querySelector('[data-portrait-toggles]');

if (portraitCarousel && portraitToggles) {
  const slides = Array.from(portraitCarousel.querySelectorAll('.portrait-slide'));
  const toggles = Array.from(portraitToggles.querySelectorAll('.portrait-toggle'));
  let activeSlide = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (activeSlide < 0) activeSlide = 0;
  let autoAdvance;

  function showPortraitSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === activeSlide));
    toggles.forEach((toggle, i) => {
      toggle.classList.toggle('is-active', i === activeSlide);
      toggle.setAttribute('aria-selected', String(i === activeSlide));
    });
  }

  function startPortraitAutoAdvance() {
    window.clearInterval(autoAdvance);
    autoAdvance = window.setInterval(() => showPortraitSlide(activeSlide + 1), 15000);
  }

  toggles.forEach((toggle, i) => {
    toggle.addEventListener('click', () => {
      showPortraitSlide(i);
      startPortraitAutoAdvance();
    });
  });

  startPortraitAutoAdvance();
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealItems.forEach((item) => observer.observe(item));
}

function splitIntoWords(el) {
  const tokens = el.textContent.split(/(\s+)/);
  el.textContent = '';
  let wordIndex = 0;
  tokens.forEach((token) => {
    if (!token.length) return;
    if (/^\s+$/.test(token)) {
      el.append(token);
      return;
    }
    const mask = document.createElement('span');
    mask.className = 'word-mask';
    const inner = document.createElement('span');
    inner.className = 'word-inner';
    inner.textContent = token;
    inner.style.transitionDelay = `${Math.min(wordIndex * 28, 600)}ms`;
    mask.append(inner);
    el.append(mask);
    wordIndex += 1;
  });
}

const wordRevealItems = document.querySelectorAll('.reveal-words');

if (reduceMotion || !('IntersectionObserver' in window)) {
  wordRevealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  wordRevealItems.forEach(splitIntoWords);
  const wordObserver = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });

  wordRevealItems.forEach((item) => wordObserver.observe(item));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', link.getAttribute('href'));
  });
});

const backToTopFab = document.querySelector('[data-back-to-top]');
if (backToTopFab) {
  const toggleBackToTop = () => {
    backToTopFab.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  backToTopFab.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

const chatRoot = document.querySelector('[data-portfolio-chat]');
const chatApiUrl = chatRoot?.dataset.apiUrl?.trim();
const chatPreview = new URLSearchParams(window.location.search).has('chat-preview');

if (chatRoot && (chatApiUrl || chatPreview)) {
  const launcher = chatRoot.querySelector('.chat-launcher');
  const panel = chatRoot.querySelector('.chat-panel');
  const closeButton = chatRoot.querySelector('.chat-close');
  const messages = chatRoot.querySelector('.chat-messages');
  const form = chatRoot.querySelector('.chat-form');
  const input = chatRoot.querySelector('textarea');
  const sendButton = chatRoot.querySelector('.chat-send');
  const status = chatRoot.querySelector('[data-chat-status]');
  const length = chatRoot.querySelector('[data-chat-length]');
  const suggestions = chatRoot.querySelector('.chat-suggestions');
  const sessionLimit = 10;
  const countKey = 'mmr-chat-question-count';
  let questionCount = Number.parseInt(sessionStorage.getItem(countKey) || '0', 10);
  let requestPending = false;

  chatRoot.hidden = false;

  function updateUsage() {
    const remaining = Math.max(0, sessionLimit - questionCount);
    status.textContent = remaining === 1 ? '1 question left this session' : `${remaining} questions left this session`;
    input.disabled = remaining === 0;
    sendButton.disabled = requestPending || remaining === 0;
    if (remaining === 0) input.placeholder = 'Session limit reached';
  }

  function setChatOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    launcher.querySelector('.chat-launcher-symbol').textContent = open ? '\u2212' : '+';
    if (open) window.setTimeout(() => input.focus(), 50);
  }

  function addMessage(role, text, extraClass = '', links = []) {
    const message = document.createElement('div');
    message.className = `chat-message chat-message-${role}${extraClass ? ` ${extraClass}` : ''}`;
    const label = document.createElement('span');
    label.textContent = role === 'user' ? 'YOU' : 'MMR';
    const content = document.createElement('p');
    content.textContent = text;
    message.append(label, content);

    if (role === 'assistant' && Array.isArray(links) && links.length) {
      const linkList = document.createElement('div');
      linkList.className = 'chat-response-links';
      links.forEach((link) => {
        if (!link || typeof link.label !== 'string' || typeof link.url !== 'string') return;
        let url;
        try {
          url = new URL(link.url);
        } catch {
          return;
        }
        if (!['https:', 'mailto:'].includes(url.protocol)) return;
        const anchor = document.createElement('a');
        anchor.href = url.href;
        anchor.textContent = link.label;
        if (url.protocol === 'https:') {
          anchor.target = '_blank';
          anchor.rel = 'noopener';
        }
        linkList.append(anchor);
      });
      if (linkList.childElementCount) message.append(linkList);
    }

    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  }

  async function askQuestion(question) {
    if (requestPending || questionCount >= sessionLimit) return;
    const cleanQuestion = question.trim().slice(0, 350);
    if (!cleanQuestion) return;

    suggestions?.remove();
    addMessage('user', cleanQuestion);
    input.value = '';
    input.style.height = '';
    length.textContent = '0';
    requestPending = true;
    updateUsage();
    const loading = addMessage('assistant', 'Thinking', 'chat-message-loading');

    try {
      if (!chatApiUrl) throw new Error('The secure chat service is not connected yet.');
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 18000);
      const response = await fetch(chatApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: cleanQuestion }),
        signal: controller.signal,
      });
      window.clearTimeout(timeout);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'The assistant is unavailable right now.');

      loading.remove();
      addMessage('assistant', data.answer || "I don't have that information in Maaz's portfolio.", '', data.links);
      questionCount += 1;
      sessionStorage.setItem(countKey, String(questionCount));
    } catch (error) {
      loading.remove();
      const message = error.name === 'AbortError' ? 'The response took too long. Please try again.' : error.message;
      addMessage('assistant', message, 'chat-message-error');
    } finally {
      requestPending = false;
      updateUsage();
    }
  }

  launcher.addEventListener('click', () => setChatOpen(panel.hidden));
  closeButton.addEventListener('click', () => setChatOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) setChatOpen(false);
  });

  input.addEventListener('input', () => {
    length.textContent = String(input.value.length);
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 100)}px`;
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    askQuestion(input.value);
  });
  suggestions?.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => askQuestion(button.textContent));
  });

  updateUsage();
}
