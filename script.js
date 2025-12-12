/**
 * Portfolio Website JavaScript
 * Handles smooth scrolling, navigation, animations, and interactive features
 */

// ===================================
// Constants
// ===================================
const SCROLL_THRESHOLD = 100;
const SECTION_OFFSET = 200;
const PARALLAX_FACTOR = 0.5;
const THROTTLE_DELAY = 16; // ~60fps

// ===================================
// Utility Functions
// ===================================

/**
 * Throttle function to limit how often a function can be called
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// Navigation Functions
// ===================================

/**
 * Update navbar appearance based on scroll position
 * Uses inline styles to override CSS variables for dynamic behavior
 * @param {number} scrollY - Current scroll position
 */
function updateNavbar(scrollY) {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    if (scrollY > SCROLL_THRESHOLD) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 217, 255, 0.1)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
        nav.style.boxShadow = 'none';
    }
}

/**
 * Update active navigation link based on current section
 * @param {number} scrollY - Current scroll position
 */
function updateActiveNavLink(scrollY) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - SECTION_OFFSET) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Apply parallax effect to hero section
 * @param {number} scrollY - Current scroll position
 */
function updateParallax(scrollY) {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const windowHeight = window.innerHeight;
    if (scrollY < windowHeight) {
        hero.style.transform = `translateY(${scrollY * PARALLAX_FACTOR}px)`;
        hero.style.opacity = 1 - (scrollY / windowHeight);
    }
}

/**
 * Combined scroll handler - throttled for performance
 */
const handleScroll = throttle(() => {
    const scrollY = window.pageYOffset || window.scrollY;
    updateNavbar(scrollY);
    updateActiveNavLink(scrollY);
    updateParallax(scrollY);
}, THROTTLE_DELAY);

// ===================================
// Animation Functions
// ===================================

/**
 * Initialize Intersection Observer for fade-in animations
 */
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .stat-card, .cert-badge'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===================================
// Interactive Elements
// ===================================

/**
 * Handle missing images gracefully without external requests
 */
function initImageErrorHandling() {
    document.querySelectorAll('.project-image img').forEach(img => {
        // Remove any existing onerror handlers to prevent external requests
        img.onerror = null;
        
        // Check if image loads successfully
        img.addEventListener('error', function() {
            // Hide broken image and show placeholder
            const container = this.closest('.project-image');
            if (container) {
                container.classList.add('image-missing');
                this.style.display = 'none';
            }
        });
        
        // If image loads successfully, ensure container is updated
        img.addEventListener('load', function() {
            const container = this.closest('.project-image');
            if (container) {
                container.classList.remove('image-missing');
                this.style.display = '';
            }
        });
    });
}

/**
 * Add hover effects to project images
 */
function initImageHoverEffects() {
    document.querySelectorAll('.project-image img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
}

/**
 * Animate statistics numbers when they come into view
 */
function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    const ANIMATION_STEPS = 50;
    
    let hasAnimated = false;
    
    const animateStats = () => {
        if (hasAnimated) return;
        hasAnimated = true;
        
        stats.forEach(stat => {
            const finalValue = stat.textContent;
            const isPercentage = finalValue.includes('%');
            const isPlus = finalValue.includes('+');
            const numericValue = parseInt(finalValue);
            
            if (!isNaN(numericValue) && numericValue > 0) {
                let currentValue = 0;
                const increment = numericValue / ANIMATION_STEPS;
                const suffix = isPercentage ? '%' : (isPlus ? '+' : '');
                
                const updateStat = () => {
                    currentValue += increment;
                    if (currentValue < numericValue) {
                        stat.textContent = Math.floor(currentValue) + suffix;
                        requestAnimationFrame(updateStat);
                    } else {
                        stat.textContent = finalValue;
                    }
                };
                
                updateStat();
            }
        });
    };

    // Trigger animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

/**
 * Add email copy to clipboard functionality
 */
function initEmailCopy() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            // Don't prevent default - allow mailto to work normally
            // But also copy to clipboard if supported
            if (navigator.clipboard && navigator.clipboard.writeText) {
                try {
                    const email = link.getAttribute('href').replace('mailto:', '');
                    await navigator.clipboard.writeText(email);
                    // Optional: Could add a toast notification here
                } catch (err) {
                    // Silently fail - clipboard access might be denied
                    console.debug('Could not copy email to clipboard:', err);
                }
            }
        });
    });
}

// ===================================
// Page Load Functions
// ===================================

/**
 * Initialize page fade-in animation
 */
function initPageLoadAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ===================================
// Initialization
// ===================================

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    // Initialize all features
    initSmoothScrolling();
    initFadeInAnimations();
    initImageErrorHandling();
    initImageHoverEffects();
    initStatsAnimation();
    initEmailCopy();
    initPageLoadAnimation();
    
    // Attach scroll handler
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial scroll update
    handleScroll();
}

// ===================================
// Console Easter Egg
// ===================================

/**
 * Display welcome message in console for recruiters/developers
 */
function initConsoleMessage() {
    console.log('%c👋 Hi there, recruiter!', 'font-size: 20px; font-weight: bold; color: #00d9ff;');
    console.log('%cThanks for checking out my portfolio. I built this site to demonstrate both my AI engineering skills and my attention to production-ready details.', 'font-size: 14px; color: #a8b2d1;');
    console.log('%cLet\'s connect: [Add your LinkedIn or email here]', 'font-size: 14px; color: #00d9ff;');
}

// Start initialization
init();
initConsoleMessage();
