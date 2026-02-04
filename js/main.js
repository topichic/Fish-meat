/**
 * Основные функции сайта
 */

class FishMeatStudio {
    constructor() {
        this.init();
    }
    
    init() {
        this.initScrollToTop();
        this.initAnimations();
        this.initCounters();
        this.initTooltips();
        this.initTheme();
        this.initPerformance();
    }
    
    // Кнопка "Наверх"
    initScrollToTop() {
        const scrollTopBtn = document.getElementById('scrollTop');
        
        if (!scrollTopBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Добавляем доступность
        scrollTopBtn.setAttribute('aria-label', 'Прокрутить наверх');
        scrollTopBtn.setAttribute('role', 'button');
    }
    
    // Анимации при прокрутке
    initAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Наблюдаем за элементами с анимацией
        const animatedElements = document.querySelectorAll('.feature-card, .service-card, .portfolio-card, .team-member');
        animatedElements.forEach(el => observer.observe(el));
        
        // Добавляем класс для анимации
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: fadeIn 0.6s ease-out forwards;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .feature-card:nth-child(1) { animation-delay: 0.1s; }
            .feature-card:nth-child(2) { animation-delay: 0.2s; }
            .feature-card:nth-child(3) { animation-delay: 0.3s; }
        `;
        document.head.appendChild(style);
    }
    
    // Анимация счетчиков
    initCounters() {
        const counters = document.querySelectorAll('.stat-number, .member-stat .stat-value');
        
        if (!counters.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent);
        const suffix = element.textContent.replace(/[0-9]/g, '');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    // Всплывающие подсказки
    initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            element.appendChild(tooltip);
            
            element.addEventListener('mouseenter', () => {
                tooltip.classList.add('visible');
            });
            
            element.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });
            
            // Для доступности
            element.setAttribute('aria-label', tooltipText);
        });
        
        // Стили для подсказок
        const tooltipStyles = document.createElement('style');
        tooltipStyles.textContent = `
            .tooltip {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 0.9rem;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                pointer-events: none;
                z-index: 1000;
                margin-bottom: 8px;
            }
            
            .tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 6px solid transparent;
                border-top-color: #333;
            }
            
            .tooltip.visible {
                opacity: 1;
                visibility: visible;
            }
        `;
        document.head.appendChild(tooltipStyles);
    }
    
    // Темная тема
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (!themeToggle) {
            // Создаем переключатель темы если его нет
            this.createThemeToggle();
            return;
        }
        
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'themeToggle';
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Переключить тему');
        
        const header = document.querySelector('.header .container');
        if (header) {
            header.appendChild(themeToggle);
            
            // Стили для переключателя
            const styles = document.createElement('style');
            styles.textContent = `
                .theme-toggle {
                    background: none;
                    border: none;
                    color: #2d8fff;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 8px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    margin-left: 10px;
                }
                
                .theme-toggle:hover {
                    background: rgba(45, 143, 255, 0.1);
                }
                
                [data-theme="dark"] .theme-toggle {
                    color: #ff6b6b;
                }
            `;
            document.head.appendChild(styles);
            
            this.initTheme();
        }
    }
    
    // Оптимизация производительности
    initPerformance() {
        // Ленивая загрузка изображений
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
        
        // Предзагрузка критичных ресурсов
        this.preloadCriticalResources();
        
        // Измерение производительности
        this.measurePerformance();
    }
    
    preloadCriticalResources() {
        const links = [
            { rel: 'preload', href: 'css/style.css', as: 'style' },
            { rel: 'preload', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', as: 'style' },
            { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Russo+One&display=swap', as: 'style' }
        ];
        
        links.forEach(link => {
            const el = document.createElement('link');
            Object.assign(el, link);
            document.head.appendChild(el);
        });
    }
    
    measurePerformance() {
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                
                console.log(`Время загрузки страницы: ${loadTime}ms`);
                
                if (loadTime > 3000) {
                    console.warn('Время загрузки превышает 3 секунды');
                }
            }
        });
    }
    
    // Утилитарные методы
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const app = new FishMeatStudio();
    window.FishMeatStudio = app;
    
    // Глобальные обработчики ошибок
    window.addEventListener('error', (e) => {
        console.error('Произошла ошибка:', e.error);
        // Можно отправить ошибку на сервер для анализа
    });
    
    // Аналитика (упрощенная версия)
    window.addEventListener('pagehide', () => {
        const timeSpent = Math.round(performance.now() / 1000);
        console.log(`Пользователь провел на странице ${timeSpent} секунд`);
    });
    
    console.log('Fish & Meat Studio application initialized');
});