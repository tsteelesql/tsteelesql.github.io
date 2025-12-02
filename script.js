// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 217, 255, 0.1)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
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

// Observe all project cards, skill categories, and stat cards
document.querySelectorAll('.project-card, .skill-category, .stat-card, .cert-badge').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Dynamic typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add hover effect to project images
document.querySelectorAll('.project-image img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.1)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
    });
});

// Animate stats on scroll
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const isPlus = finalValue.includes('+');
        const numericValue = parseInt(finalValue);
        
        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = numericValue / 50; // Adjust speed
            
            const updateStat = () => {
                currentValue += increment;
                if (currentValue < numericValue) {
                    stat.textContent = Math.floor(currentValue) + (isPercentage ? '%' : isPlus ? '+' : '');
                    requestAnimationFrame(updateStat);
                } else {
                    stat.textContent = finalValue;
                }
            };
            
            updateStat();
        }
    });
};

// Trigger stat animation when stats section is visible
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

// Add copy email functionality
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            // Could add a toast notification here
            console.log('Email copied to clipboard!');
        });
    });
});

// Mobile menu toggle (if needed in future)
function createMobileMenu() {
    const nav = document.querySelector('.nav-container');
    const menu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        // Mobile menu logic can be added here if needed
        console.log('Mobile view detected');
    }
}

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Console message for recruiters
console.log('%c👋 Hi there, recruiter!', 'font-size: 20px; font-weight: bold; color: #00d9ff;');
console.log('%cThanks for checking out my portfolio. I built this site to demonstrate both my AI engineering skills and my attention to production-ready details.', 'font-size: 14px; color: #a8b2d1;');
console.log('%cLet\'s connect: [Add your LinkedIn or email here]', 'font-size: 14px; color: #00d9ff;');
