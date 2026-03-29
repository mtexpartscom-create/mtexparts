// ========== LOGIN FUNCTIONALITY ==========

const VALID_CREDENTIALS = {
  username: 'v!kt0r!@',
  password: 'Kra$m0ney1995'
};

// Show login modal
function showLoginModal(event) {
  if (event) event.preventDefault();
  document.getElementById('loginModal').style.display = 'flex';
  document.getElementById('loginError').style.display = 'none';
}

// Close login modal
function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('loginError').style.display = 'none';
}

// Handle login
function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    // Login successful
    localStorage.setItem('adminLoggedIn', 'true');
    closeLoginModal();
    showAdminPanel();
  } else {
    // Login failed
    document.getElementById('loginError').style.display = 'block';
  }
}

// Show admin panel
function showAdminPanel() {
  // Hide all sections
  document.querySelectorAll('section:not(#admin)').forEach(s => s.style.display = 'none');
  document.getElementById('admin').style.display = 'block';
  
  // Render cars section
  renderCarsAdmin();
  
  // Add logout button
  addLogoutButton();
}

// Add logout button
function addLogoutButton() {
  const adminHeader = document.querySelector('.admin-header-title');
  if (adminHeader && !document.querySelector('.logout-btn')) {
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'logout-btn';
    logoutBtn.textContent = 'Изход';
    logoutBtn.onclick = handleLogout;
    adminHeader.parentElement.appendChild(logoutBtn);
  }
}

// Handle logout
function handleLogout() {
  localStorage.removeItem('adminLoggedIn');
  
  // Show all sections
  document.querySelectorAll('section').forEach(s => s.style.display = 'block');
  document.getElementById('admin').style.display = 'none';
  
  // Remove logout button
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) logoutBtn.remove();
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
  }
  
  // Close modal when clicking outside
  document.getElementById('loginModal').addEventListener('click', (e) => {
    if (e.target.id === 'loginModal') {
      closeLoginModal();
    }
  });
});
