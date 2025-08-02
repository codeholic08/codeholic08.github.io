# Mohammad Maaz Rashid - Portfolio Website

A modern, responsive portfolio website showcasing machine learning engineering expertise, software development experience, and academic achievements. Built with interactive features and professional design inspired by top developer portfolios.

## 🌟 Features

- **🌙 Dark/Light Mode Toggle**: Smooth theme switching with system preference detection
- **📱 Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **✨ Interactive Elements**: Cursor following effect, particle animations, and hover effects
- **🎯 Smooth Animations**: Fade-in effects, parallax scrolling, and micro-interactions
- **🧭 Smart Navigation**: Active section highlighting, scroll progress indicator, and mobile menu
- **🎨 Modern UI**: Clean, professional design inspired by top developer portfolios
- **⚙️ Easy Customization**: Well-organized code with CSS variables for theming
- **🚀 GitHub Pages Ready**: Deploy directly to GitHub Pages with one click

## 🚀 Live Demo

Once deployed to GitHub Pages, your site will be available at:
`https://yourusername.github.io/repository-name`

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript for interactivity
└── README.md          # This file
```

## 🛠️ Customization Guide

### 1. Personal Information
Edit the following sections in `index.html`:

#### Profile Section
- Replace `"Your Name"` with your actual name
- Update the subtitle with your professional title
- Change the location information
- Replace the placeholder image URL with your photo
- Update the about description paragraphs

#### Contact Information
- Update email address in the contact section
- Replace social media links (LinkedIn, GitHub)
- Add link to your resume PDF

### 2. Skills Section
Update the skills in each category:
- **Backend**: Add your backend technologies
- **Frontend**: Add your frontend technologies  
- **Cloud & DevOps**: Add your cloud/DevOps skills
- **Databases**: Add your database experience

### 3. Work Experience
For each job in the timeline:
- Update date ranges
- Replace job titles and company names
- Update job descriptions with your actual experience
- Modify technology tags to match what you used

### 4. Education
- Update degree information
- Replace university names and locations
- Modify coursework to match your actual courses

### 5. Color Scheme
The main brand color is `#007acc` (blue). To change it:
1. Find all instances of `#007acc` in `styles.css`
2. Replace with your preferred color
3. Update hover states and related colors accordingly

### 6. Profile Photo
Replace the placeholder image:
1. Add your photo to the project folder
2. Update the `src` attribute in the profile image:
```html
<img src="your-photo.jpg" alt="Your Name" id="profile-img">
```

## 🚀 Deployment to GitHub Pages

### Option 1: Direct Upload
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Using Git
```bash
# Clone or create your repository
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio

# Add your files
# (copy index.html, styles.css, script.js to this directory)

# Commit and push
git add .
git commit -m "Add portfolio website"
git push origin main
```

## 📱 Mobile Responsiveness

The site is fully responsive and includes:
- Mobile-friendly navigation menu
- Responsive grid layouts
- Touch-friendly interactions
- Optimized typography for small screens

## 🎨 Customization Examples

### Adding a New Skill Category
```html
<div class="skill-category">
    <h3>Your Category</h3>
    <div class="skill-table">
        <div class="skill-item">Skill 1</div>
        <div class="skill-item">Skill 2</div>
        <!-- Add more skills -->
    </div>
</div>
```

### Adding a New Work Experience
```html
<div class="timeline-item">
    <div class="timeline-date">
        <span class="date-range">YYYY.MM - YYYY.MM</span>
    </div>
    <div class="timeline-content">
        <h3 class="job-title">Your Job Title</h3>
        <h4 class="company">Company Name</h4>
        <p class="job-description">
            Your job description and achievements...
        </p>
        <div class="tech-tags">
            <span class="tech-tag">Technology 1</span>
            <span class="tech-tag">Technology 2</span>
        </div>
    </div>
</div>
```

## 🔧 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📄 License

This template is free to use for personal and commercial projects. Attribution is appreciated but not required.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Happy coding!** 🚀