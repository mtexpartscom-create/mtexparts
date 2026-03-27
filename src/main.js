import './styles/main.css';

// Приложение
class MTEXParts {
    constructor() {
        this.currentPage = 'home';
        this.cars = [];
        this.bookings = [];
        this.init();
    }

    init() {
        this.createApp();
        this.setupRouting();
        this.loadData();
        this.attachEventListeners();
    }

    createApp() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <header>
                <div class="header-container">
                    <a href="#" class="logo" onclick="app.navigate('home'); return false;">MTEX PARTS</a>
                    <nav>
                        <ul>
                            <li><a href="#" onclick="app.navigate('home'); return false;">Начало</a></li>
                            <li><a href="#" onclick="app.navigate('services'); return false;">Услуги</a></li>
                            <li><a href="#" onclick="app.navigate('cars'); return false;">Авточасти</a></li>
                            <li><a href="#" onclick="app.navigate('about'); return false;">За нас</a></li>
                            <li><a href="#" onclick="app.navigate('contact'); return false;">Контакти</a></li>
                            <li><a href="#" onclick="app.navigate('admin'); return false;">Админ</a></li>
                        </ul>
                    </nav>
                    <div class="header-phone">📞 +359 (0) 123 456 789</div>
                </div>
            </header>
            <main id="content"></main>
            <footer>
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>MTEX PARTS</h4>
                        <p>Професионален автосервиз и авточасти</p>
                        <p>📍 Варна, ул. Краков 438</p>
                    </div>
                    <div class="footer-section">
                        <h4>Работно време</h4>
                        <p>Пн-Сб: 09:00 - 18:00</p>
                        <p>Нд: Затворено</p>
                    </div>
                    <div class="footer-section">
                        <h4>Контакти</h4>
                        <p>📞 +359 (0) 123 456 789</p>
                        <p><a href="https://www.facebook.com/mtexparts" target="_blank">Facebook</a></p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2026 MTEX PARTS. Всички права запазени.</p>
                </div>
            </footer>
        `;

        // Запазване на референция към приложението
        window.app = this;
    }

    setupRouting() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1) || 'home';
            this.navigate(hash);
        });
    }

    navigate(page) {
        this.currentPage = page;
        window.location.hash = page;
        this.render();
    }

    render() {
        const content = document.getElementById('content');
        
        switch (this.currentPage) {
            case 'home':
                content.innerHTML = this.renderHome();
                break;
            case 'services':
                content.innerHTML = this.renderServices();
                break;
            case 'cars':
                content.innerHTML = this.renderCars();
                break;
            case 'about':
                content.innerHTML = this.renderAbout();
                break;
            case 'contact':
                content.innerHTML = this.renderContact();
                break;
            case 'admin':
                content.innerHTML = this.renderAdmin();
                break;
            default:
                content.innerHTML = this.renderHome();
        }

        this.attachEventListeners();
    }

    renderHome() {
        return `
            <section class="hero">
                <h1>Професионален автосервиз и авточасти</h1>
                <p>Оригинални ОЕМ авточасти втора употреба. Тествани и проверени с 14 дни гаранция за качество</p>
                <div class="hero-buttons">
                    <button class="btn btn-primary" onclick="app.navigate('contact'); return false;">📞 Обади се сега</button>
                    <button class="btn btn-secondary" onclick="app.navigate('cars'); return false;">🚗 Виж каталог</button>
                    <button class="btn btn-outline" onclick="app.navigate('contact'); return false;">💬 Запитване</button>
                </div>
            </section>

            <section>
                <h2>Добре дошли в MTEX PARTS</h2>
                <p class="section-subtitle">В MTEXPARTS ще намериш всичко за твоя автомобил – от качествени авточасти до професионален ремонт и пътна помощ 24/7. Работим бързо, коректно и с внимание към всеки клиент.</p>
                
                <div class="grid">
                    <div class="card">
                        <h4>⚡ Бърза реакция до 30 минути</h4>
                        <p>Ние разбираме, че времето е ценно. Затова винаги сме готови да помогнем бързо.</p>
                    </div>
                    <div class="card">
                        <h4>📦 Части в наличност</h4>
                        <p>Разполагаме с широк избор от оригинални части, готови за монтаж.</p>
                    </div>
                    <div class="card">
                        <h4>💰 Коректни цени без изненади</h4>
                        <p>Прозрачни цени и честна работа - това е нашия принцип.</p>
                    </div>
                    <div class="card">
                        <h4>🚨 Пътна помощ 24/7</h4>
                        <p>Независимо къде си - ще дойдем и ще разрешим проблема.</p>
                    </div>
                </div>
            </section>

            <section>
                <h2>Запази час за сервиз</h2>
                <p class="section-subtitle">Избери удобен ден и час, и ние ще се погрижим за твоя автомобил.</p>
                <form id="bookingForm">
                    <div class="form-group">
                        <label>Име</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Телефон</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Автомобил (марка/модел)</label>
                        <input type="text" name="car" required>
                    </div>
                    <div class="form-group">
                        <label>Услуга</label>
                        <select name="service" required>
                            <option value="">Избери услуга</option>
                            <option value="diagnostics">Компютърна диагностика</option>
                            <option value="engine">Ремонт на двигатели</option>
                            <option value="suspension">Ходова част</option>
                            <option value="oil">Смяна на масла и консумативи</option>
                            <option value="repair">Отстраняване на повреди</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Дата</label>
                        <input type="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label>Час</label>
                        <input type="time" name="time" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Запази час</button>
                </form>
            </section>
        `;
    }

    renderServices() {
        return `
            <section>
                <h2>Нашите услуги</h2>
                <p class="section-subtitle">Предлагаме широк спектър от услуги за всеки вид автомобил.</p>

                <h3>🔧 Автосервиз</h3>
                <div class="grid">
                    <div class="card">
                        <h4>Компютърна диагностика</h4>
                        <p>Модерна диагностика с професионално оборудване</p>
                    </div>
                    <div class="card">
                        <h4>Ремонт на двигатели</h4>
                        <p>Експертен ремонт на всички видове двигатели</p>
                    </div>
                    <div class="card">
                        <h4>Ходова част</h4>
                        <p>Ремонт и подмяна на ходова част</p>
                    </div>
                    <div class="card">
                        <h4>Смяна на масла</h4>
                        <p>Смяна на масла и консумативи</p>
                    </div>
                </div>

                <h3 style="margin-top: 3rem;">🚗 Авточасти</h3>
                <div class="grid">
                    <div class="card">
                        <h4>Нови и употребявани части</h4>
                        <p>Оригинални ОЕМ части на добри цени</p>
                    </div>
                    <div class="card">
                        <h4>Части в наличност</h4>
                        <p>Широк избор от части, готови за монтаж</p>
                    </div>
                    <div class="card">
                        <h4>Части по заявка</h4>
                        <p>Намираме нужната част за твоя автомобил</p>
                    </div>
                </div>

                <h3 style="margin-top: 3rem;">🚨 Пътна помощ 24/7</h3>
                <div class="grid">
                    <div class="card">
                        <h4>Репатрак</h4>
                        <p>Транспорт на повредени автомобили</p>
                    </div>
                    <div class="card">
                        <h4>Помощ при авария</h4>
                        <p>Бърза помощ при аварийни ситуации</p>
                    </div>
                    <div class="card">
                        <h4>Транспорт на автомобили</h4>
                        <p>Безопасен транспорт на твоя автомобил</p>
                    </div>
                </div>
            </section>
        `;
    }

    renderCars() {
        return `
            <section>
                <h2>Автомобили за части</h2>
                <p class="section-subtitle">Разполагаме с различни автомобили за части. Всеки автомобил е описан подробно, за да можеш бързо да намериш това, което търсиш.</p>

                <div class="grid" id="carsGrid">
                    ${this.cars.length === 0 ? '<p>Няма добавени автомобили</p>' : ''}
                    ${this.cars.map(car => `
                        <div class="card">
                            <h4>${car.make} ${car.model}</h4>
                            <p><strong>Година:</strong> ${car.year}</p>
                            <p><strong>Двигател:</strong> ${car.engine}</p>
                            <p>${car.description}</p>
                            <button class="btn btn-secondary" onclick="alert('Запитване за част: ${car.make} ${car.model}')">Запитване за част</button>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }

    renderAbout() {
        return `
            <section>
                <h2>За нас</h2>
                <p class="section-subtitle">MTEXPARTS е бизнес, създаден с една цел – да предложи надеждно и бързо решение за всеки автомобилен проблем.</p>

                <div class="grid">
                    <div class="card">
                        <h4>Опит</h4>
                        <p>Имаме дълъг опит както в ремонта на автомобили, така и в търговията с нови и употребявани части.</p>
                    </div>
                    <div class="card">
                        <h4>Качество</h4>
                        <p>Работим с внимание към детайла и держим на коректното отношение към клиента.</p>
                    </div>
                    <div class="card">
                        <h4>Честност</h4>
                        <p>При нас няма излишни обещания – само реална работа, точни цени и бързо обслужване.</p>
                    </div>
                </div>

                <h3 style="margin-top: 3rem;">Локация</h3>
                <p>📍 Варна, ул. Краков 438</p>
                <p>Работно време: Пн-Сб 09:00 - 18:00</p>
            </section>
        `;
    }

    renderContact() {
        return `
            <section>
                <h2>Свържи се с нас</h2>

                <div class="grid">
                    <div class="card">
                        <h4>📞 Телефон</h4>
                        <p>+359 (0) 123 456 789</p>
                    </div>
                    <div class="card">
                        <h4>📍 Адрес</h4>
                        <p>Варна, ул. Краков 438</p>
                    </div>
                    <div class="card">
                        <h4>⏰ Работно време</h4>
                        <p>Пн-Сб: 09:00 - 18:00</p>
                        <p>Нд: Затворено</p>
                    </div>
                </div>

                <h3 style="margin-top: 3rem;">Форма за запитване</h3>
                <form id="contactForm">
                    <div class="form-group">
                        <label>Име</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Телефон</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Съобщение</label>
                        <textarea name="message" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Изпрати запитване</button>
                </form>
            </section>
        `;
    }

    renderAdmin() {
        return `
            <div class="admin-container">
                <div class="admin-sidebar">
                    <nav>
                        <ul>
                            <li><a href="#" onclick="app.showAdminSection('cars'); return false;" class="admin-link active">🚗 Управление на автомобили</a></li>
                            <li><a href="#" onclick="app.showAdminSection('bookings'); return false;" class="admin-link">📅 Резервации</a></li>
                            <li><a href="#" onclick="app.navigate('home'); return false;" class="admin-link">← Назад</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="admin-main">
                    <div id="adminContent"></div>
                </div>
            </div>
        `;
    }

    showAdminSection(section) {
        const content = document.getElementById('adminContent');
        
        if (section === 'cars') {
            content.innerHTML = `
                <div class="admin-header">
                    <h1>Управление на автомобили</h1>
                    <button class="btn btn-primary" onclick="app.showAddCarForm()">+ Добави автомобил</button>
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
                    <tbody id="carsTable">
                        ${this.cars.length === 0 ? '<tr><td colspan="5">Няма добавени автомобили</td></tr>' : ''}
                        ${this.cars.map((car, index) => `
                            <tr>
                                <td>${car.make}</td>
                                <td>${car.model}</td>
                                <td>${car.year}</td>
                                <td>${car.engine}</td>
                                <td>
                                    <div class="admin-actions">
                                        <button class="btn btn-small btn-edit" onclick="app.editCar(${index})">Редактирай</button>
                                        <button class="btn btn-small btn-delete" onclick="app.deleteCar(${index})">Изтрий</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else if (section === 'bookings') {
            content.innerHTML = `
                <div class="admin-header">
                    <h1>Резервации</h1>
                </div>

                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Име</th>
                            <th>Телефон</th>
                            <th>Автомобил</th>
                            <th>Услуга</th>
                            <th>Дата</th>
                            <th>Час</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.bookings.length === 0 ? '<tr><td colspan="6">Няма резервации</td></tr>' : ''}
                        ${this.bookings.map(booking => `
                            <tr>
                                <td>${booking.name}</td>
                                <td>${booking.phone}</td>
                                <td>${booking.car}</td>
                                <td>${booking.service}</td>
                                <td>${booking.date}</td>
                                <td>${booking.time}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }

        // Обновяване на активния линк
        document.querySelectorAll('.admin-link').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    showAddCarForm() {
        const container = document.getElementById('carFormContainer');
        container.innerHTML = `
            <form id="carForm" onsubmit="app.saveCar(event)">
                <h3>Добави нов автомобил</h3>
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
                    <label>Снимка (URL)</label>
                    <input type="url" name="image">
                </div>
                <button type="submit" class="btn btn-primary">Запази автомобил</button>
                <button type="button" class="btn btn-outline" onclick="document.getElementById('carFormContainer').innerHTML = ''">Отмени</button>
            </form>
        `;
    }

    saveCar(event) {
        event.preventDefault();
        const form = event.target;
        const car = {
            make: form.make.value,
            model: form.model.value,
            year: form.year.value,
            engine: form.engine.value,
            description: form.description.value,
            image: form.image.value || ''
        };

        this.cars.push(car);
        this.saveData();
        this.showAdminSection('cars');
        alert('Автомобилът е добавен успешно!');
    }

    editCar(index) {
        alert('Редактиране на автомобил ' + index);
    }

    deleteCar(index) {
        if (confirm('Сигурен ли си, че искаш да изтриеш този автомобил?')) {
            this.cars.splice(index, 1);
            this.saveData();
            this.showAdminSection('cars');
        }
    }

    loadData() {
        const savedCars = localStorage.getItem('mtexparts_cars');
        const savedBookings = localStorage.getItem('mtexparts_bookings');

        if (savedCars) {
            this.cars = JSON.parse(savedCars);
        }

        if (savedBookings) {
            this.bookings = JSON.parse(savedBookings);
        }
    }

    saveData() {
        localStorage.setItem('mtexparts_cars', JSON.stringify(this.cars));
        localStorage.setItem('mtexparts_bookings', JSON.stringify(this.bookings));
    }

    attachEventListeners() {
        // Booking form
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const booking = {
                    name: bookingForm.name.value,
                    phone: bookingForm.phone.value,
                    car: bookingForm.car.value,
                    service: bookingForm.service.value,
                    date: bookingForm.date.value,
                    time: bookingForm.time.value
                };
                this.bookings.push(booking);
                this.saveData();
                alert('Резервацията е записана! Ще се свържем с теб скоро.');
                bookingForm.reset();
            });
        }

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Благодаря за запитването! Ще се свържем с теб скоро.');
                contactForm.reset();
            });
        }
    }
}

// Инициализиране на приложението
const app = new MTEXParts();
