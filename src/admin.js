// ========== ADMIN PANEL JAVASCRIPT ==========

// Admin state
const adminState = {
  cars: [],
  bookings: [],
  inquiries: [],
  currentSection: 'cars'
};

// Load data from localStorage
function loadAdminData() {
  const saved = localStorage.getItem('mtexparts_admin_data');
  if (saved) {
    const data = JSON.parse(saved);
    adminState.cars = data.cars || [];
    adminState.bookings = data.bookings || [];
    adminState.inquiries = data.inquiries || [];
  }
}

// Save data to localStorage
function saveAdminData() {
  localStorage.setItem('mtexparts_admin_data', JSON.stringify(adminState));
}

// Show admin section with loading animation
function showAdminSection(section) {
  adminState.currentSection = section;
  const adminContent = document.getElementById('adminContent');
  
  // Show loading state
  adminContent.innerHTML = `
    <div class="admin-loading">
      <div class="spinner"></div>
      <span>Зареждане...</span>
    </div>
  `;

  // Update active button
  document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Simulate loading delay for better UX
  setTimeout(() => {
    switch (section) {
      case 'cars':
        renderCarsAdmin();
        break;
      case 'bookings':
        renderBookingsAdmin();
        break;
      case 'inquiries':
        renderInquiriesAdmin();
        break;
    }
  }, 300);
}

// Render cars admin section
function renderCarsAdmin() {
  const adminContent = document.getElementById('adminContent');
  adminContent.innerHTML = `
    <div class="admin-header">
      <h2>Управление на Автомобили</h2>
      <div class="admin-header-actions">
        <button class="btn btn-primary" onclick="showAddCarForm()">+ Добави Автомобил</button>
      </div>
    </div>

    <div id="carFormContainer"></div>

    <table class="admin-table">
      <thead>
        <tr>
          <th>Марка</th>
          <th>Модел</th>
          <th>Година</th>
          <th>Двигател</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        ${adminState.cars.length === 0 
          ? '<tr><td colspan="5" style="text-align: center; padding: 2rem;">Няма добавени автомобили</td></tr>'
          : adminState.cars.map((car, idx) => `
            <tr>
              <td>${car.make}</td>
              <td>${car.model}</td>
              <td>${car.year}</td>
              <td>${car.engine}</td>
              <td>
                <div class="admin-actions">
                  <button class="btn-admin btn-admin-edit" onclick="editCar(${idx})">Редактирай</button>
                  <button class="btn-admin btn-admin-delete" onclick="deleteCar(${idx})">Изтрий</button>
                </div>
              </td>
            </tr>
          `).join('')
        }
      </tbody>
    </table>
  `;
}

// Render bookings admin section
function renderBookingsAdmin() {
  const adminContent = document.getElementById('adminContent');
  adminContent.innerHTML = `
    <div class="admin-header">
      <h2>Резервации</h2>
    </div>

    <table class="admin-table">
      <thead>
        <tr>
          <th>Име</th>
          <th>Телефон</th>
          <th>Автомобил</th>
          <th>Дата</th>
          <th>Час</th>
        </tr>
      </thead>
      <tbody>
        ${adminState.bookings.length === 0 
          ? '<tr><td colspan="5" style="text-align: center; padding: 2rem;">Няма резервации</td></tr>'
          : adminState.bookings.map(booking => `
            <tr>
              <td>${booking.name}</td>
              <td>${booking.phone}</td>
              <td>${booking.car}</td>
              <td>${booking.date}</td>
              <td>${booking.time}</td>
            </tr>
          `).join('')
        }
      </tbody>
    </table>
  `;
}

// Render inquiries admin section
function renderInquiriesAdmin() {
  const adminContent = document.getElementById('adminContent');
  adminContent.innerHTML = `
    <div class="admin-header">
      <h2>Запитвания</h2>
    </div>

    <table class="admin-table">
      <thead>
        <tr>
          <th>Име</th>
          <th>Телефон</th>
          <th>Запитване</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        ${adminState.inquiries.length === 0 
          ? '<tr><td colspan="4" style="text-align: center; padding: 2rem;">Няма запитвания</td></tr>'
          : adminState.inquiries.map(inquiry => `
            <tr>
              <td>${inquiry.name}</td>
              <td>${inquiry.phone}</td>
              <td>${inquiry.message.substring(0, 50)}...</td>
              <td>${inquiry.date}</td>
            </tr>
          `).join('')
        }
      </tbody>
    </table>
  `;
}

// Show add car form
function showAddCarForm() {
  const container = document.getElementById('carFormContainer');
  container.innerHTML = `
    <div class="admin-form">
      <h3>Добави Нов Автомобил</h3>
      <form onsubmit="saveCar(event)">
        <div class="form-group">
          <label>Марка</label>
          <input type="text" name="make" required>
        </div>
        <div class="form-group">
          <label>Модел</label>
          <input type="text" name="model" required>
        </div>
        <div class="form-group">
          <label>Година</label>
          <input type="number" name="year" required>
        </div>
        <div class="form-group">
          <label>Двигател</label>
          <input type="text" name="engine" required>
        </div>
        <div class="form-group">
          <label>Описание</label>
          <textarea name="description" required></textarea>
        </div>
        <div class="form-group">
          <label>Категория</label>
          <select name="category" required>
            <option value="">Избери категория</option>
            <option value="e-series">E-серия</option>
            <option value="x-series">X-серия</option>
            <option value="7-series">7-серия</option>
          </select>
        </div>
        <div class="admin-form-actions">
          <button type="submit" class="btn btn-primary">Запази Автомобил</button>
          <button type="button" class="btn btn-outline" onclick="document.getElementById('carFormContainer').innerHTML = ''">Отмени</button>
        </div>
      </form>
    </div>
  `;
}

// Save car
function saveCar(event) {
  event.preventDefault();
  const form = event.target;
  const car = {
    make: form.make.value,
    model: form.model.value,
    year: form.year.value,
    engine: form.engine.value,
    description: form.description.value,
    category: form.category.value
  };

  adminState.cars.push(car);
  saveAdminData();
  renderCarsAdmin();
  alert('Автомобилът е добавен успешно!');
}

// Edit car
function editCar(index) {
  alert('Редактиране на автомобил: ' + adminState.cars[index].make + ' ' + adminState.cars[index].model);
}

// Delete car
function deleteCar(index) {
  if (confirm('Сигурен ли си, че искаш да изтриеш този автомобил?')) {
    adminState.cars.splice(index, 1);
    saveAdminData();
    renderCarsAdmin();
  }
}

// Navigation to admin
document.addEventListener('DOMContentLoaded', () => {
  // Load admin data
  loadAdminData();

  // Admin nav buttons
  document.querySelectorAll('.admin-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      showAdminSection(e.target.dataset.section);
    });
  });

  // Handle admin link in navbar
  const adminLink = document.querySelector('a[href="#admin"]');
  if (adminLink) {
    adminLink.addEventListener('click', (e) => {
      e.preventDefault();
      const adminSection = document.getElementById('admin');
      const otherSections = document.querySelectorAll('section:not(#admin)');
      
      adminSection.style.display = 'block';
      otherSections.forEach(s => s.style.display = 'none');
      
      renderCarsAdmin();
    });
  }

  // Back button functionality
  const homeLink = document.querySelector('a[href="#home"]');
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      const adminSection = document.getElementById('admin');
      const otherSections = document.querySelectorAll('section:not(#admin)');
      
      adminSection.style.display = 'none';
      otherSections.forEach(s => s.style.display = 'block');
      
      window.location.hash = 'home';
    });
  }
});

// Capture form submissions for bookings and inquiries
document.addEventListener('submit', (e) => {
  if (e.target.id === 'contactForm') {
    const formData = new FormData(e.target);
    const inquiry = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      date: new Date().toLocaleDateString('bg-BG')
    };
    adminState.inquiries.push(inquiry);
    saveAdminData();
  }
});
