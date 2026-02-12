// ===================================
// 2026 Trend UI - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initThemeToggle();
    initNavigation();
    initScrollAnimations();
    initFormHandling();
    initSmoothScroll();
    initContactModal();
    initProfileModal();
    initPartnerLinks();
});

// ===================================
// Theme Toggle (Dark/Light Mode)
// ===================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ===================================
// Navigation
// ===================================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// Smooth Scroll
// ===================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Scroll Animations
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for children if they exist
                const children = entry.target.querySelectorAll('.service-card, .portfolio-item, .info-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(30px)';
                        child.style.transition = 'all 0.6s ease';
                        
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Parallax effect for hero spheres
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const spheres = document.querySelectorAll('.gradient-sphere');
        
        spheres.forEach((sphere, index) => {
            const speed = (index + 1) * 0.1;
            sphere.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===================================
// Form Handling
// ===================================

function initFormHandling() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Custom validation styling
        const inputs = form.querySelectorAll('input, textarea');
        const emailInput = document.getElementById('email');
        
        // Real-time validation only for email field
        if (emailInput) {
            emailInput.addEventListener('invalid', (e) => {
                e.preventDefault();
                emailInput.classList.add('invalid');
                showInputError(emailInput, emailInput.validationMessage);
            });
            
            emailInput.addEventListener('input', () => {
                if (emailInput.classList.contains('invalid')) {
                    emailInput.classList.remove('invalid');
                    removeInputError(emailInput);
                    if (emailInput.validity.valid) {
                        emailInput.setCustomValidity('');
                    }
                }
                // Check validity while typing for email
                if (emailInput.value && !emailInput.validity.valid) {
                    emailInput.classList.add('invalid');
                    showInputError(emailInput, emailInput.validationMessage);
                } else {
                    emailInput.classList.remove('invalid');
                    removeInputError(emailInput);
                }
            });
            
            emailInput.addEventListener('blur', () => {
                if (emailInput.value && !emailInput.validity.valid) {
                    emailInput.classList.add('invalid');
                    showInputError(emailInput, emailInput.validationMessage);
                }
            });
        }
        
        // For other inputs, only remove error on input
        inputs.forEach(input => {
            if (input.id !== 'email') {
                input.addEventListener('input', () => {
                    if (input.classList.contains('invalid')) {
                        input.classList.remove('invalid');
                        removeInputError(input);
                    }
                });
            }
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Check validity one by one
            let firstInvalidInput = null;
            inputs.forEach(input => {
                removeInputError(input);
                input.classList.remove('invalid');
            });
            
            for (let input of inputs) {
                if (!input.validity.valid) {
                    firstInvalidInput = input;
                    break;
                }
            }
            
            if (firstInvalidInput) {
                firstInvalidInput.classList.add('invalid');
                showInputError(firstInvalidInput, firstInvalidInput.validationMessage);
                firstInvalidInput.focus();
                return;
            }
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Get submit button
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = '送信中...';
            submitBtn.querySelector('i').classList.remove('fa-paper-plane');
            submitBtn.querySelector('i').classList.add('fa-spinner', 'fa-spin');
            
            // Simulate form submission (replace with actual API call)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success feedback
                showNotification('メッセージが正常に送信されました！', 'success');
                form.reset();
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.querySelector('i').classList.remove('fa-spinner', 'fa-spin');
                submitBtn.querySelector('i').classList.add('fa-paper-plane');
                
                console.log('Form submitted:', formData);
            } catch (error) {
                // Error feedback
                showNotification('送信に失敗しました。もう一度お試しください。', 'error');
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.querySelector('i').classList.remove('fa-spinner', 'fa-spin');
                submitBtn.querySelector('i').classList.add('fa-paper-plane');
            }
        });
    }
    
    // Input animations
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            e.target.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', (e) => {
            e.target.parentElement.classList.remove('focused');
        });
    });
}

function showInputError(input, message) {
    const formGroup = input.parentElement;
    let errorDiv = formGroup.querySelector('.input-error');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'input-error';
        errorDiv.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.5rem;
            color: #ef4444;
            font-size: 0.875rem;
            animation: slideDown 0.3s ease;
        `;
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-exclamation-circle';
        icon.style.color = '#ef4444';
        
        const text = document.createElement('span');
        text.textContent = message;
        
        errorDiv.appendChild(icon);
        errorDiv.appendChild(text);
        formGroup.appendChild(errorDiv);
    }
}

function removeInputError(input) {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.input-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// ===================================
// Notification System
// ===================================

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'};
        color: white;
        padding: 1.25rem 2rem;
        border-radius: 1rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.4s ease, slideOutRight 0.4s ease 2.6s;
        backdrop-filter: blur(10px);
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 500;
    `;
    
    notification.querySelector('i').style.fontSize = '1.5rem';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Mouse Cursor Effect (Optional Enhancement)
// ===================================

function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Enlarge cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// Uncomment to enable custom cursor (desktop only)
if (window.innerWidth > 768) {
    // initCursorEffect();
}

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
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

// ===================================
// Additional Micro-interactions
// ===================================

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-left: -50px;
            animation: ripple 0.6s;
            pointer-events: none;
        `;
        
        const rect = button.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===================================
// Contact Modal
// ===================================

function initContactModal() {
    const modal = document.getElementById('contactModal');
    const trigger = document.getElementById('contactModalTrigger');
    const heroTrigger = document.querySelector('.contact-trigger');
    const closeBtn = document.getElementById('closeModal');
    const overlay = modal.querySelector('.modal-overlay');
    const form = document.getElementById('contactFormModal');
    const nameInput = document.getElementById('nameModal');
    const modalHeader = modal.querySelector('.modal-header h2');
    
    // Open modal function
    const openModal = (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on name input after modal animation
        setTimeout(() => {
            if (nameInput) {
                nameInput.focus();
            }
        }, 500);
    };
    
    // Open modal from header
    trigger.addEventListener('click', openModal);
    
    // Open modal from hero button
    if (heroTrigger) {
        heroTrigger.addEventListener('click', openModal);
    }
    
    // Click on modal header "Contact" to focus name input
    if (modalHeader) {
        modalHeader.style.cursor = 'pointer';
        modalHeader.addEventListener('click', () => {
            if (nameInput) {
                nameInput.focus();
            }
        });
    }
    
    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Handle modal form submission
    if (form) {
        handleModalForm(form);
    }
}

function handleModalForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    const emailInput = document.getElementById('emailModal');
    
    // Real-time validation only for email field
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            if (emailInput.classList.contains('invalid')) {
                emailInput.classList.remove('invalid');
                removeInputError(emailInput);
                if (emailInput.validity.valid) {
                    emailInput.setCustomValidity('');
                }
            }
            // Check validity while typing for email
            if (emailInput.value && !emailInput.validity.valid) {
                emailInput.classList.add('invalid');
                showInputError(emailInput, emailInput.validationMessage);
            } else {
                emailInput.classList.remove('invalid');
                removeInputError(emailInput);
            }
        });
        
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !emailInput.validity.valid) {
                emailInput.classList.add('invalid');
                showInputError(emailInput, emailInput.validationMessage);
            }
        });
    }
    
    // For other inputs, only remove error on input
    inputs.forEach(input => {
        if (input.id !== 'emailModal') {
            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    input.classList.remove('invalid');
                    removeInputError(input);
                }
            });
        }
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check validity one by one
        let firstInvalidInput = null;
        inputs.forEach(input => {
            removeInputError(input);
            input.classList.remove('invalid');
        });
        
        for (let input of inputs) {
            if (!input.validity.valid) {
                firstInvalidInput = input;
                break;
            }
        }
        
        if (firstInvalidInput) {
            firstInvalidInput.classList.add('invalid');
            showInputError(firstInvalidInput, firstInvalidInput.validationMessage);
            firstInvalidInput.focus();
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('nameModal').value,
            email: document.getElementById('emailModal').value,
            subject: document.getElementById('subjectModal').value,
            message: document.getElementById('messageModal').value
        };
        
        // Get submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = '送信中...';
        submitBtn.querySelector('i').classList.remove('fa-paper-plane');
        submitBtn.querySelector('i').classList.add('fa-spinner', 'fa-spin');
        
        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success feedback
            showNotification('メッセージが正常に送信されました！', 'success');
            form.reset();
            
            // Close modal after success
            setTimeout(() => {
                document.getElementById('contactModal').classList.remove('active');
                document.body.style.overflow = '';
            }, 1500);
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.querySelector('i').classList.remove('fa-spinner', 'fa-spin');
            submitBtn.querySelector('i').classList.add('fa-paper-plane');
            
            console.log('Form submitted:', formData);
        } catch (error) {
            // Error feedback
            showNotification('送信に失敗しました。もう一度お試しください。', 'error');
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.querySelector('i').classList.remove('fa-spinner', 'fa-spin');
            submitBtn.querySelector('i').classList.add('fa-paper-plane');
        }
    });
}

// ===================================
// Console Welcome Message
// ===================================

console.log('%c🎨 NAYA WORKS', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cCrafting Digital Experiences with 2026 Trends', 'font-size: 14px; color: #667eea;');
console.log('%cDesign | AI | UX', 'font-size: 12px; color: #8b5cf6;');

// ===================================
// Profile Modal
// ===================================

function initProfileModal() {
    const modal = document.getElementById('profileModal');
    const profileImage = document.querySelector('.profile-image-placeholder');
    const closeBtn = document.querySelector('#profileModal .modal-close');
    const overlay = document.querySelector('#profileModal .modal-overlay');
    
    if (!modal || !profileImage) {
        console.log('Profile modal elements not found:', { modal, profileImage });
        return;
    }
    
    // Open modal
    profileImage.addEventListener('click', () => {
        console.log('Profile image clicked');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // フェードインアニメーション
        setTimeout(() => {
            initProfileScrollEffects();
        }, 100);
    });
    
    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// プロフィールモーダルのスクロールエフェクト
function initProfileScrollEffects() {
    const modalBody = document.querySelector('.profile-modal-body');
    const sections = document.querySelectorAll('.profile-detail-section');
    
    if (!modalBody || !sections.length) return;
    
    // 初期フェードイン
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, index * 150);
    });
    
    // スクロール時のパララックス効果
    modalBody.addEventListener('scroll', () => {
        const scrollTop = modalBody.scrollTop;
        const scrollHeight = modalBody.scrollHeight - modalBody.clientHeight;
        const scrollPercentage = scrollTop / scrollHeight;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const modalRect = modalBody.getBoundingClientRect();
            const sectionTop = rect.top - modalRect.top;
            const sectionMiddle = sectionTop + rect.height / 2;
            const modalMiddle = modalBody.clientHeight / 2;
            const distance = Math.abs(sectionMiddle - modalMiddle);
            const maxDistance = modalBody.clientHeight;
            
            // パララックス効果：中央に近いほど前面に
            const scale = 1 - (distance / maxDistance) * 0.05;
            const opacity = 1 - (distance / maxDistance) * 0.3;
            
            section.style.transform = `scale(${Math.max(scale, 0.95)})`;
            section.style.opacity = Math.max(opacity, 0.7);
        });
    });
    
    // スムーズスクロール
    modalBody.style.scrollBehavior = 'smooth';
}

// ===================================
// Partner Links with Smooth Transition
// ===================================

function initPartnerLinks() {
    const partnerLinks = document.querySelectorAll('.partner-logo-item');
    
    partnerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('href');
            
            // Add fade out effect
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '0';
            
            // Open link after animation
            setTimeout(() => {
                window.open(url, '_blank', 'noopener,noreferrer');
                // Fade back in
                document.body.style.opacity = '1';
            }, 500);
        });
    });
}