# Mohammad Maaz Rashid Portfolio - Customization Guide

## ✅ Portfolio Status: Complete!

Your portfolio has been fully populated with your actual information including:
- ✅ Personal details (Name, Location, Contact)
- ✅ Professional experience (Qualcomm, Barclays)
- ✅ Education (NYU MS, SRM BTech)
- ✅ Technical skills (ML/AI, Cloud, Programming)
- ✅ Projects (Focus Assist, ResNet Optimization)

## 🎨 Optional Customizations

You may want to customize these elements:

### 1. Add Your Photo
Replace the placeholder image:
```html
<img src="your-photo.jpg" alt="Mohammad Maaz Rashid" id="profile-img">
```

### 2. Update Social Links
Add your actual LinkedIn and GitHub URLs:
```html
<a href="https://linkedin.com/in/your-linkedin" target="_blank" class="contact-link">
<a href="https://github.com/your-github" target="_blank" class="contact-link">
```

### 3. Customize Colors
The primary color `#007acc` can be changed throughout `styles.css` for personal branding.

### 4. Add More Projects
You can add additional projects to the Projects section following the same timeline format.

## 🚀 Deployment Ready

Your portfolio is ready to deploy to GitHub Pages! All sections are complete with your professional information.

## 📱 Current Features

#### In `index.html`, all these sections are populated:

**Personal Information (Lines 33-35):**
```html
<h1 class="main-title">Your Name</h1>
<p class="subtitle">Your Professional Title - Looking for opportunities</p>
<span>Your City, State ZIP</span>
```

**Profile Image (Line 54):**
```html
<img src="https://via.placeholder.com/300x300/007acc/ffffff?text=Your+Photo" alt="Your Name" id="profile-img">
```
Replace with:
```html
<img src="your-photo.jpg" alt="Your Name" id="profile-img">
```

**About Description (Lines 42-51):**
Replace all placeholder text with your actual background, skills, and experience.

**Contact Links (Lines 206-221):**
```html
<a href="mailto:your.email@example.com" class="contact-link">
<a href="https://linkedin.com/in/yourprofile" target="_blank" class="contact-link">
<a href="https://github.com/yourusername" target="_blank" class="contact-link">
```

### 2. Update Skills (Lines 70-115)

Replace the placeholder skills in each category:
- Backend: Your backend technologies
- Frontend: Your frontend frameworks/languages  
- Cloud & DevOps: Your cloud platforms and tools
- Databases: Your database experience

### 3. Add Your Work Experience (Lines 125-160)

For each job, update:
- Date range
- Job title
- Company name
- Job description
- Technology tags

### 4. Update Education (Lines 174-200)

- Degree information
- University names
- Locations
- Relevant coursework

## 🎨 Quick Style Changes

### Change Color Scheme

The primary color `#007acc` appears in these CSS properties:
- `.nav-logo a:hover`
- `.nav-link:hover, .nav-link.active`
- `.location i`
- `.section-title::after`
- `.skill-category h3` border
- `.skill-item:hover`
- Timeline elements
- Contact link hovers

To change the color scheme:
1. Find `#007acc` in `styles.css`
2. Replace with your preferred color
3. Consider updating hover states: `#005c99` (darker version)

### Customize Fonts

Current font: `'Inter', sans-serif`

To change:
1. Update the Google Fonts import in `index.html` (line 7)
2. Update `font-family` in `styles.css` (line 13)

Popular alternatives:
- `'Roboto', sans-serif`
- `'Open Sans', sans-serif`
- `'Poppins', sans-serif`

## 📸 Adding Your Photo

### Method 1: Local Image
1. Add your photo to the project folder
2. Name it something like `profile.jpg`
3. Update the image source:
```html
<img src="profile.jpg" alt="Your Name" id="profile-img">
```

### Method 2: External URL
Use a direct image URL:
```html
<img src="https://your-image-url.com/photo.jpg" alt="Your Name" id="profile-img">
```

### Image Requirements
- **Size**: 300x300 pixels (minimum)
- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution for crisp display
- **Aspect**: Square (1:1) works best with the circular crop

## 🚀 Quick Deploy to GitHub Pages

### Step 1: Create Repository
1. Go to GitHub.com
2. Click "New repository"
3. Name it: `your-username.github.io` (for main site) or `portfolio` (for project site)
4. Make it public
5. Initialize with README (optional)

### Step 2: Upload Files
**Option A: Web Interface**
1. Click "uploading an existing file"
2. Drag and drop all files
3. Commit changes

**Option B: Git Commands**
```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
# Copy your files here
git add .
git commit -m "Add portfolio website"
git push origin main
```

### Step 3: Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Select source: "Deploy from a branch"
4. Choose branch: "main"
5. Choose folder: "/ (root)"
6. Click Save

Your site will be live at:
- Main site: `https://yourusername.github.io`
- Project site: `https://yourusername.github.io/repository-name`

## ✅ Pre-Launch Checklist

- [ ] Replace all "Your Name" placeholders
- [ ] Update email and social links
- [ ] Add your actual photo
- [ ] Update skills sections
- [ ] Add your work experience
- [ ] Update education information
- [ ] Test on mobile device
- [ ] Check all links work
- [ ] Verify contact form/email links
- [ ] Test navigation on all screen sizes

## 🎯 Advanced Customizations

### Add New Sections
You can add new sections by following the existing pattern:
1. Add HTML structure
2. Style in CSS
3. Update navigation if needed

### Add Animations
The site uses intersection observer for animations. You can add more animated elements by:
1. Adding the `fade-in` class
2. Including them in the observer (see `script.js`)

### SEO Improvements
1. Update the `<title>` tag
2. Add meta description
3. Add Open Graph tags for social sharing

## 🔍 Testing

### Local Testing
Simply open `index.html` in your browser to test locally.

### Mobile Testing
- Use browser dev tools
- Test on actual mobile devices
- Check navigation menu functionality

### Cross-Browser Testing
Test in:
- Chrome
- Firefox  
- Safari
- Edge

---

Need help? Create an issue in the repository!