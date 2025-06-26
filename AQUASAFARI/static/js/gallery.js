// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const videoCards = document.querySelectorAll('.video-card');
const videoSection = document.getElementById('videos-section');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Handle gallery items filtering
        galleryItems.forEach(item => {
            if (filter === 'all' || filter === 'images') {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Handle video section filtering
        if (filter === 'all' || filter === 'videos') {
            videoSection.style.display = 'block';
        } else {
            videoSection.style.display = 'none';
        }
    });
});

// Category Filter Functionality
const categoryBtns = document.querySelectorAll('.category-btn');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all category buttons
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const category = this.getAttribute('data-category');

        // Filter gallery items
        galleryItems.forEach(item => {
            const itemCategories = item.getAttribute('data-category').split(' ');

            if (category === 'all' || itemCategories.includes(category)) {
                item.classList.add('show');
            } else {
                item.classList.remove('show');
            }
        });

        // Filter video cards
        videoCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category').split(' ');

            if (category === 'all' || cardCategories.includes(category)) {
                card.classList.add('show');
            } else {
                card.classList.remove('show');
            }
        });
    });
});

// Initialize - show all items by default
document.addEventListener('DOMContentLoaded', function () {
    galleryItems.forEach(item => item.classList.add('show'));
    videoCards.forEach(card => card.classList.add('show'));
});

// Lightbox functionality for images
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-content img');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryImages = document.querySelectorAll('.gallery-item img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentImageIndex = 0;
const allGalleryImages = Array.from(galleryImages);

galleryImages.forEach((item, index) => {
    item.addEventListener('click', function () {
        currentImageIndex = index;
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function showImage(index) {
    if (index < 0) index = allGalleryImages.length - 1;
    if (index >= allGalleryImages.length) index = 0;

    currentImageIndex = index;
    lightboxImg.src = allGalleryImages[index].src;
    lightboxImg.alt = allGalleryImages[index].alt;
}

prevBtn.addEventListener('click', () => {
    showImage(currentImageIndex - 1);
});

nextBtn.addEventListener('click', () => {
    showImage(currentImageIndex + 1);
});

lightboxClose.addEventListener('click', function () {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    // Arrow keys navigation
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            showImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentImageIndex + 1);
        }
    }
});

// Video Modal functionality
const videoModal = document.querySelector('.video-modal');
const videoPlayer = document.querySelector('.video-modal video');
const videoClose = document.querySelector('.video-close');
const playIcons = document.querySelectorAll('.play-icon');

playIcons.forEach(icon => {
    icon.addEventListener('click', function () {
        const videoSrc = this.getAttribute('data-video');
        videoPlayer.src = videoSrc;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Play the video when modal opens
        setTimeout(() => {
            videoPlayer.play();
        }, 300);
    });
});

videoClose.addEventListener('click', function () {
    videoModal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    document.body.style.overflow = '';
});

videoModal.addEventListener('click', function (e) {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        document.body.style.overflow = '';
    }
});

// Set active link
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === window.location.pathname) {
        link.classList.add('active');
    }
});