/**
 * Валидация форм
 */

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.init();
    }
    
    init() {
        this.setupValidation();
        this.setupSubmitHandler();
        this.setupRealTimeValidation();
        this.setupAccessibility();
    }
    
    setupValidation() {
        // Правила валидации для разных типов полей
        this.validationRules = {
            text: {
                pattern: /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,50}$/,
                message: 'Поле должно содержать от 2 до 50 символов (только буквы, пробелы и дефисы)'
            },
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Введите корректный email адрес'
            },
            phone: {
                pattern: /^[\d\s\-\+\(\)]{10,20}$/,
                message: 'Введите корректный номер телефона'
            },
            message: {
                pattern: /^.{10,1000}$/s,
                message: 'Сообщение должно содержать от 10 до 1000 символов'
            }
        };
        
        // Кастомные валидаторы
        this.customValidators = {
            'agree': this.validateCheckbox.bind(this),
            'budget': this.validateBudget.bind(this),
            'service': this.validateSelect.bind(this)
        };
    }
    
    setupSubmitHandler() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitForm();
            } else {
                this.showFormError('Пожалуйста, исправьте ошибки в форме');
            }
        });
    }
    
    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }
    
    setupAccessibility() {
        // Добавляем ARIA атрибуты
        const fields = this.form.querySelectorAll('[required]');
        fields.forEach(field => {
            if (!field.hasAttribute('aria-required')) {
                field.setAttribute('aria-required', 'true');
            }
        });
        
        // Сообщения об ошибках для скринридеров
        this.form.addEventListener('invalid', (e) => {
            e.preventDefault();
        }, true);
    }
    
    validateForm() {
        let isValid = true;
        const fields = this.form.querySelectorAll('input, textarea, select');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const fieldType = field.type || field.tagName.toLowerCase();
        const fieldName = field.name;
        const value = field.value.trim();
        
        // Очищаем предыдущие ошибки
        this.clearFieldError(field);
        
        // Проверка обязательных полей
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'Это поле обязательно для заполнения');
            return false;
        }
        
        // Если поле не обязательно и пустое - пропускаем проверку
        if (!field.hasAttribute('required') && !value) {
            return true;
        }
        
        // Кастомные валидаторы
        if (this.customValidators[fieldName]) {
            return this.customValidators[fieldName](field, value);
        }
        
        // Стандартные валидаторы
        switch (fieldType) {
            case 'text':
            case 'input':
                if (fieldName === 'name') {
                    return this.validateText(field, value, 'text');
                }
                break;
                
            case 'email':
                return this.validateEmail(field, value);
                
            case 'tel':
                return this.validatePhone(field, value);
                
            case 'textarea':
                if (fieldName === 'message') {
                    return this.validateText(field, value, 'message');
                }
                break;
                
            case 'select-one':
                return this.validateSelect(field, value);
        }
        
        return true;
    }
    
    validateText(field, value, type) {
        const rule = this.validationRules[type];
        
        if (!rule.pattern.test(value)) {
            this.showFieldError(field, rule.message);
            return false;
        }
        
        return true;
    }
    
    validateEmail(field, value) {
        const rule = this.validationRules.email;
        
        if (!rule.pattern.test(value)) {
            this.showFieldError(field, rule.message);
            return false;
        }
        
        return true;
    }
    
    validatePhone(field, value) {
        const rule = this.validationRules.phone;
        
        // Убираем все кроме цифр для проверки длины
        const digitsOnly = value.replace(/\D/g, '');
        
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            this.showFieldError(field, rule.message);
            return false;
        }
        
        return true;
    }
    
    validateCheckbox(field, value) {
        if (!field.checked) {
            this.showFieldError(field, 'Необходимо согласие с условиями');
            return false;
        }
        
        return true;
    }
    
    validateBudget(field, value) {
        // Бюджет может быть не выбран
        return true;
    }
    
    validateSelect(field, value) {
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'Пожалуйста, выберите значение');
            return false;
        }
        
        return true;
    }
    
    showFieldError(field, message) {
        // Добавляем класс ошибки
        field.classList.add('error');
        
        // Создаем или обновляем элемент с ошибкой
        let errorElement = field.parentNode.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'polite');
        
        // Фокус на поле с ошибкой
        if (!field.hasAttribute('data-error-focused')) {
            field.setAttribute('data-error-focused', 'true');
            field.focus();
        }
        
        // Визуальный эффект
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        field.removeAttribute('data-error-focused');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    showFormError(message) {
        // Показываем общую ошибку формы
        let formError = this.form.querySelector('.form-error');
        
        if (!formError) {
            formError = document.createElement('div');
            formError.className = 'form-error';
            this.form.prepend(formError);
        }
        
        formError.textContent = message;
        formError.setAttribute('role', 'alert');
        formError.setAttribute('aria-live', 'assertive');
        
        // Автоматически скрываем через 5 секунд
        setTimeout(() => {
            formError.remove();
        }, 5000);
    }
    
    async submitForm() {
        const formData = new FormData(this.form);
        const submitButton = this.form.querySelector('button[type="submit"]');
        
        // Показываем индикатор загрузки
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitButton.disabled = true;
        
        try {
            // В реальном проекте здесь был бы fetch запрос
            await this.simulateApiCall(formData);
            
            // Показываем сообщение об успехе
            this.showSuccessMessage();
            
            // Сбрасываем форму
            this.form.reset();
            
        } catch (error) {
            this.showFormError('Ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
            console.error('Form submission error:', error);
        } finally {
            // Восстанавливаем кнопку
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
    
    simulateApiCall(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Симуляция успешной отправки
                const shouldFail = Math.random() < 0.1; // 10% шанс ошибки
                
                if (shouldFail) {
                    reject(new Error('Серверная ошибка'));
                } else {
                    resolve({
                        success: true,
                        message: 'Форма успешно отправлена'
                    });
                }
            }, 1500);
        });
    }
    
    showSuccessMessage() {
        // Скрываем форму
        this.form.style.display = 'none';
        
        // Показываем сообщение об успехе
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Сообщение отправлено!</h3>
                <p>Спасибо за ваше обращение. Мы свяжемся с вами в течение 24 часов.</p>
                <button class="btn btn-primary" id="sendAnother">
                    <i class="fas fa-paper-plane"></i> Отправить еще одно сообщение
                </button>
            </div>
        `;
        
        this.form.parentNode.appendChild(successMessage);
        
        // Обработчик кнопки "Отправить еще"
        document.getElementById('sendAnother').addEventListener('click', () => {
            successMessage.remove();
            this.form.style.display = 'block';
            this.form.reset();
        });
    }
    
    // Статические методы для использования вне класса
    static initAllForms() {
        const forms = document.querySelectorAll('form[data-validate]');
        forms.forEach(form => {
            new FormValidator(form.id);
        });
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем валидацию для всех форм
    FormValidator.initAllForms();
    
    // Инициализируем конкретную форму контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new FormValidator('contactForm');
    }
    
    // Добавляем стили для валидации
    const validationStyles = document.createElement('style');
    validationStyles.textContent = `
        .error {
            border-color: #ff6b6b !important;
            background-color: #fff0f0 !important;
        }
        
        .error-message {
            color: #ff6b6b;
            font-size: 0.9rem;
            margin-top: 5px;
            animation: fadeIn 0.3s ease-out;
        }
        
        .form-error {
            background: #fff0f0;
            border: 1px solid #ff6b6b;
            color: #ff4757;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            animation: slideIn 0.3s ease-out;
        }
        
        .success-message {
            background: #f0fff4;
            border: 1px solid #00b894;
            color: #00a085;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            animation: fadeIn 0.5s ease-out;
        }
        
        .success-content i {
            font-size: 4rem;
            color: #00b894;
            margin-bottom: 20px;
            animation: bounce 1s ease-in-out;
        }
        
        .success-content h3 {
            color: #00a085;
            margin-bottom: 15px;
        }
        
        .success-content p {
            color: #666;
            margin-bottom: 30px;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(validationStyles);
    
    console.log('Form validation module loaded successfully');
});