// ============================================
// GSAP Registration
// ============================================
gsap.registerPlugin(ScrollTrigger);

// ============================================
// Navigation & Menu
// ============================================
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Hero Section Animations
// ============================================
const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTimeline
    .from('.hero-greeting', { opacity: 0, y: 50, duration: 0.8 })
    .from('.title-line', { opacity: 0, y: 50, duration: 0.8, stagger: 0.2 }, '-=0.4')
    .from('.hero-role', { opacity: 0, y: 50, duration: 0.8 }, '-=0.4')
    .from('.hero-description', { opacity: 0, y: 50, duration: 0.8 }, '-=0.4')
    .from('.hero-buttons', { opacity: 0, y: 50, duration: 0.8 }, '-=0.4')
    .from('.floating-card', { 
        opacity: 0, 
        scale: 0, 
        duration: 1, 
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, '-=0.6')
    .from('.scroll-indicator', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4');

// ============================================
// Section Reveal Animations
// ============================================
function revealSection(selector, trigger) {
    gsap.from(selector, {
        scrollTrigger: {
            trigger: trigger,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });
}

// Section headers
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
        scrollTrigger: {
            trigger: header,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });
});

// ============================================
// About Section Animations
// ============================================
gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '.about-section',
        start: "top 70%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    x: -100,
    duration: 1,
    ease: "power3.out"
});

gsap.from('.about-text > *', {
    scrollTrigger: {
        trigger: '.about-section',
        start: "top 70%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    x: 100,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Animated counter for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

ScrollTrigger.create({
    trigger: '.about-stats',
    start: "top 80%",
    onEnter: () => {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.dataset.target);
            animateCounter(stat, target);
        });
    },
    once: true
});

// ============================================
// Skills Section Animations
// ============================================
// Make skill categories visible initially, then animate
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.style.opacity = '1'; // Ensure visible initially
});

gsap.from('.skill-category', {
    scrollTrigger: {
        trigger: '.skills-section',
        start: "top 80%",
        toggleActions: "play none none none",
        markers: false // Set to true for debugging
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.3,
    ease: "power3.out"
});

// Skill card animations
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.style.opacity = '1'; // Ensure visible initially
});

gsap.utils.toArray('.skill-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)"
    });
});

// Animated skill bars
ScrollTrigger.create({
    trigger: '.skills-section',
    start: "top 80%",
    onEnter: () => {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const progress = bar.dataset.progress;
            gsap.to(bar, {
                width: `${progress}%`,
                duration: 1.5,
                ease: "power2.out"
            });
        });
    },
    once: true
});

// ============================================
// Timeline/Experience Animations
// ============================================
gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    const isLeft = item.classList.contains('left');
    
    gsap.from(item.querySelector('.timeline-content'), {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        x: isLeft ? -100 : 100,
        duration: 1,
        ease: "power3.out"
    });
    
    gsap.from(item.querySelector('.timeline-icon'), {
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
});

// ============================================
// Projects Section
// ============================================
// Project filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    display: 'block'
                });
            } else {
                gsap.to(card, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.5,
                    display: 'none'
                });
            }
        });
    });
});

// Project cards animation
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out"
    });
});

// ============================================
// Contact Section Animations
// ============================================
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-section',
        start: "top 70%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power3.out"
});

gsap.from('.contact-form-wrapper', {
    scrollTrigger: {
        trigger: '.contact-section',
        start: "top 70%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: "power3.out"
});

gsap.from('.contact-method', {
    scrollTrigger: {
        trigger: '.contact-methods',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.2,
    ease: "power3.out"
});

// Animate social links with fallback
const socialLinks = document.querySelectorAll('.social-link');
if (socialLinks.length > 0) {
    gsap.from('.social-link', {
        scrollTrigger: {
            trigger: '.social-links',
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        clearProps: "all" // Clear all GSAP properties after animation
    });
} else {
    console.warn('No social links found for animation');
}

gsap.from('.form-group', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.15,
    ease: "power3.out"
});

// ============================================
// Contact Form Submission
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = contactForm.querySelector('.submit-btn');
    const originalText = button.innerHTML;
    
    // Show loading state
    button.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        button.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 3000);
    }, 2000);
});

// ============================================
// Back to Top Button
// ============================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Cursor Effects (Optional - Advanced)
// ============================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// ============================================
// Parallax Effect
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    const parallaxElements = document.querySelectorAll('.floating-card');
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.05;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// Loading Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
    
    // Debug: Log element counts
    console.log('Skill categories found:', document.querySelectorAll('.skill-category').length);
    console.log('Skill cards found:', document.querySelectorAll('.skill-card').length);
    console.log('Timeline items found:', document.querySelectorAll('.timeline-item').length);
    console.log('Project cards found:', document.querySelectorAll('.project-card').length);
    console.log('Social links found:', document.querySelectorAll('.social-link').length);
    console.log('Social icons found:', document.querySelectorAll('.social-link i').length);
    
    // Check if Font Awesome is loaded
    const testIcon = document.querySelector('.social-link i');
    if (testIcon) {
        const computedStyle = window.getComputedStyle(testIcon);
        console.log('Font Awesome loaded:', computedStyle.fontFamily.includes('Font Awesome'));
    }
    
    console.log('Portfolio loaded successfully! ✨');
});

// ============================================
// Particle Animation on Background
// ============================================
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    
    document.querySelector('.animated-background').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles periodically
setInterval(createParticle, 300);

// ============================================
// Console Message
// ============================================
console.log('%c👨‍💻 Nityam Kumar Tiwari', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%cAndroid Developer | Portfolio', 'color: #764ba2; font-size: 16px;');
console.log('%cLooking to hire? Let\'s connect!', 'color: #f72585; font-size: 14px;');