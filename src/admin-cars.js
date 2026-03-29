// ========== ADMIN CARS MANAGEMENT ==========

let carsData = JSON.parse(localStorage.getItem('carsData')) || [];

// Render cars list in admin
function renderCarsAdmin() {
  const adminContent = document.getElementById('adminContent');
  
  const html = `
    <div class="admin-section-header">
      <h2>Управление на Автомобили</h2>
      <button class="btn btn-primary" onclick="showAddCarForm()">+ Добави Нов Автомобил</button>
    </div>
    
    <div id="addCarForm" class="admin-form" style="display:none;">
      <h3>Добави Нов Автомобил</h3>
      <form onsubmit="handleAddCar(event)">
        <div class="form-group">
          <label>Модел</label>
          <input type="text" id="carModel" placeholder="BMW E46 330i" required>
        </div>
        <div class="form-group">
          <label>Серия</label>
          <select id="carSeries" required>
            <option value="">Избери серия</option>
            <option value="e-series">E-серия</option>
            <option value="x-series">X-серия</option>
            <option value="7-series">7-серия</option>
          </select>
        </div>
        <div class="form-group">
          <label>Двигател</label>
          <input type="text" id="carEngine" placeholder="M54 330i" required>
        </div>
        <div class="form-group">
          <label>Тип</label>
          <input type="text" id="carType" placeholder="Седан" required>
        </div>
        <div class="form-group">
          <label>Година</label>
          <input type="text" id="carYear" placeholder="2004+" required>
        </div>
        <div class="form-group">
          <label>Снимки (качи до 5)</label>
          <input type="file" id="carImages" multiple accept="image/*" onchange="previewCarImages(event)">
          <div id="imagePreview" class="image-preview"></div>
        </div>
        <button type="submit" class="btn btn-primary">Добави Автомобил</button>
        <button type="button" class="btn btn-outline" onclick="hideAddCarForm()">Отмени</button>
      </form>
    </div>
    
    <div class="cars-list">
      ${carsData.length === 0 ? '<p>Няма добавени автомобили</p>' : ''}
      ${carsData.map((car, idx) => `
        <div class="car-item">
          <div class="car-item-info">
            <h4>${car.model}</h4>
            <p>${car.engine} • ${car.type} • ${car.year}</p>
            <p class="car-item-images">${car.images ? car.images.length : 0} снимки</p>
          </div>
          <div class="car-item-actions">
            <button class="btn btn-small" onclick="editCar(${idx})">Редактирай</button>
            <button class="btn btn-small btn-danger" onclick="deleteCar(${idx})">Изтрий</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  adminContent.innerHTML = html;
}

// Show add car form
function showAddCarForm() {
  document.getElementById('addCarForm').style.display = 'block';
}

// Hide add car form
function hideAddCarForm() {
  document.getElementById('addCarForm').style.display = 'none';
  document.getElementById('carModel').value = '';
  document.getElementById('carSeries').value = '';
  document.getElementById('carEngine').value = '';
  document.getElementById('carType').value = '';
  document.getElementById('carYear').value = '';
  document.getElementById('carImages').value = '';
  document.getElementById('imagePreview').innerHTML = '';
}

// Preview car images
function previewCarImages(event) {
  const files = event.target.files;
  const preview = document.getElementById('imagePreview');
  preview.innerHTML = '';
  
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '100px';
      img.style.margin = '5px';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

// Handle add car
function handleAddCar(event) {
  event.preventDefault();
  
  const model = document.getElementById('carModel').value;
  const series = document.getElementById('carSeries').value;
  const engine = document.getElementById('carEngine').value;
  const type = document.getElementById('carType').value;
  const year = document.getElementById('carYear').value;
  const imagesInput = document.getElementById('carImages');
  
  // Convert images to base64
  const images = [];
  Array.from(imagesInput.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      images.push(e.target.result);
      if (images.length === imagesInput.files.length) {
        // All images loaded
        const newCar = {
          id: Date.now(),
          model,
          series,
          engine,
          type,
          year,
          images
        };
        
        carsData.push(newCar);
        localStorage.setItem('carsData', JSON.stringify(carsData));
        
        // Update gallery
        updateGallery();
        
        // Reset form
        hideAddCarForm();
        renderCarsAdmin();
      }
    };
    reader.readAsDataURL(file);
  });
}

// Delete car
function deleteCar(idx) {
  if (confirm('Сигурен ли си че искаш да изтриеш този автомобил?')) {
    carsData.splice(idx, 1);
    localStorage.setItem('carsData', JSON.stringify(carsData));
    updateGallery();
    renderCarsAdmin();
  }
}

// Edit car (placeholder)
function editCar(idx) {
  alert('Редактиране на автомобил - функция в разработка');
}

// Update gallery with new cars
function updateGallery() {
  const carsGrid = document.getElementById('carsGrid');
  if (!carsGrid) return;
  
  carsGrid.innerHTML = carsData.map(car => `
    <div class="car-card" data-category="${car.series}">
      <div class="car-img-wrap">
        ${car.images && car.images.length > 0 ? `
          <img src="${car.images[0]}" alt="${car.model}" loading="lazy" />
          <div class="car-overlay">
            <a href="#" class="car-overlay-btn" onclick="showCarGallery(${car.id}, event)">Разгледай повече</a>
          </div>
        ` : `
          <div style="background: #1a1a1a; height: 250px; display: flex; align-items: center; justify-content: center;">
            <p>Няма снимка</p>
          </div>
        `}
        <span class="car-badge">Налично</span>
      </div>
      <div class="car-info">
        <div class="car-header">
          <h3 class="car-model">${car.model}</h3>
          <span class="car-series">${car.series}</span>
        </div>
        <div class="car-specs">
          <div class="spec"><span class="spec-label">Двигател</span><span class="spec-val">${car.engine}</span></div>
          <div class="spec"><span class="spec-label">Тип</span><span class="spec-val">${car.type}</span></div>
          <div class="spec"><span class="spec-label">Год.</span><span class="spec-val">${car.year}</span></div>
          <div class="spec"><span class="spec-label">Снимки</span><span class="spec-val">${car.images ? car.images.length : 0} бр.</span></div>
        </div>
        <a href="#contact" class="car-fb-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"/></svg>
          Запитване
        </a>
      </div>
    </div>
  `).join('');
}

// Show car gallery modal
function showCarGallery(carId, event) {
  event.preventDefault();
  const car = carsData.find(c => c.id === carId);
  if (!car || !car.images) return;
  
  const modal = document.createElement('div');
  modal.className = 'gallery-modal';
  modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center;';
  
  let currentImageIdx = 0;
  
  const updateImage = () => {
    modal.innerHTML = `
      <div style="position: relative; max-width: 90%; max-height: 90%; display: flex; flex-direction: column;">
        <button onclick="this.closest('.gallery-modal').remove()" style="position: absolute; top: -40px; right: 0; background: white; border: none; width: 40px; height: 40px; font-size: 24px; cursor: pointer; border-radius: 50%;">×</button>
        <img src="${car.images[currentImageIdx]}" style="max-width: 100%; max-height: 70vh; object-fit: contain;">
        <div style="color: white; text-align: center; margin-top: 20px;">
          <p>${currentImageIdx + 1} / ${car.images.length}</p>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button onclick="document.querySelector('.gallery-modal').previousImage()" style="padding: 10px 20px; background: #1c69d4; color: white; border: none; cursor: pointer; border-radius: 4px;">← Предишна</button>
            <button onclick="document.querySelector('.gallery-modal').nextImage()" style="padding: 10px 20px; background: #1c69d4; color: white; border: none; cursor: pointer; border-radius: 4px;">Следваща →</button>
          </div>
        </div>
      </div>
    `;
  };
  
  modal.nextImage = () => {
    currentImageIdx = (currentImageIdx + 1) % car.images.length;
    updateImage();
  };
  
  modal.previousImage = () => {
    currentImageIdx = (currentImageIdx - 1 + car.images.length) % car.images.length;
    updateImage();
  };
  
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
  
  document.body.appendChild(modal);
  updateImage();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateGallery();
});
