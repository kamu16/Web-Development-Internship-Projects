/* ==========================================================================
   FUTURISTIC PORTFOLIO ENGINE - KAMLESH BHURE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. PRELOADER & TERMINAL BOOT SEQUENCE ---
    const loader = document.getElementById("loader");
    const loaderBar = document.getElementById("loaderBar");
    const loaderPercent = document.getElementById("loaderPercent");
    const loaderText = document.getElementById("loaderText");
    
    const bootSequences = [
        "allocating_heap_memory...",
        "compiling_neural_nodes...",
        "initializing_canvas_particles...",
        "establishing_secure_ssl_handshake...",
        "binding_glass_components...",
        "transmitting_portfolio_payload...",
        "ready_to_launch_terminal..."
    ];
    
    let progress = 0;
    let sequenceIndex = 0;
    
    const updateLoader = () => {
        progress += Math.floor(Math.random() * 8) + 2; // Random increment
        if (progress > 100) progress = 100;
        
        loaderBar.style.width = `${progress}%`;
        loaderPercent.textContent = `${progress}%`;
        
        // Cycle terminal boot text
        if (progress > (sequenceIndex + 1) * (100 / bootSequences.length) && sequenceIndex < bootSequences.length - 1) {
            sequenceIndex++;
            loaderText.textContent = bootSequences[sequenceIndex];
        }
        
        if (progress < 100) {
            setTimeout(updateLoader, 80);
        } else {
            setTimeout(() => {
                loaderText.textContent = "system_status: ACTIVE [OK]";
                loaderText.style.color = "#00f2fe";
                setTimeout(() => {
                    loader.style.opacity = 0;
                    loader.style.pointerEvents = "none";
                    document.body.classList.remove("loading");
                    
                    // Activate animations and skill bars once loaded
                    triggerScrollReveal();
                }, 600);
            }, 300);
        }
    };
    
    document.body.classList.add("loading");
    updateLoader();

    // --- 2. DYNAMIC CUSTOM MOUSE CURSOR ---
    const cursorDot = document.querySelector(".custom-cursor-dot");
    const cursorOutline = document.querySelector(".custom-cursor-outline");
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    const lerpFactor = 0.15; // Smooth delay index
    
    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant update for center dot
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    // Smooth frame-based update for outer ring
    const animateCursor = () => {
        outlineX += (mouseX - outlineX) * lerpFactor;
        outlineY += (mouseY - outlineY) * lerpFactor;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
    
    // Add swell triggers for interactive tags
    const addCursorHoverEffects = () => {
        const hoverElements = document.querySelectorAll('[data-hover="true"], a, button, .social-icon, .hamburger, .info-card');
        
        hoverElements.forEach(elem => {
            elem.addEventListener("mouseenter", () => {
                cursorOutline.classList.add("custom-cursor-hover");
                cursorDot.classList.add("custom-cursor-dot-hover");
            });
            
            elem.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("custom-cursor-hover");
                cursorDot.classList.remove("custom-cursor-dot-hover");
            });
        });
    };
    // Initialize after a tiny frame delay to ensure DOM compilation
    setTimeout(addCursorHoverEffects, 1000);

    // --- 3. NEURAL PARTICLE CANVAS BACKGROUND ---
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    
    let particlesArray = [];
    const maxParticles = 60;
    
    // Resize mapping
    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", () => {
        setCanvasSize();
        initParticles();
    });
    
    // Mouse coordination vector
    let clientMouse = {
        x: null,
        y: null,
        radius: 120
    };
    
    window.addEventListener("mousemove", (e) => {
        clientMouse.x = e.clientX;
        clientMouse.y = e.clientY;
    });
    
    window.addEventListener("mouseleave", () => {
        clientMouse.x = null;
        clientMouse.y = null;
    });
    
    // Particle Blueprints
    class Particle {
        constructor(x, y, dx, dy, size) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.baseSize = size;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            // Dynamic subtle gradient dot
            ctx.fillStyle = "rgba(0, 242, 254, 0.4)";
            ctx.fill();
        }
        
        update() {
            // Collision check with screen boundaries
            if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
            if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
            
            // Move particles
            this.x += this.dx;
            this.y += this.dy;
            
            // Mouse proximity interactions (Attraction / expansion)
            if (clientMouse.x != null) {
                let diffX = clientMouse.x - this.x;
                let diffY = clientMouse.y - this.y;
                let distance = Math.sqrt(diffX * diffX + diffY * diffY);
                
                if (distance < clientMouse.radius) {
                    // Contract slightly and pulse when near cursor
                    this.size = this.baseSize * 1.8;
                    // Pull particles closer to cursor (Attraction)
                    this.x += diffX * 0.02;
                    this.y += diffY * 0.02;
                } else {
                    if (this.size > this.baseSize) {
                        this.size -= 0.1;
                    }
                }
            } else {
                if (this.size > this.baseSize) {
                    this.size -= 0.1;
                }
            }
            
            this.draw();
        }
    }
    
    // Initialize Particles Array
    const initParticles = () => {
        particlesArray = [];
        for (let i = 0; i < maxParticles; i++) {
            let size = Math.random() * 2 + 1.5;
            let x = Math.random() * (canvas.width - size * 2) + size;
            let y = Math.random() * (canvas.height - size * 2) + size;
            let dx = (Math.random() - 0.5) * 0.6; // Speed indices
            let dy = (Math.random() - 0.5) * 0.6;
            
            particlesArray.push(new Particle(x, y, dx, dy, size));
        }
    };
    
    // Connect adjacent particles with electric lines
    const connectParticles = () => {
        let opacityValue = 1;
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i; j < particlesArray.length; j++) {
                let dist = ((particlesArray[i].x - particlesArray[j].x) * (particlesArray[i].x - particlesArray[j].x))
                           + ((particlesArray[i].y - particlesArray[j].y) * (particlesArray[i].y - particlesArray[j].y));
                
                // Maximum distance line linkage
                if (dist < (canvas.width / 8.5) * (canvas.height / 8.5)) {
                    opacityValue = 1 - (dist / 14000);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.15})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    };
    
    // Loop
    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    };
    
    initParticles();
    animateParticles();

    // --- 4. VANILLA JS ROLE TYPING TEXT EFFECT ---
    const typingElement = document.getElementById("typingElement");
    const roles = ["AI Engineer", "Python Programmer", "Android Developer", "Frontend Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    
    const typeRoleEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Delete characters
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // Deletion speed is faster
        } else {
            // Add characters
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Standard typing speed
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            // Wait state on fully typed word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Tiny pause before next typing loop starts
        }
        
        setTimeout(typeRoleEffect, typingSpeed);
    };
    // Initialize Typing Effect
    setTimeout(typeRoleEffect, 1200);

    // --- 5. 3D PERSPECTIVE CARD HOVER TILT ---
    const tiltCards = document.querySelectorAll('[data-tilt="true"]');
    
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const cardRect = card.getBoundingClientRect();
            
            // X and Y cursor offset on card
            const cardX = e.clientX - cardRect.left;
            const cardY = e.clientY - cardRect.top;
            
            // Central coordinates
            const midCardX = cardRect.width / 2;
            const midCardY = cardRect.height / 2;
            
            // Max Skew Degree limits
            const maxSkew = 12;
            
            const tiltX = ((cardY - midCardY) / midCardY) * -maxSkew;
            const tiltY = ((cardX - midCardX) / midCardX) * maxSkew;
            
            // Update transformation properties dynamically
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener("mouseleave", () => {
            // Smoothly snap back to original dimensions
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // --- 6. SCROLL DETECTOR FOR PROGRESS & STICKY HEADER ---
    const header = document.querySelector(".header");
    const scrollProgress = document.getElementById("scrollProgress");
    const backToTop = document.getElementById("backToTop");
    
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Progress percentage calculation
        const percent = (scrollTop / documentHeight) * 100;
        scrollProgress.style.width = `${percent}%`;
        
        // Sticky navigation trigger
        if (scrollTop > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
        
        // Back to Top button toggling
        if (scrollTop > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
        
        // Dynamic navigation link active highlighter
        highlightActiveSection();
    });
    
    // Smooth scrolling to Top trigger
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Navigation linking update active elements
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");
    
    const highlightActiveSection = () => {
        let currentSectionId = "home";
        
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 120; // Offset for header compensation
            const sectionHeight = sec.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = sec.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    };

    // --- 7. MOBILE RESPONSIVE HAMBURGER NAVIGATION ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    
    // Close mobile panel on link selection
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- 8. STATS COUNTING ANIMATION ---
    const counterNumbers = document.querySelectorAll(".counter-number");
    let statsTriggered = false;
    
    const runStatsCounter = () => {
        counterNumbers.forEach(num => {
            const targetVal = parseInt(num.getAttribute("data-target"), 10);
            let currentVal = 0;
            const increment = targetVal / 50; // Dynamic scaling step values
            
            const updateCount = () => {
                currentVal += increment;
                if (currentVal >= targetVal) {
                    num.textContent = targetVal;
                } else {
                    num.textContent = Math.floor(currentVal);
                    setTimeout(updateCount, 30);
                }
            };
            
            updateCount();
        });
    };
    
    // Trigger when stats counters grid scrolled into view
    const observerOptions = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsTriggered) {
                statsTriggered = true;
                runStatsCounter();
            }
        });
    }, observerOptions);
    
    const counterGrid = document.querySelector(".counters-grid");
    if (counterGrid) statsObserver.observe(counterGrid);

    // --- 9. SKILLS PROGRESS BARS FILL SCROLL-REVEAL ---
    const skillProgressBars = document.querySelectorAll(".skill-progress-bar");
    let skillsTriggered = false;
    
    const fillSkillsProgress = () => {
        skillProgressBars.forEach(bar => {
            const targetWidth = bar.getAttribute("data-progress");
            bar.style.width = targetWidth;
        });
    };
    
    const skillsSection = document.getElementById("skills");
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsTriggered) {
                skillsTriggered = true;
                fillSkillsProgress();
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) skillsObserver.observe(skillsSection);

    // --- 10. SCROLL REVEAL (FADE IN EFFECTS) ---
    const revealElements = document.querySelectorAll(".reveal-fade, .reveal-left, .reveal-right");
    
    const triggerScrollReveal = () => {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
        
        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    };

    // --- 11. DYNAMIC FLOATING LABELS CONTACT FORM WITH TOASTS ---
    const contactForm = document.getElementById("contactForm");
    const toastContainer = document.getElementById("toastContainer");
    const contactToast = document.getElementById("contactToast");
    const toastIcon = document.getElementById("toastIcon");
    const toastTitle = document.getElementById("toastTitle");
    const toastMessage = document.getElementById("toastMessage");
    const toastClose = document.getElementById("toastClose");
    
    const displayToast = (success, title, msg) => {
        // Set context parameters
        if (success) {
            toastIcon.innerHTML = '<i class="fas fa-circle-check"></i>';
            toastIcon.style.color = "#00f2fe";
            contactToast.style.borderColor = "var(--primary-color)";
        } else {
            toastIcon.innerHTML = '<i class="fas fa-triangle-exclamation"></i>';
            toastIcon.style.color = "var(--accent-pink)";
            contactToast.style.borderColor = "var(--accent-pink)";
        }
        
        toastTitle.textContent = title;
        toastMessage.textContent = msg;
        
        // Trigger presentation
        contactToast.classList.add("show");
        
        // Auto-close duration
        setTimeout(() => {
            contactToast.classList.remove("show");
        }, 5000);
    };
    
    toastClose.addEventListener("click", () => {
        contactToast.classList.remove("show");
    });
    
    // Input validator patterns
    const validateEmail = (emailVal) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(emailVal).toLowerCase());
    };
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        
        let hasErrors = false;
        
        // Name validation
        if (nameInput.value.trim() === "") {
            nameInput.parentElement.classList.add("invalid");
            hasErrors = true;
        } else {
            nameInput.parentElement.classList.remove("invalid");
        }
        
        // Email validation
        if (!validateEmail(emailInput.value.trim())) {
            emailInput.parentElement.classList.add("invalid");
            hasErrors = true;
        } else {
            emailInput.parentElement.classList.remove("invalid");
        }
        
        // Message validation
        if (messageInput.value.trim() === "") {
            messageInput.parentElement.classList.add("invalid");
            hasErrors = true;
        } else {
            messageInput.parentElement.classList.remove("invalid");
        }
        
        if (hasErrors) {
            displayToast(false, "Transmission Failed", "Form contains invalid payloads. Please inspect variables.");
            return;
        }
        
        // Clear all fields on synthetic success
        displayToast(true, "Transmission Verified", "Ping transmitted successfully. Kamlesh will sync soon.");
        contactForm.reset();
        
        // Remove floating labels activation classes
        const inputs = contactForm.querySelectorAll(".form-input");
        inputs.forEach(inp => {
            inp.blur();
        });
    });
    
    // Live corrections check
    const fields = contactForm.querySelectorAll(".form-input");
    fields.forEach(f => {
        f.addEventListener("input", () => {
            if (f.value.trim() !== "") {
                if (f.id === "email") {
                    if (validateEmail(f.value.trim())) {
                        f.parentElement.classList.remove("invalid");
                    }
                } else {
                    f.parentElement.classList.remove("invalid");
                }
            }
        });
    });

    // --- 12. PROJECT WORKFLOW MODAL ENGINE ---
    const workflowData = {
        chatbot: {
            title: "Interactive Chatbot System",
            tags: ["Python", "Natural Language Processing (NLP)", "Interactive AI"],
            icon: "fas fa-comments",
            steps: [
                {
                    title: "Natural Language Processing (NLP) Input",
                    description: "Accepts raw conversational text from user. Executes parsing, cleaning, and tokenization steps to break sentences down into clean, processable string lists."
                },
                {
                    title: "Pattern Recognition & Intent Matching",
                    description: "Processes token lists against specialized knowledge structures. Matches intents and keywords using algorithmic indexing rules to map user queries to exact target responses."
                },
                {
                    title: "Dynamic Dialogue Execution",
                    description: "Generates coherent contextual responses. Executes corresponding system dialogue scripts and returns intelligent visual answers in the chat terminal."
                }
            ]
        },
        spam: {
            title: "Spam Detection Model",
            tags: ["Python", "Supervised ML", "Text Classification"],
            icon: "fas fa-shield-halved",
            steps: [
                {
                    title: "Text Vectorization (TF-IDF)",
                    description: "Normalizes incoming email bodies by stripping punctuation and stop-words. Encodes characters into mathematical TF-IDF feature matrices representing term frequencies."
                },
                {
                    title: "Supervised Classification Processing",
                    description: "Feeds numeric term matrices into trained classification networks (such as Naive Bayes or Logistic Regression) to map patterns of spam profiles."
                },
                {
                    title: "Probability Evaluation & Filtering",
                    description: "Calculates spam/ham probability statistics. Outputs categorization vectors that shield user inboxes, logging metrics for model tracking."
                }
            ]
        },
        booking: {
            title: "Movie Ticket Booking System",
            tags: ["HTML5 / CSS3", "Vanilla JavaScript", "Web Frontend"],
            icon: "fas fa-ticket-alt",
            steps: [
                {
                    title: "Interactive UI Reservation Grid",
                    description: "Provides users with a visual, responsive seat-selection coordinate map. Attaches interactive states to elements, dynamically checking availability grids."
                },
                {
                    title: "Live Cost Processor Engine",
                    description: "JavaScript calculates real-time pricing totals. Applies filters based on seat zones (VIP, Standard) and calculates tax/discount variables instantly."
                },
                {
                    title: "Synthetic Secure Checkout Gate",
                    description: "Processes checkout actions inside the mock payments channel, displaying virtual tickets with QR-code blocks and digital receipt confirmation overlays."
                }
            ]
        },
        stock: {
            title: "Stock Price Prediction System",
            tags: ["Python", "Recurrent Neural Network (LSTM)", "Pandas & NumPy"],
            icon: "fas fa-chart-line",
            steps: [
                {
                    title: "Historical Financial Tickers Processing",
                    description: "Fetches and cleans historical financial data. Performs data normalization using MinMaxScaler and structures sequential inputs using Pandas and NumPy."
                },
                {
                    title: "LSTM Recurrent Network Analysis",
                    description: "Feeds multidimensional tensors into Long Short-Term Memory (LSTM) cells. Processes recurrent sequential dependencies to construct price trend mappings."
                },
                {
                    title: "Comparative Forecast Visualizer",
                    description: "Generates sequential prediction outputs. Maps predictive trends against real data, rendering clear visual forecast ranges."
                }
            ]
        },
        jarvis: {
            title: "Offline JARVIS AI Assistant",
            tags: ["Python", "Speech Recognition", "OpenCV Computer Vision"],
            icon: "fas fa-microphone",
            steps: [
                {
                    title: "Vocal Synthesizer & Speech Recognition",
                    description: "Listens to microphone inputs, parsing offline audio streams using localized libraries. Executes vocal output speech conversions using text-to-speech engine rules."
                },
                {
                    title: "Automated Intent Processing & Computer Vision",
                    description: "Processes user intent commands. Optionally triggers camera devices, analyzing real-time visual frames using OpenCV Haar-Cascades to execute face detection."
                },
                {
                    title: "System Execution & Feedback",
                    description: "Performs local actions (launches processes, plays audio files, fetches directory logs). Delivers instant voice feedback confirming task completion."
                }
            ]
        }
    };

    const modal = document.getElementById("workflowModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalTags = document.getElementById("modalTags");
    const modalIconBox = document.getElementById("modalProjectIcon");
    const modalTimeline = document.getElementById("modalWorkflowTimeline");
    const modalClose = document.getElementById("modalClose");
    const workflowButtons = document.querySelectorAll(".workflow-btn");

    workflowButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const projectKey = btn.getAttribute("data-project");
            const data = workflowData[projectKey];

            if (data) {
                // Set Title
                modalTitle.textContent = data.title;

                // Set Icon
                modalIconBox.innerHTML = `<i class="${data.icon}"></i>`;

                // Set Tags
                modalTags.innerHTML = "";
                data.tags.forEach(tag => {
                    modalTags.innerHTML += `<span class="tech-badge">${tag}</span>`;
                });

                // Set Timeline Steps
                modalTimeline.innerHTML = "";
                data.steps.forEach((step, idx) => {
                    const stepNum = idx + 1 < 10 ? `0${idx + 1}` : idx + 1;
                    modalTimeline.innerHTML += `
                        <div class="workflow-step">
                            <div class="step-num">${stepNum}</div>
                            <div class="step-details">
                                <h5>${step.title}</h5>
                                <p>${step.description}</p>
                            </div>
                        </div>
                    `;
                });

                // Open Modal
                modal.classList.add("show");
                document.body.style.overflow = "hidden"; // Prevent background scrolling
            }
        });
    });

    const closeModalFunc = () => {
        modal.classList.remove("show");
        document.body.style.overflow = "auto"; // Restore background scrolling
    };

    modalClose.addEventListener("click", closeModalFunc);
    
    // Close modal when clicking outside the content card
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Close modal on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show")) {
            closeModalFunc();
        }
    });
});
