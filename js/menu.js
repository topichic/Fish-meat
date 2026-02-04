/**
 * Меню навигации и мобильная навигация
 */

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const body = document.body;
    
    // Создаем overlay для мобильного меню
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    body.appendChild(navOverlay);
    
    // Переключение мобильного меню
    function toggleMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Анимация иконки бургера
        const icon = navToggle.querySelector('i');
        if (navToggle.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
    
    // Закрытие меню при клике на ссылку
    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
    
    // Обработчики событий
    navToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Плавная прокрутка для якорных ссылок
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    closeMenu();
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Для обычных ссылок просто закрываем меню
                closeMenu();
            }
        });
    });
    
    // Закрытие меню при нажатии ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Активное состояние для текущей страницы
    function setActivePage() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActivePage();
    
    // Плавное появление меню при загрузке
    setTimeout(() => {
        navMenu.style.opacity = '1';
        navMenu.style.transform = 'translateY(0)';
    }, 100);
    
    // Добавляем индикатор прокрутки для активного раздела
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-scroll');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-scroll');
                    }
                });
            }
        });
    });
    
    // Анимация при наведении на логотип
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            const fishIcon = this.querySelector('.fa-fish');
            const meatIcon = this.querySelector('.fa-drumstick-bite');
            
            if (fishIcon && meatIcon) {
                fishIcon.style.animation = 'swim 0.5s ease-in-out 3';
                meatIcon.style.animation = 'bounce 0.5s ease-in-out 3';
            }
        });
    }
    
    // Добавляем атрибуты доступности
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'navMenu');
    
    navToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Управление фокусом в мобильном меню
    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && navMenu.classList.contains('active')) {
            const focusableElements = navMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    console.log('Menu module loaded successfully');
});