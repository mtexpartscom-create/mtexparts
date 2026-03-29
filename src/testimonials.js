// ========== TESTIMONIALS CAROUSEL =========

class TestimonialsCarousel {
  constructor() {
    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.init();
  }

  init() {
    this.track = document.querySelector('.testimonials-track');
    this.cards = document.querySelectorAll('.testimonial-card');
    this.prevBtn = document.querySelector('.carousel-btn.prev');
    this.nextBtn = document.querySelector('.carousel-btn.next');
    this.indicators = document.querySelectorAll('.indicator');

    if (!this.track || !this.cards.length) return;

    this.totalCards = this.cards.length;
    this.maxIndex = Math.max(0, this.totalCards - this.cardsPerView);

    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    window.addEventListener('resize', () => this.handleResize());
    this.updateCarousel();
  }

  getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  handleResize() {
    const newCardsPerView = this.getCardsPerView();
    if (newCardsPerView !== this.cardsPerView) {
      this.cardsPerView = newCardsPerView;
      this.maxIndex = Math.max(0, this.totalCards - this.cardsPerView);
      if (this.currentIndex > this.maxIndex) {
        this.currentIndex = this.maxIndex;
      }
      this.updateCarousel();
    }
  }

  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.updateCarousel();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
    }
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const cardWidth = this.cards[0]?.offsetWidth || 300;
    const gap = 32; // 2rem in pixels
    const offset = -(this.currentIndex * (cardWidth + gap));

    if (this.track) {
      this.track.style.transform = `translateX(${offset}px)`;
    }

    // Update button states
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex === this.maxIndex;
    }

    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialsCarousel();
});
