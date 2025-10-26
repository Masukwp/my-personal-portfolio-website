// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('-translate-y-full');
});

// Close mobile menu when clicking links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-y-full');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                block: 'start'
            });
        }
    });
});

// Progress bar and section highlighting
function updateProgressAndHighlight() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';

    // Highlight current section in side navigation
    const sections = document.querySelectorAll('section[id]');
    const sideNavLinks = document.querySelectorAll('.side-nav-link');
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    sideNavLinks.forEach(link => {
        const targetSection = link.getAttribute('data-section');
        const dot = link.querySelector('div');
        if (targetSection === currentSection) {
            dot.classList.remove('bg-white/30');
            dot.classList.add('bg-white/80');
        } else {
            dot.classList.remove('bg-white/80');
            dot.classList.add('bg-white/30');
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0px)';
        }
    });
}, observerOptions);

// Observe all sections except hero and work
document.querySelectorAll('#services, #experience, #testimonials, #contact').forEach(section => {
    observer.observe(section);
});

// Event listeners
window.addEventListener('scroll', updateProgressAndHighlight);
window.addEventListener('load', updateProgressAndHighlight);

// Initialize lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Theme handling: detect system preference, persist choice, and toggle
(function() {
    const THEME_KEY = 'preferred-theme';
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');
    const iconSun = document.querySelector('.theme-icon-sun');
    const iconMoon = document.querySelector('.theme-icon-moon');

    function applyTheme(theme) {
        if (theme === 'light') {
            root.classList.add('light');
            // show sun icon (meaning light active)
            if (iconSun) iconSun.style.display = 'inline-block';
            if (iconMoon) iconMoon.style.display = 'none';
        } else {
            root.classList.remove('light');
            if (iconSun) iconSun.style.display = 'none';
            if (iconMoon) iconMoon.style.display = 'inline-block';
        }
    }

    function getSystemPreference() {
        try {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        } catch (e) {
            return 'dark';
        }
    }

    function loadTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
        return getSystemPreference();
    }

    function saveTheme(theme) {
        try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* ignore */ }
    }

    // Initialize
    const initialTheme = loadTheme();
    applyTheme(initialTheme);

    // Listen for system changes (if user hasn't explicitly chosen)
    try {
        const mq = window.matchMedia('(prefers-color-scheme: light)');
        mq.addEventListener && mq.addEventListener('change', (e) => {
            const stored = localStorage.getItem(THEME_KEY);
            if (stored !== 'light' && stored !== 'dark') {
                applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    } catch (e) {}

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = root.classList.contains('light') ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
            saveTheme(next);
        });
    }

    // Recreate lucide icons after toggling to ensure icons render correctly
    // (lucide uses data-lucide attributes already in DOM)
    if (typeof lucide !== 'undefined') {
        // small delay to ensure icons in header exist
        setTimeout(() => lucide.createIcons(), 50);
    }

})();

// Developer portrait
const developerPortrait = document.createElement('img');
developerPortrait.src = 'assets/images/f0f33052-7e87-44a7-9c52-a02692aceec9_800w.jpg';
developerPortrait.alt = 'Masuk Noor - Developer Portrait';
developerPortrait.classList.add('rounded-xl', 'w-full', 'h-auto', 'object-cover');

// EmailJS Initialization and Form Handler
// EmailJS Initialization and Form Handler
(function() {
    emailjs.init({
        publicKey: '3TNFutFR9sTsYabYd'  // Replace with your Public Key from EmailJS dashboard
    });
    console.log('EmailJS initialized successfully');
})();

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Form submission started');  // Debug log

        // Validate form fields
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !subject || !message) {
    const p = document.createElement('p');
    p.classList.add('text-[red]', 'text-center', 'mt-4');
    contactForm.appendChild(p);
    p.innerText = 'Please fill out all fields.';
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        p.remove();
    }, 3000);
    
    return;
}
if (!/\S+@\S+\.\S+/.test(email)) {
    const p = document.createElement('p');
    p.classList.add('text-[red]', 'text-center', 'mt-4');
    contactForm.appendChild(p);
    p.innerText = 'Please enter a valid email address.';
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        p.remove();
    }, 3000);
    
    return;
}

const submitBtn = contactForm.querySelector('button[type="submit"]');
const originalBtnText = submitBtn ? submitBtn.innerHTML : null;
if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';
    
    // Simulate form submission success (replace with actual submission logic)
    setTimeout(() => {
        const p = document.createElement('p');
        p.classList.add('text-[green]', 'text-center', 'mt-4');
        contactForm.appendChild(p);
        p.innerText = 'Message sent successfully!';
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            p.remove();
        }, 5000);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    }, 4000); 
}
        
       
      
        // Send email
        emailjs.sendForm(
            'service_5rggpsg',  // Replace with your Service ID (e.g., service_xxxxxx)
            'template_fna8o0h',  // Replace with your Template ID (e.g., template_xxxxxx)
            contactForm
        ).then(function (response) {
            console.log('Email sent successfully:', response.status, response.text);
            
            p.innerText='Your message has been sent successfully!';
             p.classList.add('text-[green]','text-center','mt-4');
              contactForm.appendChild(p);
            contactForm.reset();
        }, function (error) {
            console.error('Email send failed:', error);
            p.innerText='Failed to send your message. Please try again later.';
             p.classList.add('text-[red]','text-center','mt-4');
              contactForm.appendChild(p);
        }).finally(function () {
            if (submitBtn) {
                submitBtn.disabled = false;
                if (originalBtnText) submitBtn.innerHTML = originalBtnText;
            }
        });
    });
}