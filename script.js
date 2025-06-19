
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            }
        });
    });
    
    // Testimonial Slider
    if (document.querySelector('.testimonial-slider')) {
        const testimonials = document.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.slider-controls .prev');
        const nextBtn = document.querySelector('.slider-controls .next');
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            testimonials[index].classList.add('active');
        }
        
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
            showTestimonial(currentIndex);
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(currentIndex);
        });
        
        // Auto-rotate testimonials
        setInterval(function() {
            currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
            showTestimonial(currentIndex);
        }, 5000);
        
        // Show first testimonial
        showTestimonial(currentIndex);
    }
    
    // Gallery Filter Functionality
    if (document.querySelector('.gallery-filters')) {
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const artistFilter = document.getElementById('artist-filter');
        const artItems = document.querySelectorAll('.art-item');
        
        function filterArtworks() {
            const categoryValue = categoryFilter.value;
            const priceValue = priceFilter.value;
            const artistValue = artistFilter.value;
            
            artItems.forEach(item => {
                const itemCategory = item.dataset.category;
                const itemPrice = parseInt(item.dataset.price);
                const itemArtist = item.dataset.artist;
                
                let categoryMatch = categoryValue === 'all' || itemCategory === categoryValue;
                let priceMatch = priceValue === 'all' || 
                                (priceValue === '0-500' && itemPrice <= 500) ||
                                (priceValue === '500-2000' && itemPrice > 500 && itemPrice <= 2000) ||
                                (priceValue === '2000-5000' && itemPrice > 2000 && itemPrice <= 5000) ||
                                (priceValue === '5000+' && itemPrice > 5000);
                let artistMatch = artistValue === 'all' || itemArtist === artistValue;
                
                if (categoryMatch && priceMatch && artistMatch) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        categoryFilter.addEventListener('change', filterArtworks);
        priceFilter.addEventListener('change', filterArtworks);
        artistFilter.addEventListener('change', filterArtworks);
    }
    
    // Contact Form Submission
    if (document.getElementById('contactForm')) {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For this example, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add fixed header shadow on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});