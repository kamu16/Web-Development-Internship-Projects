/* ==========================================================================
   ESCAPEX - PREMIUM LUXURY TRAVEL INTERACTIVE SYSTEMS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. COMPASS PRELOADER & SCROLL METRICS
    // ==========================================================================
    const preloader = document.getElementById('preloader');
    const scrollProgress = document.getElementById('scrollProgress');
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('load', () => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
        initRevealObserver();
    });

    // Fallback if load event doesn't trigger quickly
    setTimeout(() => {
        if (preloader && preloader.style.opacity !== '0') {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    }, 2500);

    window.addEventListener('scroll', () => {
        // Scroll Progress Bar
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';

        // Sticky Navbar
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to Top Button
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ==========================================================================
    // 2. YACHTING SUN-RING CURSOR ENGINE (LERP DRAG)
    // ==========================================================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const mouseGlow = document.getElementById('mouseGlow');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';

        // Background flashlight glow
        mouseGlow.style.opacity = '1';
        mouseGlow.style.left = mouseX + 'px';
        mouseGlow.style.top = mouseY + 'px';
    });

    window.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
        mouseGlow.style.opacity = '0';
    });

    window.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        mouseGlow.style.opacity = '1';
    });

    // LERP math loop
    function animateRing() {
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;
        
        ringX += dx * 0.12;
        ringY += dy * 0.12;

        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover scales
    const hoverElements = document.querySelectorAll('a, button, .destination-card, .activity-card, .detail-card, .package-card, .social-circle, .gallery-item, .testi-dot, .testi-arrow');
    
    hoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            document.body.classList.add('custom-cursor-hover');
        });
        elem.addEventListener('mouseleave', () => {
            document.body.classList.remove('custom-cursor-hover');
        });
    });


    // ==========================================================================
    // 3. 3D HERO PARALLAX SCENIC SHIFT ENGINE
    // ==========================================================================
    const heroScenic = document.getElementById('heroScenic');
    const scenicBalloon = document.getElementById('scenicBalloon');

    window.addEventListener('mousemove', (e) => {
        if (!heroScenic) return;
        const xPct = (e.clientX / window.innerWidth) - 0.5;
        const yPct = (e.clientY / window.innerHeight) - 0.5;

        // Shift layered SVG elements slightly to simulate real 3D parallax depth
        heroScenic.style.transform = `scale(1.05) translate(${xPct * 18}px, ${yPct * 12}px)`;
        
        // Shift hot air balloon more dramatically (wind layer)
        if (scenicBalloon) {
            scenicBalloon.style.transform = `translate(${xPct * -45}px, ${yPct * -30}px)`;
        }
    });


    // ==========================================================================
    // 4. 3D INTERACTIVE CARD TILT (DESTINATIONS)
    // ==========================================================================
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xNorm = (x / rect.width) - 0.5;
            const yNorm = (y / rect.height) - 0.5;

            const maxTilt = 8;
            const rotateY = xNorm * maxTilt * 2;
            const rotateX = -yNorm * maxTilt * 2;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });


    // ==========================================================================
    // 5. SCROLL REVEAL OBSERVER & STATS COUNTERS
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');

    function initRevealObserver() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');

                    // If stats card enters, trigger counter ticking
                    if (entry.target.classList.contains('hero-stats-grid') || entry.target.contains(document.querySelector('.hero-stats-grid'))) {
                        animateTravelerStats();
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    }

    function animateTravelerStats() {
        const statHavens = document.getElementById('statHavens');
        const statAccuracy = document.getElementById('statAccuracy');
        const statSupport = document.getElementById('statSupport');

        if (statHavens) {
            animateSingleCounter(statHavens, 0, 150, 1800, '+ Hidden Havens');
        }
        if (statAccuracy) {
            animateSingleCounterFloat(statAccuracy, 50, 98.4, 1800, '% Wanderer Index');
        }
        if (statSupport) {
            animateSingleCounter(statSupport, 0, 15, 1800, 'K+ Voyages');
        }
    }

    function animateSingleCounter(element, start, end, duration, suffix = '') {
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (suffix.includes('K+') ? 'K+' : '') + (suffix.includes('+') ? '+' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end + (suffix.includes('K+') ? 'K+' : '') + (suffix.includes('+') ? '+' : '');
            }
        }
        window.requestAnimationFrame(step);
    }

    function animateSingleCounterFloat(element, start, end, duration, suffix = '') {
        let startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = progress * (end - start) + start;
            element.textContent = value.toFixed(1) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end.toFixed(1) + '%';
            }
        }
        window.requestAnimationFrame(step);
    }


    // ==========================================================================
    // 6. HERO SEARCH WIDGET SUBMISSION (SECURE INQUIRY SIMULATION)
    // ==========================================================================
    const heroBookingForm = document.getElementById('heroBookingForm');
    const bookingSearchBtn = document.getElementById('bookingSearchBtn');

    if (heroBookingForm) {
        heroBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const destSelect = document.getElementById('bookingDest');
            const destName = destSelect.options[destSelect.selectedIndex].text;
            
            bookingSearchBtn.disabled = true;
            bookingSearchBtn.textContent = "Checking luxury lodging availability...";
            
            setTimeout(() => {
                bookingSearchBtn.textContent = "Routing private yacht pipelines...";
                
                setTimeout(() => {
                    bookingSearchBtn.textContent = "Sanctuary Reserved!";
                    bookingSearchBtn.style.background = 'linear-gradient(135deg, #02a890 0%, #00ffd2 100%)';
                    bookingSearchBtn.style.boxShadow = '0 0 25px rgba(2, 168, 144, 0.4)';
                    
                    alert(`Private Itinerary Secured!\nDestination: ${destName}\nOur boutique travel designers are routing private options to your secure mailbox.`);
                    
                    // Reset
                    heroBookingForm.reset();
                    
                    setTimeout(() => {
                        bookingSearchBtn.disabled = false;
                        bookingSearchBtn.textContent = "Find Escapes";
                        bookingSearchBtn.style.background = '';
                        bookingSearchBtn.style.boxShadow = '';
                    }, 3500);

                }, 1500);
            }, 1500);
        });
    }


    // ==========================================================================
    // 7. HIGH-TECH CAROUSEL SLIDER ENGINE (TESTIMONIALS)
    // ==========================================================================
    const testiTrack = document.getElementById('testimonialsTrack');
    const testiSlides = document.querySelectorAll('.testimonial-slide');
    const testiPrev = document.getElementById('testiPrev');
    const testiNext = document.getElementById('testiNext');
    const testiDotsContainer = document.getElementById('testiDotsContainer');

    let currentSlide = 0;
    let autoplayInterval;

    function renderSlider() {
        if (!testiTrack) return;
        testiTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update Dots
        const dots = testiDotsContainer.querySelectorAll('.testi-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testiSlides.length;
        renderSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testiSlides.length) % testiSlides.length;
        renderSlider();
    }

    // Dots clicks
    if (testiDotsContainer) {
        const dots = testiDotsContainer.querySelectorAll('.testi-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentSlide = parseInt(dot.getAttribute('data-index'));
                renderSlider();
                resetAutoplay();
            });
        });
    }

    if (testiNext && testiPrev) {
        testiNext.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
        testiPrev.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 7500);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    startAutoplay();

    // Pause on Hover
    const testiContainer = document.querySelector('.testimonials-slider-container');
    if (testiContainer) {
        testiContainer.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        testiContainer.addEventListener('mouseleave', startAutoplay);
    }


    // ==========================================================================
    // 8. MOBILE NAV DRAWER DRAWER TRIGGER ACTIONS
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item a, .mobile-cta');

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', toggleMobileMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        mobileDrawer.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        
        if (mobileDrawer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }


    // ==========================================================================
    // 9. CONCIERGE BOOKING FORM INQUIRY SUBMIT UPLINK
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const contactSubmitBtn = document.getElementById('contactSubmitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            contactSubmitBtn.disabled = true;
            contactSubmitBtn.textContent = "Encrypting private wishes packet...";
            contactSubmitBtn.style.background = 'var(--gradient-sunset)';
            
            setTimeout(() => {
                contactSubmitBtn.textContent = "Establishing concierge uplink...";
                
                setTimeout(() => {
                    contactSubmitBtn.textContent = "Uplink Secure. Voyage Calibrated.";
                    contactSubmitBtn.style.background = 'linear-gradient(135deg, #02a890 0%, #00ffd2 100%)';
                    contactSubmitBtn.style.boxShadow = '0 0 25px rgba(2, 168, 144, 0.4)';
                    
                    contactForm.reset();
                    
                    setTimeout(() => {
                        contactSubmitBtn.disabled = false;
                        contactSubmitBtn.textContent = "Establish Secure Uplink";
                        contactSubmitBtn.style.background = '';
                        contactSubmitBtn.style.boxShadow = '';
                    }, 3500);

                }, 1500);
            }, 1500);
        });
    }

});
