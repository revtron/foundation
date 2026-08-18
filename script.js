document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        // Animated hamburger icon
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Scroll Active Link Highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 150)) {
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

    // Number Counter Animation
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        statNumbers.forEach(num => {
            const target = +num.getAttribute('data-target');
            const increment = target / 80; // Speed control
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current = Math.ceil(current + increment);
                    if (current > target) current = target;
                    
                    // Format output
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
                    // Final formatting safety check
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

    // Intersection Observer for Stats
    if (statsSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !animated) {
                animateCounters();
                animated = true;
            }
        }, {
            root: null,
            threshold: 0.1
        });
        observer.observe(statsSection);
    }

    // Contact Forms Submission Mock
    const individualForm = document.getElementById('individual-form');
    const organizationForm = document.getElementById('organization-form');

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
            submitBtn.style.backgroundColor = 'var(--accent-mint)';
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Request Submitted!';
            
            setTimeout(() => {
                individualForm.reset();
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
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
            submitBtn.style.backgroundColor = 'var(--accent-mint)';
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Proposal Submitted!';
            
            setTimeout(() => {
                organizationForm.reset();
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                submitBtn.innerHTML = originalText;
            }, 3000);
        });
    }

    // Form Tabs Toggles
    const tabBtns = document.querySelectorAll('.form-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const targetTab = btn.getAttribute('data-tab');
            if (targetTab === 'individual') {
                if (individualForm) {
                    individualForm.style.display = 'block';
                    individualForm.classList.add('active');
                }
                if (organizationForm) {
                    organizationForm.style.display = 'none';
                    organizationForm.classList.remove('active');
                }
            } else {
                if (individualForm) {
                    individualForm.style.display = 'none';
                    individualForm.classList.remove('active');
                }
                if (organizationForm) {
                    organizationForm.style.display = 'block';
                    organizationForm.classList.add('active');
                }
            }
        });
    });

    // Newsletter Submission Mock
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                alert(`Thank you! You have subscribed with: ${emailInput.value}`);
                emailInput.value = '';
            }
        });
    }

    // Hero Background Slideshow
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 5500);
    }

    // Shikshak Chaupal Looping Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length > 0) {
        let activeIdx = 0;
        let sliderInterval;

        const updateSlider = (newIdx) => {
            slides[activeIdx].classList.remove('active');
            dots[activeIdx].classList.remove('active');
            
            activeIdx = (newIdx + slides.length) % slides.length;
            
            slides[activeIdx].classList.add('active');
            dots[activeIdx].classList.add('active');
        };

        const nextSlide = () => updateSlider(activeIdx + 1);
        const prevSlide = () => updateSlider(activeIdx - 1);

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                updateSlider(idx);
                resetInterval();
            });
        });

        const startInterval = () => {
            sliderInterval = setInterval(nextSlide, 5000);
        };
        const resetInterval = () => {
            clearInterval(sliderInterval);
            startInterval();
        };

        startInterval();
    }

    // FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-question i');

        questionBtn.addEventListener('click', () => {
            const isVisible = answerDiv.style.display === 'block';
            
            // Close all first
            document.querySelectorAll('.faq-answer').forEach(div => div.style.display = 'none');
            document.querySelectorAll('.faq-question i').forEach(i => {
                i.className = 'fas fa-plus';
                i.style.transform = 'none';
            });

            // Toggle active
            if (!isVisible) {
                answerDiv.style.display = 'block';
                icon.className = 'fas fa-minus';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});
