// Gallery functionality with lightbox
let currentCarIndex = 0;
let currentImageIndex = 0;
let currentImages = [];
let carsData = [];

// Load cars data from JSON
async function loadCarsGallery() {
  try {
    const response = await fetch('src/cars_gallery_data.json');
    carsData = await response.json();
    renderCarsGrid();
    setupFilterButtons();
  } catch (error) {
    console.error('Error loading cars gallery:', error);
  }
}

// Render cars in the grid
function renderCarsGrid() {
  const carsGrid = document.getElementById('carsGrid');
  carsGrid.innerHTML = '';

  carsData.forEach((car, index) => {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';
    carCard.dataset.category = 'all';
    carCard.dataset.carIndex = index;

    const imageCount = car.images.length;

    carCard.innerHTML = `
      <div class="car-img-wrap">
        <img src="${car.images[0]?.url || 'placeholder.jpg'}" alt="${car.name}" loading="lazy" />
        <div class="car-overlay">
          <button class="car-overlay-btn" onclick="openLightbox(${index})">🖼️ Разгледай още (${imageCount} снимки)</button>
        </div>
        <span class="car-badge">Налично</span>
      </div>
      <div class="car-info">
        <div class="car-header">
          <h3 class="car-model">${car.name}</h3>
          <span class="car-series">На части</span>
        </div>
        <div class="car-specs">
          <div class="spec"><span class="spec-label">Снимки</span><span class="spec-val">${imageCount} бр.</span></div>
          <div class="spec"><span class="spec-label">Статус</span><span class="spec-val">Налично</span></div>
          <div class="spec"><span class="spec-label">Части</span><span class="spec-val">OEM</span></div>
          <div class="spec"><span class="spec-label">Качество</span><span class="spec-val">Проверено</span></div>
        </div>
        <div class="service-actions">
          <a href="tel:+359898606626" class="btn btn-primary">📞 Обадите се</a>
          <a href="#contact" class="btn btn-outline">✉️ Направи запитване</a>
        </div>
      </div>
    `;

    carsGrid.appendChild(carCard);
  });
}

// Open lightbox with car images
function openLightbox(carIndex) {
  currentCarIndex = carIndex;
  currentImages = carsData[carIndex].images;
  currentImageIndex = 0;

  const modal = document.getElementById('lightboxModal');
  modal.style.display = 'flex';

  displayImage();
  renderThumbnails();
}

// Close lightbox
function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  modal.style.display = 'none';
}

// Display current image
function displayImage() {
  if (currentImages.length === 0) return;

  const image = currentImages[currentImageIndex];
  document.getElementById('lightboxImage').src = image.url;
  document.getElementById('imageCounter').textContent = currentImageIndex + 1;
  document.getElementById('imageTotalCount').textContent = currentImages.length;

  // Highlight current thumbnail
  const thumbnails = document.querySelectorAll('.lightbox-thumbnail');
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle('active', index === currentImageIndex);
  });
}

// Next image
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  displayImage();
}

// Previous image
function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  displayImage();
}

// Render thumbnails
function renderThumbnails() {
  const thumbnailsContainer = document.getElementById('lightboxThumbnails');
  thumbnailsContainer.innerHTML = '';

  currentImages.forEach((image, index) => {
    const thumb = document.createElement('img');
    thumb.src = image.url;
    thumb.className = 'lightbox-thumbnail' + (index === currentImageIndex ? ' active' : '');
    thumb.onclick = () => {
      currentImageIndex = index;
      displayImage();
    };
    thumbnailsContainer.appendChild(thumb);
  });
}

// Setup filter buttons
function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // For now, show all cars regardless of filter
      // In future, you can add category filtering
    });
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('lightboxModal');
  if (modal.style.display !== 'flex') return;

  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'Escape') closeLightbox();
});

// Close lightbox when clicking outside the image
document.addEventListener('click', (e) => {
  const modal = document.getElementById('lightboxModal');
  if (e.target === modal) {
    closeLightbox();
  }
});

// Load gallery on page load
document.addEventListener('DOMContentLoaded', loadCarsGallery);
