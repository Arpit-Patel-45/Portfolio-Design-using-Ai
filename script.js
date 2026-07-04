/* ==========================================================================
   ARPIT PATEL - PORTFOLIO JAVASCRIPT
   Author: Senior Full Stack Developer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --------------------------------------------------------------------------
       1. CUSTOM GLOW CURSOR SYSTEM
       -------------------------------------------------------------------------- */
    const cursor = document.getElementById('customCursor');
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;
    let isMoving = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isMoving) {
            cursor.style.opacity = '1';
            isMoving = true;
        }
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        isMoving = false;
    });

    // Animate cursor following the mouse with smooth interpolation (lerp)
    function animateCursor() {
        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;
        
        cursor.style.left = `${posX}px`;
        cursor.style.top = `${posY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Expand cursor glow on hovering interactive items
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .swiper-slide, .social-icon-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });

    /* --------------------------------------------------------------------------
       2. SCROLL PROGRESS INDICATOR & HEADER SCROLLING EFFECT
       -------------------------------------------------------------------------- */
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.querySelector('header');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // Update top progress bar
        if (scrollProgress) {
            scrollProgress.style.width = `${scrolled}%`;
        }

        // Add blur class to navbar on scroll
        if (winScroll > 50) {
            header.classList.add('scrolled');
            scrollToTopBtn.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            scrollToTopBtn.classList.remove('show');
        }
        
        // Highlight active navbar link depending on scroll position
        highlightNavbar();
    });

    // Scroll to Top action
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* --------------------------------------------------------------------------
       3. ACTIVE NAVBAR LINK HIGHLIGHTING
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function highlightNavbar() {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
        // Offset to trigger active state slightly before section reaches top
        scrollPosition += 150; 

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < (section.offsetTop + section.offsetHeight)) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* --------------------------------------------------------------------------
       4. TYPED.JS INITIALIZATION
       -------------------------------------------------------------------------- */
    if (typeof Typed !== 'undefined') {
        new Typed('#typedElements', {
            strings: [
                'Technical Trainer', 
                'Full Stack Developer', 
                'Web Developer', 
                'Mentor', 
                'Problem Solver', 
                'Technology Enthusiast'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    }

    /* --------------------------------------------------------------------------
       5. PARTICLES.JS DYNAMIC CANVAS INITIALIZATION
       -------------------------------------------------------------------------- */
    function initParticles(theme) {
        if (typeof particlesJS === 'undefined') return;
        
        const particleColor = theme === 'dark' ? '#00e5ff' : '#007bff';
        const lineColor = theme === 'dark' ? '#7c4dff' : '#6f42c1';
        
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 55,
                    "density": {
                        "enable": true,
                        "value_area": 850
                    }
                },
                "color": {
                    "value": [particleColor, lineColor]
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": theme === 'dark' ? 0.35 : 0.18,
                    "random": true
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 140,
                    "color": lineColor,
                    "opacity": theme === 'dark' ? 0.25 : 0.15,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.55
                        }
                    }
                }
            },
            "retina_detect": true
        });
    }

    /* --------------------------------------------------------------------------
       6. THEME TOGGLER (DARK/LIGHT SWAPPING)
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;

    // Detect current theme setting or default to dark
    const currentThemeSetting = localStorage.getItem('portfolio-theme') || 'dark';

    if (currentThemeSetting === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        initParticles('light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        initParticles('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('portfolio-theme', 'light');
            initParticles('light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('portfolio-theme', 'dark');
            initParticles('dark');
        }
    });

    /* --------------------------------------------------------------------------
       7. SWIPER.JS CAROUSEL SLIDERS
       -------------------------------------------------------------------------- */
    if (typeof Swiper !== 'undefined') {
        // Certifications Slider
        new Swiper('.certificationsSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            }
        });

        // Testimonials Slider
        new Swiper('.testimonialsSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            }
        });
    }

    /* --------------------------------------------------------------------------
       8. ANIMATED STATS COUNTERS
       -------------------------------------------------------------------------- */
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'), 10);
                let startValue = 0;
                const duration = 1800; // Animation duration in ms
                const steps = targetValue > 100 ? 60 : targetValue;
                const increment = targetValue / steps;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetValue) {
                        // Check section name to append correct suffix
                        const innerText = target.parentElement.innerText || '';
                        if (innerText.includes('Satisfaction') || innerText.includes('Rate') || innerText.includes('%')) {
                            target.textContent = `${targetValue}%`;
                        } else {
                            target.textContent = `${targetValue}+`;
                        }
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current);
                    }
                }, duration / steps);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /* --------------------------------------------------------------------------
       9. SKILLS PROGRESS FILL ON SCROLL
       -------------------------------------------------------------------------- */
    const progressFills = document.querySelectorAll('.progress-fill');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const finalWidth = fill.getAttribute('data-width');
                fill.style.width = finalWidth;
            }
        });
    }, { threshold: 0.1 });

    progressFills.forEach(fill => skillsObserver.observe(fill));

    /* --------------------------------------------------------------------------
       10. AOS (ANIMATE ON SCROLL) INITIALIZATION
       -------------------------------------------------------------------------- */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            easing: 'ease-out-cubic',
            once: true,
            mirror: false
        });
    }

    /* --------------------------------------------------------------------------
       11. GSAP ENTRANCE HERO ANIMATION
       -------------------------------------------------------------------------- */
    function triggerHeroAnimations() {
        if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline();
            
            // Hero entrance sequences
            tl.from('.navbar-brand', { opacity: 0, x: -30, duration: 0.6, ease: 'power2.out' })
              .from('.navbar-nav .nav-item', { opacity: 0, y: -20, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.4')
              .from('.theme-toggle-btn', { opacity: 0, scale: 0.5, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.2')
              .from('.hero-profile-container', { opacity: 0, scale: 0.7, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.3')
              .from('.profile-glow-ring, .profile-glow-ring-secondary', { opacity: 0, duration: 1 }, '-=0.4')
              .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' }, '-=0.8')
              .from('.hero-title', { opacity: 0, y: 30, duration: 0.5, ease: 'power2.out' }, '-=0.6')
              .from('.hero-typing-subtitle', { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' }, '-=0.4')
              .from('.hero-lead', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.3')
              .from('.hero-action-buttons .btn', { opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.2')
              .from('.hero-social-links .social-icon-btn', { opacity: 0, y: 20, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.2')
              .from('.hero-scroll-indicator', { opacity: 0, y: -10, duration: 0.5, ease: 'power2.out' }, '-=0.1');
        }
    }

    /* --------------------------------------------------------------------------
       12. PRELOADER TERMINATOR
       -------------------------------------------------------------------------- */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Fire GSAP hero sequence
                triggerHeroAnimations();
            }, 600);
        });
        
        // Backup safety check in case window load takes too long
        setTimeout(() => {
            if (preloader.style.visibility !== 'hidden') {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                triggerHeroAnimations();
            }
        }, 3000);
    }

    /* --------------------------------------------------------------------------
       13. CONTACT FORM SUBMISSION MOCK
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            
            // Mock submission feedback using a premium glowing success popup alert
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin me-2"></i>Encrypting & Sending...';
            
            setTimeout(() => {
                submitBtn.classList.remove('btn-secondary-gradient');
                submitBtn.style.background = '#00FF9C';
                submitBtn.style.color = '#050816';
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-check me-2"></i>Message Sent Successfully!';
                
                // Clear form inputs
                contactForm.reset();
                
                // Remove floating labels
                const inputs = contactForm.querySelectorAll('.form-control-custom');
                inputs.forEach(input => {
                    input.blur();
                });
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.classList.add('btn-secondary-gradient');
                    submitBtn.innerHTML = originalContent;
                }, 3500);
                
            }, 2000);
        });
    }

    /* --------------------------------------------------------------------------
       14. FOOTER DYNAMIC YEAR UPDATE
       -------------------------------------------------------------------------- */
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    /* --------------------------------------------------------------------------
       15. SMOOTH NAIL ANCHOR CLICK INTERCEPT FOR INTERNAL SCROLLS
       -------------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                // Smooth scroll via window
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // navbar height offset
                    behavior: 'smooth'
                });
                
                // Close responsive navbar on link click
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show') && navbarToggler) {
                    navbarToggler.click();
                }
            }
        });
    });
});
