// A simple script for smooth scrolling
document.querySelectorAll('.nav-links a[href^="#"], .hero-btns a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

/**
 * Animate numbers and add scroll-based animations for elements.
 * A single IntersectionObserver is used for efficiency.
 */
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .impact-card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Check if the element is an impact card
            if (entry.target.classList.contains('impact-card')) {
                const counter = entry.target.querySelector('h3');
                if (counter && !counter.dataset.animated) {
                    animateCounter(counter);
                    counter.dataset.animated = 'true'; // Mark as animated
                }
            }
            // Add the generic animation class for all elements being observed
            entry.target.classList.add('is-visible');

            // Stop observing once the animation has run for this element
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of the element is in view
});

// Function to animate a single counter
const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
        let count = +counter.innerText;
        const increment = target / 200; // The lower the number, the faster the counter

        if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

// Observe all elements that need to be animated
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

/**
 * Handle Back to Top button visibility and functionality.
 */
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Show the button when the user scrolls down 400px
    if (window.scrollY > 400) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
