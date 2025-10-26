// Mobile menu toggle (robust)
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    // Ensure button has accessible state
    mobileMenuBtn.setAttribute('aria-expanded', 'false');

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('translate-y-0') || !mobileMenu.classList.contains('-translate-y-full');
        if (isOpen) {
            // hide
            mobileMenu.classList.remove('translate-y-0');
            mobileMenu.classList.add('-translate-y-full');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        } else {
            // show
            mobileMenu.classList.remove('-translate-y-full');
            mobileMenu.classList.add('translate-y-0');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }
    });

    // Close mobile menu when clicking links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-y-0');
            mobileMenu.classList.add('-translate-y-full');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Ensure initial hidden state for small screens
    if (!mobileMenu.classList.contains('-translate-y-full') && !mobileMenu.classList.contains('translate-y-0')) {
        mobileMenu.classList.add('-translate-y-full');
    }
} else {
    // Avoid runtime errors if elements are missing
    console.warn('Mobile menu button or menu element not found.');
}

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

// Theme support removed — site uses a single dark style.

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