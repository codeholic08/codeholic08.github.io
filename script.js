// AWS Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // AWS skill popup
    const awsSkill = document.querySelector('.aws-skill');
    const awsPopup = document.getElementById('aws-popup');
    const awsBackdrop = document.querySelector('.aws-popup-backdrop');
    
    console.log('AWS elements found:', { awsSkill, awsPopup, awsBackdrop });
    
    if (awsSkill && awsPopup) {
        let hoverTimeout;
        
        // Show popup on hover
        awsSkill.addEventListener('mouseenter', function(e) {
            console.log('Mouse enter AWS skill');
            clearTimeout(hoverTimeout);
            awsPopup.classList.add('show');
        });
        
        awsSkill.addEventListener('mouseleave', function(e) {
            console.log('Mouse leave AWS skill');
            hoverTimeout = setTimeout(() => {
                awsPopup.classList.remove('show');
            }, 100);
        });
        
        // Keep popup open when hovering over it
        awsPopup.addEventListener('mouseenter', function(e) {
            console.log('Mouse enter popup');
            clearTimeout(hoverTimeout);
        });
        
        awsPopup.addEventListener('mouseleave', function(e) {
            console.log('Mouse leave popup');
            awsPopup.classList.remove('show');
        });
        
        // Show popup on click (for mobile)
        awsSkill.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('AWS skill clicked');
            awsPopup.classList.toggle('show');
        });
        
        // Close popup when clicking backdrop
        if (awsBackdrop) {
            awsBackdrop.addEventListener('click', function(e) {
                console.log('Backdrop clicked');
                awsPopup.classList.remove('show');
            });
        }
        
        // Close popup on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                console.log('Escape pressed');
                awsPopup.classList.remove('show');
            }
        });
        
        // Prevent popup from closing when clicking on content
        const awsContent = document.querySelector('.aws-popup-content');
        if (awsContent) {
            awsContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    } else {
        console.error('AWS elements not found!');
    }
    
    // Models skill popup
    const modelsSkill = document.querySelector('.models-skill');
    const modelsPopup = document.getElementById('models-popup');
    const modelsBackdrop = document.querySelector('.models-popup-backdrop');
    
    console.log('Models elements found:', { modelsSkill, modelsPopup, modelsBackdrop });
    
    if (modelsSkill && modelsPopup) {
        let modelsHoverTimeout;
        
        // Show popup on hover
        modelsSkill.addEventListener('mouseenter', function(e) {
            console.log('Mouse enter Models skill');
            clearTimeout(modelsHoverTimeout);
            modelsPopup.classList.add('show');
        });
        
        modelsSkill.addEventListener('mouseleave', function(e) {
            console.log('Mouse leave Models skill');
            modelsHoverTimeout = setTimeout(() => {
                modelsPopup.classList.remove('show');
            }, 100);
        });
        
        // Keep popup open when hovering over it
        modelsPopup.addEventListener('mouseenter', function(e) {
            console.log('Mouse enter Models popup');
            clearTimeout(modelsHoverTimeout);
        });
        
        modelsPopup.addEventListener('mouseleave', function(e) {
            console.log('Mouse leave Models popup');
            modelsPopup.classList.remove('show');
        });
        
        // Show popup on click (for mobile)
        modelsSkill.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Models skill clicked');
            modelsPopup.classList.toggle('show');
        });
        
        // Close popup when clicking backdrop
        if (modelsBackdrop) {
            modelsBackdrop.addEventListener('click', function(e) {
                console.log('Models backdrop clicked');
                modelsPopup.classList.remove('show');
            });
        }
        
        // Close popup on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                console.log('Escape pressed');
                modelsPopup.classList.remove('show');
            }
        });
        
        // Prevent popup from closing when clicking on content
        const modelsContent = document.querySelector('.models-popup-content');
        if (modelsContent) {
            modelsContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    } else {
        console.error('Models elements not found!');
    }
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Set initial icon
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add theme transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling and Active Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Update active navigation link based on scroll position
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
});

// Fade-in Animation on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const elementsToAnimate = [
        '.skill-category',
        '.timeline-item',
        '.contact-link'
    ];

    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });
});

// Navbar Background and Scroll Progress on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.getElementById('scroll-indicator');
    
    // Navbar background change
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = '0 2px 20px var(--shadow-light)';
    } else {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = 'none';
    }
    
    // Scroll progress indicator
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    if (scrollIndicator) {
        scrollIndicator.style.width = scrollProgress + '%';
    }
});

// Skill Items Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
});

// Timeline Items Animation
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        timelineObserver.observe(item);
    });
});

// Contact Links Animation
document.addEventListener('DOMContentLoaded', function() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Typing Effect for Main Title (Optional)
document.addEventListener('DOMContentLoaded', function() {
    const mainTitle = document.querySelector('.main-title');
    const text = mainTitle.textContent;
    const speed = 100; // Typing speed in milliseconds
    
    // Uncomment the following code if you want a typing effect
    /*
    mainTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            mainTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
    */
});

// Profile Image Click Handler (for changing image)
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.getElementById('profile-img');
    
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            // You can add functionality here to change the profile image
            console.log('Profile image clicked - you can add image upload functionality here');
        });
    }
});

// Smooth reveal animation for sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
});

// Gradient Cursor Effect (inspired by Brittany Chiang's site)
document.addEventListener('DOMContentLoaded', function() {
    // Get gradient cursor element
    const gradientCursor = document.getElementById('cursor-gradient');
    
    document.addEventListener('mousemove', function(e) {
        // Update gradient cursor position immediately for smooth effect
        if (gradientCursor) {
            gradientCursor.style.left = e.clientX + 'px';
            gradientCursor.style.top = e.clientY + 'px';
        }
    });
    
    // Show/hide gradient cursor on mouse enter/leave
    document.addEventListener('mouseenter', () => {
        if (gradientCursor) {
            gradientCursor.style.opacity = '1';
        }
    });
    
    document.addEventListener('mouseleave', () => {
        if (gradientCursor) {
            gradientCursor.style.opacity = '0';
        }
    });
});

// Parallax scrolling effect
document.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        aboutSection.style.transform = `translateY(${rate}px)`;
    }
});

// Interactive skill hover with particle effect
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            createParticles(e.target);
        });
    });
    
    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        const particles = 5;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = rect.left + Math.random() * rect.width + 'px';
            particle.style.top = rect.top + Math.random() * rect.height + 'px';
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
});

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading animations or states
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.classList.remove('loading');
    });
    
    // Trigger initial animations
    triggerScrollAnimations();
});

function triggerScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 100);
    });
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            // You can set a fallback image here
            // this.src = 'path/to/fallback-image.jpg';
        });
    });
});

// Project Filters
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('#projects .timeline-item');

    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectItems.forEach(function(item) {
                const categories = (item.getAttribute('data-category') || '').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    item.classList.remove('filtered-out');
                } else {
                    item.classList.add('filtered-out');
                }
            });
        });
    });
});