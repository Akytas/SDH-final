// SDH Horoměřice - Hlavní JavaScript soubor

// ===== SCROLL ANIMACE =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// ===== SMOOTH SCROLLING =====
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for hero buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== PARALLAX EFEKT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== KONTAKTNÍ MODAL =====
function openContactModal() {
    document.getElementById('contactModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function shareContacts() {
    if (navigator.share) {
        navigator.share({
            title: 'Kontakty SDH Horoměřice',
            text: 'SDH: info@hasicihoromerice.cz\nMládež: mladez@hasicihoromerice.cz\nZbrojnice: zbrojnice@hasicihoromerice.cz',
            url: window.location.href
        });
    } else {
        // Fallback - kopírování do schránky
        navigator.clipboard.writeText('SDH Horoměřice - Kontakty:\nSDH: info@hasicihoromerice.cz\nMládež: mladez@hasicihoromerice.cz\nZbrojnice: zbrojnice@hasicihoromerice.cz');
        alert('Kontakty zkopírovány do schránky!');
    }
}

// ===== DOWNLOAD MODAL =====
function openDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (!modal) {
        console.error('Download modal not found');
        return;
    }
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeDownloadModal() {
    document.getElementById('downloadModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function downloadFile(fileName, category) {
    // Skutečné stahování souboru
    const link = document.createElement('a');
    link.href = fileName; // fileName už obsahuje celou cestu
    link.download = fileName.split('/').pop(); // Vezme jen název souboru bez cesty
    link.target = '_blank';
    
    // Přidá odkaz do DOM, klikne na něj a odstraní
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== GLOBÁLNÍ EVENT LISTENERY =====
document.addEventListener('DOMContentLoaded', function() {
    // Zavření modalu klávesou ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeContactModal();
            closeDownloadModal();
            closeLightbox();
        }
    });

    // Floating Progress Button functionality
    initScrollToTop();
});

// ===== FLOATING PROGRESS BUTTON =====
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const progressRing = document.querySelector('.progress-ring-circle');
    
    if (!scrollToTopBtn || !progressRing) return;
    
    const radius = progressRing.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRing.style.strokeDashoffset = circumference;
    
    // Scroll listener
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // Update progress ring
        const offset = circumference - (scrollPercent * circumference);
        progressRing.style.strokeDashoffset = offset;
        
        // Show/hide button
        if (scrollTop > 100) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Click listener
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== LIGHTBOX FOTOGALERIE =====
let currentImageIndex = 0;
const galleryImages = [
    'obrázky2/1.jpg',
    'obrázky2/2.jpg', 
    'obrázky2/3.jpg',
    'obrázky2/4.jpg',
    'obrázky2/5.jpg',
    'obrázky2/6.jpg',
    'obrázky2/7.jpg',
    'obrázky2/8.jpg'
];

function openLightbox(index) {
    currentImageIndex = index;
    const modal = document.getElementById('lightboxModal');
    const image = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');
    
    modal.style.display = 'block';
    image.src = galleryImages[currentImageIndex];
    image.alt = `Foto ${currentImageIndex + 1}`;
    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');
    
    image.src = galleryImages[currentImageIndex];
    image.alt = `Foto ${currentImageIndex + 1}`;
    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

// Event listenery pro lightbox
document.addEventListener('DOMContentLoaded', function() {
    // Zavření lightboxu klávesou ESC
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('lightboxModal');
        if (modal && modal.style.display === 'block') {
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowRight') {
                nextImage();
            } else if (event.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });
});