document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт La Bella Vita загружен!');
    
    // Мобильное меню
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    const navList = document.querySelector('.nav__list');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');

            // Анимация гамбургера
            const hamburger = this.querySelector('.hamburger');
            hamburger.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.querySelector('.hamburger').classList.remove('active');
            }
        });
    });

    // Активная страница в навигации
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else if (currentPage === '' && link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        });
    }

    // Кнопка "Наверх"
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Слайдер отзывов
    initTestimonialSlider();

    // Обновление текущего дня в часах работы
    updateCurrentDay();

    // Инициализация активной навигации
    setActiveNavLink();

    // Плавная прокрутка для якорей
    initSmoothScroll();

    // Анимация появления элементов при скролле
    initScrollAnimations();

    // Форма подписки на рассылку
    initNewsletterForm();

    // Форма обратной связи на странице контактов
    initContactForm();

    // Модальные окна
    initModals();
});

// ========== ФУНКЦИИ ==========

function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-arrow.prev');
    const nextBtn = slider.querySelector('.slider-arrow.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Скрыть все слайды
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Показать текущий слайд
        currentSlide = (index + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Навигация по точкам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Кнопки вперед/назад
    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    // Автопрокрутка каждые 5 секунд
    let slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);

    // Остановить автопрокрутку при наведении
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    });
}

function updateCurrentDay() {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    days.forEach((day, index) => {
        const element = document.getElementById(day);
        if (element && index === today) {
            element.classList.add('current-day');
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверяем, что это якорная ссылка (начинается с # и не только #)
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Обновляем URL без перезагрузки страницы
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });
}

function initScrollAnimations() {
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Добавляем класс для анимации
    const animatableElements = document.querySelectorAll(
        '.special-card, .benefit-card, .testimonial-slide, .contact-card, .dish-card'
    );
    
    animatableElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Функция для обработки анимации
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }

    // Запускаем при загрузке и при скролле
    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('resize', handleScrollAnimation);
    handleScrollAnimation(); // Инициализация
}

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        // Простая валидация email
        if (!isValidEmail(email)) {
            showFormMessage(this, 'Пожалуйста, введите корректный email адрес', 'error');
            return;
        }

        // Проверяем согласие
        const agreeCheckbox = this.querySelector('input[type="checkbox"]');
        if (agreeCheckbox && !agreeCheckbox.checked) {
            showFormMessage(this, 'Необходимо согласие на обработку данных', 'error');
            return;
        }

        // Имитация отправки на сервер
        showFormMessage(this, 'Спасибо за подписку! Проверьте ваш email для подтверждения.', 'success');
        
        // Очищаем поле
        emailInput.value = '';
        
        // Сохраняем в localStorage
        localStorage.setItem('newsletterSubscribed', 'true');
        localStorage.setItem('subscribedEmail', email);
        
        // Отправляем данные на сервер (заглушка)
        setTimeout(() => {
            console.log('Email отправлен на сервер:', email);
        }, 1000);
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = {
            name: this.querySelector('#name').value.trim(),
            phone: this.querySelector('#phone').value.trim(),
            email: this.querySelector('#email').value.trim(),
            subject: this.querySelector('#subject').value,
            message: this.querySelector('#message').value.trim(),
            subscribe: this.querySelector('#subscribe')?.checked || false
        };

        // Валидация
        const errors = [];
        
        if (!formData.name) errors.push('Имя обязательно для заполнения');
        if (!formData.phone) errors.push('Телефон обязателен для заполнения');
        if (formData.email && !isValidEmail(formData.email)) {
            errors.push('Некорректный email адрес');
        }
        if (!formData.message) errors.push('Сообщение обязательно для заполнения');

        if (errors.length > 0) {
            showFormMessage(this, errors.join('<br>'), 'error');
            return;
        }

        // Имитация отправки
        showFormMessage(this, 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Показываем модальное окно успеха
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.classList.add('active');
            
            // Закрытие модального окна
            successModal.querySelector('.modal-close').addEventListener('click', () => {
                successModal.classList.remove('active');
            });
            
            successModal.querySelector('#modalOkBtn').addEventListener('click', () => {
                successModal.classList.remove('active');
            });
            
            // Закрытие по клику вне окна
            successModal.addEventListener('click', (e) => {
                if (e.target === successModal) {
                    successModal.classList.remove('active');
                }
            });
        }

        // Очищаем форму
        this.reset();
        
        // Отправляем данные на сервер (заглушка)
        setTimeout(() => {
            console.log('Данные формы отправлены:', formData);
        }, 1000);
    });
}

function initModals() {
    // Закрытие всех модальных окон по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });

    // Закрытие по клику вне модального окна
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(form, message, type = 'success') {
    // Удаляем предыдущие сообщения
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Создаем новое сообщение
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message--${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Вставляем сообщение
    form.insertBefore(messageDiv, form.firstChild);

    // Автоматически скрываем через 5 секунд
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// ========== ГЛОБАЛЬНЫЕ ОБРАБОТЧИКИ ==========

// Обработка всех кнопок "Добавить в корзину"
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart') || 
        e.target.closest('.add-to-cart')) {
        const button = e.target.classList.contains('add-to-cart') ? 
                      e.target : e.target.closest('.add-to-cart');
        
        // Анимация кнопки
        button.classList.add('animated');
        button.innerHTML = '<i class="fas fa-check"></i> Добавлено';
        button.disabled = true;
        
        // Получаем информацию о блюде
        const dishCard = button.closest('.dish-card, .special-card');
        let dishName = '';
        let dishPrice = '';
        
        if (dishCard) {
            dishName = dishCard.querySelector('.dish-title, .special-card__title')?.textContent || 'Блюдо';
            dishPrice = dishCard.querySelector('.dish-price, .special-price')?.textContent || '';
        }
        
        // Добавляем в корзину
        addToCart({
            name: dishName,
            price: dishPrice,
            quantity: 1
        });
        
        // Возвращаем исходное состояние кнопки
        setTimeout(() => {
            button.classList.remove('animated');
            button.innerHTML = '<i class="fas fa-plus"></i> Добавить';
            button.disabled = false;
        }, 1500);
    }
});

// Функция добавления в корзину
function addToCart(item) {
    // Получаем текущую корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Проверяем, есть ли уже такой товар в корзине
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    
    if (existingItemIndex > -1) {
        // Увеличиваем количество
        cart[existingItemIndex].quantity += 1;
    } else {
        // Добавляем новый товар
        cart.push(item);
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем отображение корзины
    updateCartDisplay();
    
    // Показываем уведомление
    showNotification(`${item.name} добавлен в корзину!`);
}

// Обновление отображения корзины
function updateCartDisplay() {
    const cartMini = document.getElementById('cartMini');
    if (!cartMini) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = cartMini.querySelector('.cart-items');
    const cartCount = cartMini.querySelector('.cart-count');
    const totalPrice = cartMini.querySelector('.total-price');
    const checkoutBtn = cartMini.querySelector('#checkoutBtn');
    
    // Обновляем счетчик
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    
    // Обновляем список товаров
    if (cartItems) {
        cartItems.innerHTML = '';
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-details">
                        <span class="cart-item-quantity">${item.quantity} шт.</span>
                        <span class="cart-item-price">${item.price}</span>
                    </div>
                </div>
                <button class="cart-item-remove" data-name="${item.name}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            cartItems.appendChild(itemElement);
        });
    }
    
    // Обновляем общую сумму
    if (totalPrice) {
        // Извлекаем числа из цен (удаляем всё кроме цифр)
        const total = cart.reduce((sum, item) => {
            const price = parseInt(item.price.replace(/\D/g, '')) || 0;
            return sum + (price * item.quantity);
        }, 0);
        
        totalPrice.textContent = `${total} ₽`;
    }
    
    // Активируем/деактивируем кнопку оформления
    if (checkoutBtn) {
        if (cart.length > 0) {
            checkoutBtn.disabled = false;
        } else {
            checkoutBtn.disabled = true;
        }
    }
}

// Показ уведомления
function showNotification(message, type = 'success') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Добавляем на страницу
    document.body.appendChild(notification);
    
    // Показываем с анимацией
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Закрытие по кнопке
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Автоматическое закрытие через 3 секунды
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// Обработчик удаления из корзины
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cart-item-remove') || 
        e.target.closest('.cart-item-remove')) {
        const button = e.target.classList.contains('cart-item-remove') ? 
                      e.target : e.target.closest('.cart-item-remove');
        
        const itemName = button.dataset.name;
        removeFromCart(itemName);
    }
});

// Удаление из корзины
function removeFromCart(itemName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification(`${itemName} удален из корзины`, 'info');
}

// Инициализация корзины при загрузке
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    
    // Показ/скрытие мини-корзины
    const cartToggle = document.querySelector('.cart-toggle');
    const cartMini = document.getElementById('cartMini');
    
    if (cartToggle && cartMini) {
        cartToggle.addEventListener('click', () => {
            cartMini.classList.toggle('active');
        });
        
        // Закрытие при клике вне корзины
        document.addEventListener('click', (e) => {
            if (!cartMini.contains(e.target) && 
                !cartToggle.contains(e.target) && 
                cartMini.classList.contains('active')) {
                cartMini.classList.remove('active');
            }
        });
    }
    
    // Оформление заказа
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            if (cart.length === 0) {
                showNotification('Корзина пуста', 'error');
                return;
            }
            
            // Перенаправляем на страницу бронирования с данными корзины
            localStorage.setItem('checkoutCart', JSON.stringify(cart));
            window.location.href = 'reservation.html';
        });
    }
});