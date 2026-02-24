// ========================================
// SMOOTH SCROLLING & NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Check if it's just '#' (no target)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ========================================
    
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ========================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // ========================================
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        // Name validation
        if (name === '') {
            isValid = false;
            errorMessage = 'Please enter your name.';
        }
        // Email validation
        else if (!validateEmail(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
        // Subject validation
        else if (subject === '') {
            isValid = false;
            errorMessage = 'Please enter a subject.';
        }
        // Message validation
        else if (message === '') {
            isValid = false;
            errorMessage = 'Please enter your message.';
        }
        // Message length validation
        else if (message.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }
        
        // Display result
        if (!isValid) {
            showFormMessage(errorMessage, 'error');
        } else {
            // Simulate form submission
            submitForm(name, email, subject, message);
        }
    });
    
    // ========================================
    // EMAIL VALIDATION FUNCTION
    // ========================================
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ========================================
    // FORM SUBMISSION FUNCTION
    // ========================================
    
    function submitForm(name, email, subject, message) {
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Sending...</span>';
        submitButton.disabled = true;
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            // Reset button
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Show success message
            showFormMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Log form data (in real application, this would be sent to server)
            console.log('Form submitted with data:', {
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: new Date().toISOString()
            });
        }, 1500);
    }
    
    // ========================================
    // SHOW FORM MESSAGE FUNCTION
    // ========================================
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        // Auto-hide message after 5 seconds
        setTimeout(function() {
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
        }, 5000);
    }
    
    // ========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-item, .info-item, .tableau-wrapper, .story-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // ========================================
    // PREVENT FORM RESUBMISSION ON REFRESH
    // ========================================
    
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    
    // ========================================
    // KEYBOARD NAVIGATION ACCESSIBILITY
    // ========================================
    
    // Allow ESC key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ========================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ========================================
    
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // ========================================
    // PERFORMANCE OPTIMIZATION
    // ========================================
    
    // Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ========================================
    // LOG INITIALIZATION
    // ========================================
    
    console.log('%c Strategic Product Placement Analysis ', 'background: #f5b942; color: #000; font-size: 16px; font-weight: bold; padding: 10px;');
    console.log('%c Website loaded successfully! ', 'background: #111; color: #f5b942; font-size: 12px; padding: 5px;');
    
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Function to get current year for dynamic copyright
function getCurrentYear() {
    return new Date().getFullYear();
}

// Update footer year if needed
window.addEventListener('load', function() {
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = getCurrentYear();
        footer.innerHTML = footer.innerHTML.replace('2026', currentYear);
    }
});

// ========================================
// ANALYTICS & TRACKING (Placeholder)
// ========================================

// Track section views
function trackSectionView(sectionName) {
    console.log(`Section viewed: ${sectionName}`);
    // In production, send to analytics service
    // Example: gtag('event', 'section_view', { section_name: sectionName });
}

// Track form submissions
function trackFormSubmission() {
    console.log('Form submitted');
    // In production, send to analytics service
    // Example: gtag('event', 'form_submit', { form_name: 'contact_form' });
}

// ========================================
// CONSOLE WARNING FOR DEVELOPERS
// ========================================

console.warn('%c ⚠️ Developer Notice ', 'background: #f5b942; color: #000; font-size: 14px; font-weight: bold; padding: 8px;');
console.log('%c This website uses vanilla JavaScript for optimal performance. No frameworks required! ', 'background: #111; color: #fff; font-size: 12px; padding: 5px;');