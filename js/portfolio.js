/**
 * Портфолио - фильтрация и модальные окна
 */

class PortfolioManager {
    constructor() {
        this.portfolioGrid = document.getElementById('portfolioGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.searchInput = document.getElementById('portfolioSearch');
        this.modal = document.getElementById('projectModal');
        this.modalBody = document.getElementById('modalBody');
        this.modalClose = document.getElementById('modalClose');
        
        if (!this.portfolioGrid) return;
        
        this.init();
    }
    
    init() {
        this.setupFiltering();
        this.setupSearch();
        this.setupModal();
        this.setupPagination();
        this.loadProjects();
    }
    
    setupFiltering() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Убираем активный класс у всех кнопок
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
            });
        });
    }
    
    setupSearch() {
        if (!this.searchInput) return;
        
        this.searchInput.addEventListener('input', () => {
            const searchTerm = this.searchInput.value.toLowerCase();
            this.searchProjects(searchTerm);
        });
        
        // Очистка поиска
        const searchContainer = this.searchInput.parentNode;
        const clearButton = document.createElement('button');
        clearButton.className = 'search-clear';
        clearButton.innerHTML = '<i class="fas fa-times"></i>';
        clearButton.setAttribute('aria-label', 'Очистить поиск');
        
        clearButton.addEventListener('click', () => {
            this.searchInput.value = '';
            this.searchProjects('');
            this.searchInput.focus();
        });
        
        searchContainer.appendChild(clearButton);
    }
    
    setupModal() {
        if (!this.modal) return;
        
        // Закрытие модального окна
        this.modalClose.addEventListener('click', () => this.closeModal());
        
        // Закрытие по клику на оверлей
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
        
        // Открытие модального окна при клике на проект
        this.portfolioGrid.addEventListener('click', (e) => {
            const viewButton = e.target.closest('.view-project, .view-details');
            if (viewButton) {
                e.preventDefault();
                const projectId = viewButton.getAttribute('data-project');
                this.openModal(projectId);
            }
        });
    }
    
    setupPagination() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const pageNumbers = document.querySelectorAll('.page-number');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.changePage('prev'));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.changePage('next'));
        }
        
        pageNumbers.forEach(number => {
            number.addEventListener('click', () => {
                const page = parseInt(number.textContent);
                this.goToPage(page);
            });
        });
    }
    
    filterProjects(filter) {
        const projects = this.portfolioGrid.querySelectorAll('.portfolio-card');
        
        projects.forEach(project => {
            const category = project.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 10);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
        
        // Обновляем счетчик проектов
        this.updateProjectCount(filter);
    }
    
    searchProjects(term) {
        const projects = this.portfolioGrid.querySelectorAll('.portfolio-card');
        
        projects.forEach(project => {
            const searchData = project.getAttribute('data-search');
            const title = project.querySelector('.project-title').textContent.toLowerCase();
            const description = project.querySelector('.project-description').textContent.toLowerCase();
            
            const matches = searchData.includes(term) || 
                           title.includes(term) || 
                           description.includes(term);
            
            if (matches || term === '') {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 10);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }
    
    updateProjectCount(filter) {
        const countElement = document.querySelector('.projects-count');
        if (!countElement) return;
        
        const visibleProjects = this.portfolioGrid.querySelectorAll('.portfolio-card[style*="display: block"]').length;
        countElement.textContent = visibleProjects;
    }
    
    async loadProjects() {
        // В реальном проекте здесь был бы fetch запрос
        const loadingElement = document.createElement('div');
        loadingElement.className = 'loading';
        loadingElement.innerHTML = '<div class="loading-spinner"></div>';
        
        this.portfolioGrid.appendChild(loadingElement);
        
        // Симуляция загрузки данных
        setTimeout(() => {
            loadingElement.remove();
            this.animateProjects();
        }, 1000);
    }
    
    animateProjects() {
        const projects = this.portfolioGrid.querySelectorAll('.portfolio-card');
        
        projects.forEach((project, index) => {
            project.style.opacity = '0';
            project.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                project.style.transition = 'all 0.5s ease-out';
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    async openModal(projectId) {
        // Показываем модальное окно
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Показываем загрузку
        this.modalBody.innerHTML = `
            <div class="modal-loading">
                <div class="loading-spinner"></div>
                <p>Загрузка проекта...</p>
            </div>
        `;
        
        // Загружаем данные проекта
        const projectData = await this.fetchProjectData(projectId);
        
        // Отображаем данные
        this.modalBody.innerHTML = this.createModalContent(projectData);
        
        // Инициализируем галерею если есть
        this.initModalGallery();
        
        // Фокус внутри модального окна
        this.modalClose.focus();
    }
    
    async fetchProjectData(projectId) {
        // В реальном проекте здесь был бы fetch запрос
        return new Promise((resolve) => {
            setTimeout(() => {
                const projects = {
                    '1': {
                        id: 1,
                        title: 'AnalyticsPro Bot',
                        category: 'fish',
                        client: 'Сеть ресторанов "ВкусноГрад"',
                        year: '2024',
                        description: 'Бот для глубокого анализа продаж ресторана. Интеграция с 1С, автоматические отчеты, прогнозирование.',
                        technologies: ['Python', 'PostgreSQL', '1C API', 'Data Visualization'],
                        results: [
                            'Сокращение времени отчетов на 70%',
                            'Увеличение точности прогнозов на 40%',
                            'Автоматизация 5 рутинных процессов',
                            'Интеграция с 10+ ресторанами сети'
                        ],
                        images: ['analytics-1.jpg', 'analytics-2.jpg', 'analytics-3.jpg']
                    },
                    '2': {
                        id: 2,
                        title: 'QuickDelivery Bot',
                        category: 'meat',
                        client: 'Служба доставки "БыстрыйКурьер"',
                        year: '2023',
                        description: 'Система автоматизации доставки для службы курьеров. Геолокация, уведомления, оплата онлайн.',
                        technologies: ['Node.js', 'MongoDB', 'Yandex Maps API', 'Payment System'],
                        results: [
                            'Ускорение обработки заказов в 3 раза',
                            'Снижение ошибок при доставке на 45%',
                            'Интеграция с 50+ курьерами',
                            'Снижение затрат на логистику на 30%'
                        ],
                        images: ['delivery-1.jpg', 'delivery-2.jpg']
                    }
                };
                
                resolve(projects[projectId] || projects[1]);
            }, 500);
        });
    }
    
    createModalContent(project) {
        return `
            <div class="modal-project">
                <div class="modal-header">
                    <div class="project-badge ${project.category}-badge">${project.category === 'fish' ? 'Fish' : project.category === 'meat' ? 'Meat' : 'Hybrid'}</div>
                    <h2>${project.title}</h2>
                    <div class="project-meta">
                        <span class="meta-item">
                            <i class="fas fa-user"></i> ${project.client}
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-calendar"></i> ${project.year}
                        </span>
                    </div>
                </div>
                
                <div class="modal-gallery">
                    <div class="gallery-main">
                        <img src="images/portfolio/project${project.id}.jpg" alt="${project.title}" class="main-image">
                    </div>
                    <div class="gallery-thumbs">
                        ${project.images.map((img, index) => `
                            <div class="thumb ${index === 0 ? 'active' : ''}" data-image="${img}">
                                <img src="images/portfolio/${img}" alt="Изображение ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-content">
                    <div class="content-section">
                        <h3><i class="fas fa-info-circle"></i> Описание проекта</h3>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="content-section">
                        <h3><i class="fas fa-cogs"></i> Используемые технологии</h3>
                        <div class="tech-list">
                            ${project.technologies.map(tech => `
                                <span class="tech-tag">${tech}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="content-section">
                        <h3><i class="fas fa-chart-line"></i> Результаты</h3>
                        <ul class="results-list">
                            ${project.results.map(result => `
                                <li><i class="fas fa-check-circle"></i> ${result}</li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="content-section">
                        <h3><i class="fas fa-comment"></i> Отзыв клиента</h3>
                        <blockquote class="client-quote">
                            <p>"Отличная работа команды Fish & Meat Studio. Бот полностью изменил наш подход к аналитике продаж."</p>
                            <footer>— ${project.client}</footer>
                        </blockquote>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <a href="contact.html" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i> Заказать похожий проект
                    </a>
                    <button class="btn btn-outline close-modal-btn">
                        <i class="fas fa-times"></i> Закрыть
                    </button>
                </div>
            </div>
        `;
    }
    
    initModalGallery() {
        const thumbs = this.modalBody.querySelectorAll('.gallery-thumbs .thumb');
        const mainImage = this.modalBody.querySelector('.main-image');
        
        if (!thumbs.length || !mainImage) return;
        
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Убираем активный класс у всех миниатюр
                thumbs.forEach(t => t.classList.remove('active'));
                // Добавляем активный класс текущей миниатюре
                thumb.classList.add('active');
                
                // Меняем основное изображение
                const newImage = thumb.getAttribute('data-image');
                mainImage.src = `images/portfolio/${newImage}`;
                mainImage.alt = thumb.querySelector('img').alt;
                
                // Анимация перехода
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 100);
            });
        });
        
        // Обработчик кнопки закрытия
        const closeBtn = this.modalBody.querySelector('.close-modal-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Возвращаем фокус на кнопку которая открывала модальное окно
        const lastFocused = document.querySelector('.view-project:focus, .view-details:focus');
        if (lastFocused) {
            lastFocused.focus();
        }
    }
    
    changePage(direction) {
        const currentPage = parseInt(document.querySelector('.page-number.active').textContent);
        const totalPages = document.querySelectorAll('.page-number').length;
        
        let newPage;
        if (direction === 'prev') {
            newPage = Math.max(1, currentPage - 1);
        } else {
            newPage = Math.min(totalPages, currentPage + 1);
        }
        
        if (newPage !== currentPage) {
            this.goToPage(newPage);
        }
    }
    
    goToPage(page) {
        // Обновляем активную страницу
        const pageNumbers = document.querySelectorAll('.page-number');
        pageNumbers.forEach(number => {
            number.classList.remove('active');
            if (parseInt(number.textContent) === page) {
                number.classList.add('active');
            }
        });
        
        // Обновляем состояние кнопок
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === pageNumbers.length;
        
        // Загружаем проекты для страницы (в реальном проекте)
        console.log(`Загрузка страницы ${page}...`);
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PortfolioManager();
    window.PortfolioManager = portfolio;
    
    console.log('Portfolio module loaded successfully');
});