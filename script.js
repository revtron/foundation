/* ==========================================================================
   SHIKSHAK SHAKTI COUNCIL — ADVANCED ANIMATION & INTERACTION ENGINE (2026)
   Three.js 3D WebGL Particle Core, GSAP ScrollTrigger, 3D Card Tilt,
   Magnetic Buttons, Accurate Stat Counter, and Form Handlers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. THREE.JS 3D WEBGL ENGINE (OPTIMIZED FOR LOW-END ANDROID DEVICES)
    const initThreeJS = () => {
        const canvas = document.getElementById('hero-3d-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const isMobile = window.innerWidth < 768;
        const isLowEnd = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 35;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: !isLowEnd,
            powerPreference: 'low-power'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(isLowEnd ? 1 : Math.min(window.devicePixelRatio, 2));

        // 3D Particle Mesh System (Adaptive particle count for low-end Androids)
        const particleCount = isLowEnd ? 240 : 750;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorMint = new THREE.Color(0x10b981);
        const colorCyan = new THREE.Color(0x06b6d4);
        const colorAmber = new THREE.Color(0xf59e0b);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

            const mixRatio = Math.random();
            let pColor;
            if (mixRatio < 0.6) {
                pColor = colorMint.clone().lerp(colorCyan, Math.random());
            } else {
                pColor = colorMint.clone().lerp(colorAmber, Math.random());
            }

            colors[i * 3] = pColor.r;
            colors[i * 3 + 1] = pColor.g;
            colors[i * 3 + 2] = pColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const createParticleTexture = () => {
            const pCanvas = document.createElement('canvas');
            pCanvas.width = 64;
            pCanvas.height = 64;
            const ctx = pCanvas.getContext('2d');
            const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
            grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            grad.addColorStop(0.3, 'rgba(16, 185, 129, 0.8)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 64, 64);
            return new THREE.CanvasTexture(pCanvas);
        };

        const material = new THREE.PointsMaterial({
            size: 1.4,
            vertexColors: true,
            map: createParticleTexture(),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        // 3D Geometric Wireframe Core
        const outerGeo = new THREE.IcosahedronGeometry(14, 2);
        const outerMat = new THREE.MeshBasicMaterial({
            color: 0x10b981,
            wireframe: true,
            transparent: true,
            opacity: 0.12
        });
        const outerMesh = new THREE.Mesh(outerGeo, outerMat);
        outerMesh.position.set(18, 0, -10);
        scene.add(outerMesh);

        const innerGeo = new THREE.TorusGeometry(9, 2, 16, 60);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            wireframe: true,
            transparent: true,
            opacity: 0.18
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        innerMesh.position.set(18, 0, -10);
        scene.add(innerMesh);

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX) * 0.04;
            mouseY = (event.clientY - windowHalfY) * 0.04;
        };
        document.addEventListener('mousemove', onDocumentMouseMove, { passive: true });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        let isCanvasVisible = true;
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isCanvasVisible = entry.isIntersecting;
                });
            }, { threshold: 0.01 });
            observer.observe(canvas);
        }

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            if (!isCanvasVisible) return;

            const elapsedTime = clock.getElapsedTime();

            // Continuous 3D Core Mesh Rotation & Breathing Scale
            outerMesh.rotation.x = elapsedTime * 0.12;
            outerMesh.rotation.y = elapsedTime * 0.18;
            innerMesh.rotation.x = -elapsedTime * 0.18;
            innerMesh.rotation.z = elapsedTime * 0.12;

            const outerBreathe = 1 + Math.sin(elapsedTime * 0.8) * 0.05;
            outerMesh.scale.set(outerBreathe, outerBreathe, outerBreathe);

            const innerBreathe = 1 + Math.cos(elapsedTime * 0.9) * 0.04;
            innerMesh.scale.set(innerBreathe, innerBreathe, innerBreathe);

            // Continuous Particle Constellation Rotation & Wave Motion
            particlesMesh.rotation.y = elapsedTime * 0.03;
            const posArr = particlesMesh.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const x = posArr[i3];
                posArr[i3 + 1] += Math.sin(elapsedTime * 1.5 + x) * 0.025;
            }
            particlesMesh.geometry.attributes.position.needsUpdate = true;

            targetX += (mouseX - targetX) * 0.05;
            targetY += (-mouseY - targetY) * 0.05;

            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (targetY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();
    };

    // 2. 3D CARD TILT MICRO-INTERACTIONS
    const init3DTiltEffects = () => {
        const tiltCards = document.querySelectorAll('.program-card, .stat-card, .cta-box, .testimonial-card, .about-image-wrapper, .event-card, .gallery-item, .contact-info-card, .contact-form-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s ease-out';
            });
        });
    };

    // 3. MAGNETIC BUTTON HOVER EFFECT
    const initMagneticButtons = () => {
        const buttons = document.querySelectorAll('.btn, .social-btn, .slider-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    };

    // 4. GSAP SCROLLTRIGGER REVEAL ANIMATIONS
    const initGSAPAnimations = () => {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            gsap.utils.toArray('.section-header, .about-content, .about-image-side, .innovation-banner, .cta-box').forEach(el => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            });

            gsap.utils.toArray('.programs-grid, .stats-grid, .testimonials-grid, .gallery-grid, .events-grid').forEach(grid => {
                if (grid && grid.children) {
                    gsap.from(grid.children, {
                        scrollTrigger: {
                            trigger: grid,
                            start: 'top 90%',
                        },
                        y: 25,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                        onComplete: () => {
                            Array.from(grid.children).forEach(child => {
                                child.style.opacity = '1';
                            });
                        }
                    });
                }
            });
        }
    };

    // 5. Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);

    const updateProgressBar = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${progress}%`;
    };
    window.addEventListener('scroll', updateProgressBar, { passive: true });

    // 6. Header Scroll Effect
    const header = document.querySelector('#header');
    if (header) {
        const handleHeaderScroll = () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        handleHeaderScroll();
    }

    // 7. Mobile Navigation Drawer & Hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        const closeMobileMenu = () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            const spans = hamburger.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);

            const spans = hamburger.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = isActive ? 'rotate(45deg) translate(5px, 6px)' : 'none';
                spans[1].style.opacity = isActive ? '0' : '1';
                spans[2].style.transform = isActive ? 'rotate(-45deg) translate(5px, -6px)' : 'none';
            }
        });

        // Close drawer when ANY link inside nav-menu is clicked
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close drawer when clicking outside nav-menu
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // 8. Scroll Active Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        const highlightNavOnScroll = () => {
            const scrollY = window.pageYOffset;
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 180;
                const sectionId = current.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}` || link.getAttribute('href') === `index.html#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };
        window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
    }

    // 9. Exact Stat Counter Animation
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const animateCounters = () => {
        statNumbers.forEach(num => {
            const target = +num.getAttribute('data-target');
            if (isNaN(target)) return;

            const increment = target / 80;
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current = Math.ceil(current + increment);
                    if (current > target) current = target;

                    if (target >= 10000000) {
                        num.innerText = (current / 10000000).toFixed(1) + ' Cr+';
                    } else if (target >= 100000) {
                        num.innerText = (current / 100000).toFixed(1) + ' L+';
                    } else if (target >= 1000) {
                        num.innerText = current.toLocaleString('en-IN') + '+';
                    } else {
                        num.innerText = current + '+';
                    }

                    setTimeout(updateCount, 15);
                } else {
                    if (target >= 10000000) {
                        num.innerText = (target / 10000000).toFixed(0) + ' Crore+';
                    } else if (target >= 100000) {
                        num.innerText = (target / 100000).toFixed(0) + ' Lakh+';
                    } else if (target >= 1000) {
                        num.innerText = target.toLocaleString('en-IN') + '+';
                    } else {
                        num.innerText = target + '+';
                    }
                }
            };
            updateCount();
        });
    };

    if (statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !animatedStats) {
                animateCounters();
                animatedStats = true;
            }
        }, { threshold: 0.2 });
        observer.observe(statsSection);
    }

    // 10. Toast Notification System
    const showToast = (message) => {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-30px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    };

    // 11. Contact Forms Logic & Tabs
    const tabBtns = document.querySelectorAll('.form-tab-btn');
    const individualForm = document.getElementById('individual-form');
    const organizationForm = document.getElementById('organization-form');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const targetTab = btn.getAttribute('data-tab');
                if (targetTab === 'individual') {
                    if (individualForm) individualForm.style.display = 'block';
                    if (organizationForm) organizationForm.style.display = 'none';
                } else {
                    if (individualForm) individualForm.style.display = 'none';
                    if (organizationForm) organizationForm.style.display = 'block';
                }
            });
        });
    }

    if (individualForm) {
        individualForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }

            const submitBtn = individualForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Submitted!';

            showToast('Thank you! Your request has been submitted successfully.');

            setTimeout(() => {
                individualForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 3000);
        });
    }

    if (organizationForm) {
        organizationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const orgName = document.getElementById('org-name').value;
            const contactName = document.getElementById('contact-name').value;
            const contactEmail = document.getElementById('contact-email').value;
            const proposal = document.getElementById('org-proposal').value;

            if (!orgName || !contactName || !contactEmail || !proposal) {
                alert('Please fill out all required fields.');
                return;
            }

            const submitBtn = organizationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Submitted!';

            showToast('Partnership proposal submitted successfully!');

            setTimeout(() => {
                organizationForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 3000);
        });
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            if (input && input.value) {
                showToast(`Subscribed successfully with ${input.value}`);
                input.value = '';
            }
        });
    }

    // 12. Hero Background Slideshow
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 5500);
    }

    // 13. Shikshak Chaupal Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');

    if (slides.length > 0) {
        let activeIdx = 0;
        let sliderInterval;

        const updateSlider = (newIdx) => {
            slides[activeIdx].classList.remove('active');
            if (dots[activeIdx]) dots[activeIdx].classList.remove('active');

            activeIdx = (newIdx + slides.length) % slides.length;

            slides[activeIdx].classList.add('active');
            if (dots[activeIdx]) dots[activeIdx].classList.add('active');
        };

        const nextSlide = () => updateSlider(activeIdx + 1);
        const prevSlide = () => updateSlider(activeIdx - 1);

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => { updateSlider(idx); resetTimer(); });
        });

        const startTimer = () => { sliderInterval = setInterval(nextSlide, 6000); };
        const resetTimer = () => { clearInterval(sliderInterval); startTimer(); };

        startTimer();
    }

    // 14. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-question i');

        if (questionBtn && answerDiv) {
            questionBtn.addEventListener('click', () => {
                const isOpen = answerDiv.style.display === 'block';

                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    if (otherAnswer) otherAnswer.style.display = 'none';
                    if (otherIcon) {
                        otherIcon.className = 'fas fa-plus';
                        otherIcon.style.transform = 'none';
                    }
                });

                if (!isOpen) {
                    answerDiv.style.display = 'block';
                    if (icon) {
                        icon.className = 'fas fa-minus';
                        icon.style.transform = 'rotate(180deg)';
                    }
                }
            });
        }
    });

    // 15. Smooth Anchor Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 90;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // 16. Floating Custom Book Cursor Follower Engine
    const initCustomCursor = () => {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-book-cursor';
        cursor.innerHTML = '<i class="fas fa-book-open"></i>';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        });

        const interactiveEls = document.querySelectorAll('a, button, input, select, textarea, .btn, .nav-link, .program-card, .stat-card, .cta-box, .testimonial-card, .gallery-item, .event-card, .form-tab-btn, .faq-question, .filter-btn, .slider-btn');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    };

    // 17. Floating WhatsApp Button Auto-Injector
    const initWhatsAppButton = () => {
        if (document.querySelector('.floating-whatsapp-btn')) return;
        const waBtn = document.createElement('a');
        waBtn.href = 'https://wa.me/918800726212?text=Hello%20Shikshak%20Shakti%20Council%2C%20I%20would%20like%20to%20know%20more%20about%20your%20programs.';
        waBtn.target = '_blank';
        waBtn.className = 'floating-whatsapp-btn';
        waBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
        waBtn.innerHTML = '<i class="fab fa-whatsapp" style="font-size: 1.4rem;"></i> <span>WhatsApp Us</span>';
        document.body.appendChild(waBtn);
    };

    // 18. Cookie Consent Banner (DPDP Act / GDPR Compliance)
    const initCookieBanner = () => {
        if (localStorage.getItem('ssc_cookie_consent')) return;

        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <p><strong><i class="fas fa-cookie-bite"></i> Cookie & Privacy Notice:</strong> We use cookies to enhance your experience, analyze site usage, and support our educator community under the DPDP Act. By clicking "Accept All", you consent to our privacy guidelines.</p>
            </div>
            <div class="cookie-banner-actions">
                <button id="accept-cookies-btn" class="btn btn-primary" style="padding: 8px 18px; font-size: 0.85rem;">Accept All</button>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById('accept-cookies-btn').addEventListener('click', () => {
            localStorage.setItem('ssc_cookie_consent', 'accepted');
            banner.classList.add('hidden');
            setTimeout(() => banner.remove(), 400);
        });
    };

    // 19. Copy Bank Details to Clipboard
    const initBankCopy = () => {
        const copyBtns = document.querySelectorAll('.copy-bank-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const textToCopy = btn.getAttribute('data-copy');
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const originalText = btn.innerHTML;
                        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        btn.style.background = 'var(--clr-emerald-500)';
                        btn.style.color = '#ffffff';
                        if (typeof showToast === 'function') {
                            showToast(`Copied to clipboard: ${textToCopy}`);
                        }
                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.background = '';
                            btn.style.color = '';
                        }, 2500);
                    }).catch(err => {
                        console.error('Copy failed: ', err);
                    });
                }
            });
        });
    };

    // INITIALIZE ADVANCED ANIMATION ENGINES
    initThreeJS();
    init3DTiltEffects();
    initMagneticButtons();
    initGSAPAnimations();
    initCustomCursor();
    initWhatsAppButton();
    initCookieBanner();
    initBankCopy();
});
