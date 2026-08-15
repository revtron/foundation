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

    // Contact Form Submission Mock
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }

            // Mock success notification
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = '#00a896';
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent Successfully!';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
                submitBtn.innerHTML = originalText;
            }, 3000);
        });
    }

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
});
