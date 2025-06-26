document.addEventListener('DOMContentLoaded', function () {
    // Star rating functionality
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingInput = document.getElementById('reviewRating');

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;

            // Update star display
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
    });

    // Review form submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('reviewerName').value;
            const email = document.getElementById('reviewerEmail').value;
            const rating = parseInt(document.getElementById('reviewRating').value);
            const content = document.getElementById('reviewContent').value;

            if (rating === 0) {
                alert('Please select a rating by clicking on the stars');
                return;
            }

            try {
                const response = await fetch('/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name.split(' ')[0], // Use first name only
                        email: email,
                        rating: rating,
                        content: content,
                        location: "Guest"
                    })
                });

                if (response.ok) {
                    // Reset form
                    reviewForm.reset();
                    stars.forEach(star => {
                        star.classList.remove('fas', 'active');
                        star.classList.add('far');
                    });
                    ratingInput.value = "0";

                    // Show success message
                    alert('Thank you for your review! It has been submitted successfully.');

                    // Reload reviews
                    loadReviews();

                    // Scroll to testimonials section
                    document.querySelector('.testimonials')?.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    throw new Error('Failed to submit review');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your review. Please try again.');
            }
        });
    }

    // Load reviews on page load
    loadReviews();

    // Carousel functionality
    let currentSlide = 0;
    let slides = [];

    async function loadReviews() {
        try {
            const response = await fetch('/api/reviews');
            const reviews = await response.json();

            const testimonialSlides = document.getElementById('testimonialSlides');
            if (testimonialSlides) {
                testimonialSlides.innerHTML = '';

                reviews.forEach((review, index) => {
                    const reviewDate = new Date(review.date);
                    const formattedDate = reviewDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    const slide = document.createElement('div');
                    slide.className = `testimonial-slide ${index === 0 ? 'active' : ''}`;
                    slide.innerHTML = `
                        <p>${review.content}</p>
                        <div class="testimonial-meta">
                            <div class="testimonial-author">- ${review.name}, ${review.location}</div>
                            <div class="testimonial-rating">${getStarRating(review.rating)}</div>
                        </div>
                    `;
                    testimonialSlides.appendChild(slide);
                });

                slides = document.querySelectorAll('.testimonial-slide');

                // Initialize carousel navigation if buttons exist
                const prevBtn = document.querySelector('.prev-btn');
                const nextBtn = document.querySelector('.next-btn');

                if (prevBtn && nextBtn) {
                    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
                    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

                    // Auto-rotate slides every 5 seconds
                    setInterval(() => showSlide(currentSlide + 1), 5000);
                }
            }
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    }

    function showSlide(index) {
        if (!slides.length) return;

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentSlide) {
                slide.classList.add('active');
            }
        });
    }

    function getStarRating(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }
});