document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Header Background on Scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // New Combined Logic for Active Links and Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    let currentPath = window.location.pathname.split('/').pop();

    if (currentPath === '') {
        currentPath = 'index.html';
    }

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Logic to determine if a link is the current page
        if (linkPath.endsWith(currentPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Add the click event listener for smooth scrolling
        link.addEventListener('click', function(e) {
            if (linkPath.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(linkPath);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Feature Cards Hover Effect
    const featureCards = document.querySelectorAll('.feature-card-large');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Newsletter Form Handling
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification('Thank you for subscribing to MarketMind AI updates!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Button Click Animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card-large, .stat-item, .hero-features .feature-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Utility Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    function animateCounter(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasDollar = text.includes('$');
        const hasPercent = text.includes('%');
        
        let number = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (isNaN(number)) return;

        const duration = 2000;
        const steps = 60;
        const stepValue = number / steps;
        const stepTime = duration / steps;
        
        let current = 0;
        element.textContent = formatNumber(current, hasDollar, hasPercent, hasPlus);

        const timer = setInterval(() => {
            current += stepValue;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = formatNumber(current, hasDollar, hasPercent, hasPlus);
        }, stepTime);
    }

    document.getElementById('see-how-btn').addEventListener('click', function() {
        // Navigate to docs.html
        window.location.href = 'docs.html';
    });

    function updateStartInvestingLink() {
        const btn = document.getElementById('start-investing-btn');
        if (!btn) return;

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Open native Telegram app on mobile
            btn.onclick = () => window.location.href = 'tg://resolve?domain=Local_test_ai_bot';
        } else {
            // Open Telegram web on desktop
            btn.onclick = () => window.open('https://web.telegram.org/k/#@Local_test_ai_bot', '_blank');
        }
    }

    window.addEventListener('DOMContentLoaded', updateStartInvestingLink);

    function formatNumber(num, hasDollar, hasPercent, hasPlus) {
        let formatted = '';
        
        if (hasDollar) {
            if (num >= 1000000000) {
                formatted = '$' + (num / 1000000000).toFixed(1) + 'B';
            } else if (num >= 1000000) {
                formatted = '$' + (num / 1000000).toFixed(1) + 'M';
            } else if (num >= 1000) {
                formatted = '$' + (num / 1000).toFixed(1) + 'K';
            } else {
                formatted = '$' + Math.round(num);
            }
        } else if (hasPercent) {
            formatted = num.toFixed(1) + '%';
        } else if (hasPlus) {
            if (num >= 1000) {
                formatted = (num / 1000).toFixed(0) + 'K+';
            } else {
                formatted = Math.round(num) + '+';
            }
        } else {
            formatted = num.toString();
        }
        
        return formatted;
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .header.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            .nav-menu.mobile-active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 20px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                border-radius: 0 0 16px 16px;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
});