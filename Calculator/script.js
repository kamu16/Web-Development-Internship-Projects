/* ==========================================================================
   AUREUM // LUXURY GOLD JAVASCRIPT SYSTEM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // DOM ELEMENTS
    // ----------------------------------------------------------------------
    const displayInput = document.getElementById('display-input');
    const displayFormula = document.getElementById('display-formula');
    const termStats = document.getElementById('term-stats');
    const soundBtn = document.getElementById('sound-btn');
    const particleCanvas = document.getElementById('particle-canvas');
    const buttons = document.querySelectorAll('.btn');

    // ----------------------------------------------------------------------
    // STATE CONFIGURATION
    // ----------------------------------------------------------------------
    let currentInput = '0';      // Active number input on screen
    let isResultDisplayed = false; // Flag to check if result is currently shown
    let audioCtx = null;         // Lazy-loaded Web Audio Context
    let isMuted = false;         // Sound mute toggle

    // Performance Stats Simulator for display status strip
    setInterval(() => {
        const cpu = (Math.random() * 1.5 + 0.4).toFixed(1);
        const mem = (Math.random() * 0.05 + 0.95).toFixed(2);
        termStats.textContent = `MEM: ${mem}kb // CPU: ${cpu}%`;
    }, 3000);

    // ----------------------------------------------------------------------
    // INTERACTIVE PARTICLE CANVAS BACKGROUND (Golden Stardust Network)
    // ----------------------------------------------------------------------
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    const maxParticles = 50;
    let mouse = { x: null, y: null, radius: 150 };

    // Handle Window Resizing
    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse coordinate for drawing connection strings
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Object blueprint (Warm golden tones)
    class Particle {
        constructor(x, y, isTemporary = false) {
            this.x = x || Math.random() * particleCanvas.width;
            this.y = y || Math.random() * particleCanvas.height;
            // Drifts slowly like premium dust motes
            const speedScale = isTemporary ? 3.5 : 0.6;
            this.vx = (Math.random() - 0.5) * speedScale;
            this.vy = (Math.random() - 0.5) * speedScale;
            this.radius = isTemporary ? Math.random() * 1.5 + 1 : Math.random() * 1.8 + 0.5;
            this.alpha = isTemporary ? 1.0 : Math.random() * 0.4 + 0.15;
            // Shifting Gold Palette
            const rand = Math.random();
            this.color = rand > 0.6 ? '#d4af37' : (rand > 0.3 ? '#ffdf7a' : '#ffffff');
            this.decay = isTemporary ? Math.random() * 0.025 + 0.015 : 0;
            this.isTemporary = isTemporary;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce at borders for regular particles
            if (!this.isTemporary) {
                if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;
            } else {
                this.alpha -= this.decay;
            }
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.shadowBlur = 5;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    // Initialize constant particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    // Add click micro-bursts of gold sparkles
    window.addEventListener('click', (e) => {
        const clickX = e.clientX;
        const clickY = e.clientY;
        for (let i = 0; i < 6; i++) {
            particles.push(new Particle(clickX, clickY, true));
        }
    });

    // Particle Animation Loop
    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        // Remove dead burst particles
        particles = particles.filter(p => !p.isTemporary || p.alpha > 0);

        // Keep standard particles at target counts
        const permanentCount = particles.filter(p => !p.isTemporary).length;
        if (permanentCount < maxParticles) {
            particles.push(new Particle());
        }

        // Draw connecting networks
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.04 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.restore();
                }
            }

            // Interactive connect lines with mouse cursor
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - dist / mouse.radius)})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // NOTE: 3D Hologram Tilt Framerate has been removed as per request.
    // The calculator container now stands perfectly stationary and responsive.

    // ----------------------------------------------------------------------
    // WEB AUDIO API SYNTHESIZER ENGINE (Warm Metallic UI Chimes)
    // ----------------------------------------------------------------------
    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // Sound toggle state
    soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        initAudio();
        isMuted = !isMuted;
        if (isMuted) {
            soundBtn.classList.remove('active');
            soundBtn.title = "Enable UI Sound Synthesizer";
        } else {
            soundBtn.classList.add('active');
            soundBtn.title = "Mute UI Sound Synthesizer";
            // Play a little chirp confirmation beep
            playSynthSound('number');
        }
    });

    function playSynthSound(type) {
        if (isMuted) return;
        initAudio();
        if (!audioCtx) return;

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        switch (type) {
            case 'number':
                // Warm, soft metallic ping
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, now); // A5 note
                osc.frequency.exponentialRampToValueAtTime(550, now + 0.05);
                
                gainNode.gain.setValueAtTime(0.06, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                
                osc.start(now);
                osc.stop(now + 0.06);
                break;

            case 'operator':
                // Elegant dual-tone mechanical gold sweep
                osc.type = 'sine';
                osc.frequency.setValueAtTime(659.25, now); // E5 note
                osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.07); // B5 note
                
                gainNode.gain.setValueAtTime(0.05, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                
                osc.start(now);
                osc.stop(now + 0.08);
                break;

            case 'delete':
                // Soft downward tone
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.linearRampToValueAtTime(220, now + 0.1);
                
                gainNode.gain.setValueAtTime(0.06, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
                
                osc.start(now);
                osc.stop(now + 0.11);
                break;

            case 'clear':
                // Soft warm discharge hum
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
                
                gainNode.gain.setValueAtTime(0.08, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
                
                osc.start(now);
                osc.stop(now + 0.22);
                break;

            case 'equal':
                // Premium luxury gold chime (Aureum Chime)
                const osc2 = audioCtx.createOscillator();
                const gainNode2 = audioCtx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(659.25, now); // E5
                osc.frequency.setValueAtTime(880.00, now + 0.06); // A5
                osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.2); // E6
                
                gainNode.gain.setValueAtTime(0.07, now);
                gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                
                // Perfect harmonic Major 3rd
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(1109.73, now); // C#6
                osc2.frequency.exponentialRampToValueAtTime(1661.22, now + 0.22); // G#6
                
                osc2.connect(gainNode2);
                gainNode2.connect(audioCtx.destination);
                
                gainNode2.gain.setValueAtTime(0.03, now);
                gainNode2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
                
                osc.start(now);
                osc.stop(now + 0.26);
                
                osc2.start(now);
                osc2.stop(now + 0.29);
                break;
        }
    }

    // ----------------------------------------------------------------------
    // MATHEMATICAL CALCULATOR CORE LOGIC
    // ----------------------------------------------------------------------
    
    // Formatting values for screen representation
    function formatExpressionForDisplay(expr) {
        return expr
            .replace(/\*/g, ' × ')
            .replace(/\//g, ' ÷ ')
            .replace(/\+/g, ' + ')
            .replace(/\-/g, ' − ');
    }

    // Dynamic output font scale adjusting
    function adjustFontSize() {
        const length = currentInput.length;
        if (length > 15) {
            displayInput.style.fontSize = '1.3rem';
        } else if (length > 12) {
            displayInput.style.fontSize = '1.6rem';
        } else if (length > 8) {
            displayInput.style.fontSize = '2.0rem';
        } else {
            displayInput.style.fontSize = '2.5rem';
        }
    }

    // Core key dispatcher
    function handleKeyPress(value, keySoundType) {
        playSynthSound(keySoundType);

        if (value === 'Clear') {
            currentInput = '0';
            displayFormula.textContent = '';
            isResultDisplayed = false;
        } 
        else if (value === 'Backspace') {
            if (isResultDisplayed) {
                currentInput = '0';
                displayFormula.textContent = '';
                isResultDisplayed = false;
            } else {
                if (currentInput.length <= 1 || currentInput === '0') {
                    currentInput = '0';
                } else {
                    currentInput = currentInput.slice(0, -1);
                }
            }
        } 
        else if (value === '=') {
            evaluateExpression();
        } 
        else {
            const isOperator = ['+', '-', '*', '/', '%'].includes(value);

            if (isResultDisplayed) {
                if (isOperator) {
                    displayFormula.textContent = currentInput;
                    currentInput = value;
                } else {
                    displayFormula.textContent = '';
                    currentInput = value;
                }
                isResultDisplayed = false;
            } else {
                if (currentInput === '0') {
                    if (isOperator) {
                        if (value === '-') {
                            currentInput = '-';
                        } else {
                            currentInput += value;
                        }
                    } else if (value === '.') {
                        currentInput = '0.';
                    } else {
                        currentInput = value;
                    }
                } else {
                    // Prevent duplicate consecutive operators
                    const lastChar = currentInput.slice(-1);
                    const isLastCharOperator = ['+', '-', '*', '/', '%'].includes(lastChar);
                    
                    if (isOperator && isLastCharOperator) {
                        currentInput = currentInput.slice(0, -1) + value;
                    } else {
                        currentInput += value;
                    }
                }
            }
        }

        // Update displays
        displayInput.textContent = formatExpressionForDisplay(currentInput);
        adjustFontSize();
    }

    // Safe mathematical parser
    function evaluateExpression() {
        if (currentInput === '0' || !currentInput) return;

        let expression = currentInput;
        const lastChar = expression.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            expression = expression.slice(0, -1);
        }

        try {
            // Process percentage operations (e.g. converting "250*10%" to "250*(10/100)")
            expression = expression.replace(/([0-9.]+)\%/g, '($1/100)');

            // Clean character sanitization
            const sanitized = expression.replace(/[^0-9+\-*/().]/g, '');

            // division by zero check
            if (/\/0(?!\.[0-9]+)/.test(sanitized)) {
                throw new Error("DivZero");
            }

            // Safe evaluate
            const evalResult = new Function(`return (${sanitized})`)();

            if (evalResult === undefined || isNaN(evalResult)) {
                throw new Error("Invalid");
            }

            // Remove float precision errors
            let cleanResult = Number(evalResult.toFixed(8)).toString();

            displayFormula.textContent = formatExpressionForDisplay(currentInput) + ' =';
            currentInput = cleanResult;
            isResultDisplayed = true;

        } catch (error) {
            displayFormula.textContent = formatExpressionForDisplay(currentInput);
            if (error.message === "DivZero") {
                currentInput = 'SYS: DIV BY 0';
            } else {
                currentInput = 'SYS: ERROR';
            }
            isResultDisplayed = true;
            
            // Soft Crimson flash on display when error occurs
            const displayBg = document.querySelector('.calc-display-wrapper');
            displayBg.style.borderColor = 'rgba(192, 57, 43, 0.4)';
            displayBg.style.boxShadow = 'inset 0 0 20px rgba(192, 57, 43, 0.2)';
            
            setTimeout(() => {
                displayBg.style.borderColor = 'rgba(212, 175, 55, 0.1)';
                displayBg.style.boxShadow = 'inset 0 0 20px rgba(0, 0, 0, 0.95)';
            }, 800);
        }
    }

    // ----------------------------------------------------------------------
    // KEYBOARD INPUT BINDINGS
    // ----------------------------------------------------------------------
    const keyboardMap = {
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
        '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        '.': '.', '+': '+', '-': '-', '*': '*', 'x': '*',
        '/': '/', '%': '%', 'Enter': '=', '=': '=',
        'Backspace': 'Backspace', 'Escape': 'Clear', 'c': 'Clear', 'C': 'Clear'
    };

    window.addEventListener('keydown', (e) => {
        const mappedVal = keyboardMap[e.key];
        if (!mappedVal) return;

        e.preventDefault();

        let targetBtn = null;
        buttons.forEach(btn => {
            if (btn.getAttribute('data-key') === mappedVal || btn.getAttribute('data-val') === mappedVal) {
                targetBtn = btn;
            }
        });

        if (targetBtn) {
            targetBtn.classList.add('btn-active-sim');
            const soundType = targetBtn.getAttribute('data-sound') || 'number';
            
            handleKeyPress(mappedVal, soundType);

            setTimeout(() => {
                targetBtn.classList.remove('btn-active-sim');
            }, 100);
        }
    });

    // ----------------------------------------------------------------------
    // BUTTONS CLICK RIPPLE AND ACTION HANDLERS
    // ----------------------------------------------------------------------
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const keyVal = button.getAttribute('data-val') || button.getAttribute('data-key');
            const soundType = button.getAttribute('data-sound') || 'number';

            const circle = document.createElement('span');
            circle.classList.add('ripple');
            
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            circle.style.width = circle.style.height = `${size}px`;
            
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;
            
            button.appendChild(circle);

            handleKeyPress(keyVal, soundType);

            setTimeout(() => {
                circle.remove();
            }, 500);
        });
    });
});
