/**
 * Дополнительные функции для страницы контактов
 */

class ContactPage {
    constructor() {
        this.map = null;
        this.charCounter = document.getElementById('charCount');
        this.messageField = document.getElementById('message');
        
        this.init();
    }
    
    init() {
        this.initMap();
        this.initCharCounter();
        this.initServiceParam();
        this.initFormEnhancements();
        this.initCopyToClipboard();
    }
    
    initMap() {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;
        
        // Координаты офиса (Москва, ул. Разработчиков, 15)
        const officeCoords = [55.7558, 37.6173];
        
        // Инициализация карты
        this.map = L.map('map').setView(officeCoords, 15);
        
        // Добавляем слой карты
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(this.map);
        
        // Добавляем маркер
        const marker = L.marker(officeCoords).addTo(this.map);
        marker.bindPopup(`
            <b>Fish & Meat Studio</b><br>
            г. Москва, ул. Разработчиков, 15<br>
            Бизнес-центр "Код", офис 404
        `).openPopup();
        
        // Добавляем круг вокруг офиса
        L.circle(officeCoords, {
            color: '#2d8fff',
            fillColor: '#2d8fff',
            fillOpacity: 0.1,
            radius: 300
        }).addTo(this.map);
        
        // Адаптация карты при изменении размера
        window.addEventListener('resize', () => {
            this.map.invalidateSize();
        });
    }
    
    initCharCounter() {
        if (!this.charCounter || !this.messageField) return;
        
        this.messageField.addEventListener('input', () => {
            const length = this.messageField.value.length;
            this.charCounter.textContent = length;
            
            // Изменяем цвет при приближении к лимиту
            if (length > 900) {
                this.charCounter.style.color = '#ff6b6b';
            } else if (length > 700) {
                this.charCounter.style.color = '#ffa726';
            } else {
                this.charCounter.style.color = '#2d8fff';
            }
        });
        
        // Инициализируем начальное значение
        this.charCounter.textContent = this.messageField.value.length;
    }
    
    initServiceParam() {
        // Автоматический выбор услуги из URL параметра
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        
        if (serviceParam) {
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                // Ищем опцию с соответствующим значением
                for (let option of serviceSelect.options) {
                    if (option.value === serviceParam) {
                        serviceSelect.value = serviceParam;
                        break;
                    }
                }
            }
        }
    }
    
    initFormEnhancements() {
        // Добавляем маску для телефона
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.startsWith('7') || value.startsWith('8')) {
                    value = value.substring(1);
                }
                
                let formattedValue = '+7 ';
                
                if (value.length > 0) {
                    formattedValue += '(' + value.substring(0, 3);
                }
                if (value.length >= 4) {
                    formattedValue += ') ' + value.substring(3, 6);
                }
                if (value.length >= 7) {
                    formattedValue += '-' + value.substring(6, 8);
                }
                if (value.length >= 9) {
                    formattedValue += '-' + value.substring(8, 10);
                }
                
                e.target.value = formattedValue;
            });
        }
        
        // Автозаполнение компании из local storage
        const companyInput = document.getElementById('company');
        if (companyInput) {
            const savedCompany = localStorage.getItem('last_company_name');
            if (savedCompany) {
                companyInput.value = savedCompany;
            }
            
            companyInput.addEventListener('blur', () => {
                if (companyInput.value) {
                    localStorage.setItem('last_company_name', companyInput.value);
                }
            });
        }
        
        // Сохранение черновика формы
        this.initFormDraft();
    }
    
    initFormDraft() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const DRAFT_KEY = 'contact_form_draft';
        
        // Загрузка черновика
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft) {
            try {
                const data = JSON.parse(draft);
                Object.keys(data).forEach(key => {
                    const field = form.querySelector(`[name="${key}"]`);
                    if (field) {
                        if (field.type === 'checkbox') {
                            field.checked = data[key];
                        } else {
                            field.value = data[key];
                        }
                    }
                });
                
                // Показываем уведомление о восстановленном черновике
                this.showDraftNotification();
            } catch (e) {
                console.error('Error loading form draft:', e);
            }
        }
        
        // Автосохранение при изменении
        const saveDraft = () => {
            const formData = new FormData(form);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Сохраняем чекбоксы отдельно
            const checkboxes = form.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                data[checkbox.name] = checkbox.checked;
            });
            
            localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
        };
        
        // Сохраняем при изменении с debounce
        let saveTimeout;
        form.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveDraft, 1000);
        });
        
        // Очищаем черновик при успешной отправке
        form.addEventListener('submit', () => {
            localStorage.removeItem(DRAFT_KEY);
        });
    }
    
    showDraftNotification() {
        const notification = document.createElement('div');
        notification.className = 'draft-notification';
        notification.innerHTML = `
            <p><i class="fas fa-history"></i> Восстановлен черновик формы</p>
            <button class="btn btn-small btn-outline" id="clearDraft">
                <i class="fas fa-trash"></i> Очистить
            </button>
        `;
        
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(notification, form);
        
        // Автоматически скрываем через 5 секунд
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Обработчик кнопки очистки
        document.getElementById('clearDraft').addEventListener('click', () => {
            localStorage.removeItem('contact_form_draft');
            location.reload();
        });
    }
    
    initCopyToClipboard() {
        // Копирование email и телефона при клике
        const contactItems = document.querySelectorAll('.contact-text a[href^="mailto:"], .contact-text a[href^="tel:"]');
        
        contactItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.title = 'Нажмите чтобы скопировать';
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const textToCopy = item.textContent;
                this.copyToClipboard(textToCopy);
                
                // Визуальная обратная связь
                const originalText = item.textContent;
                item.textContent = 'Скопировано!';
                item.style.color = '#2d8fff';
                
                setTimeout(() => {
                    item.textContent = originalText;
                    item.style.color = '';
                }, 2000);
            });
        });
    }
    
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Скопировано в буфер обмена');
        } catch (err) {
            console.error('Ошибка копирования:', err);
            this.showToast('Ошибка копирования', 'error');
        }
    }
    
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Анимация появления
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Автоматическое скрытие
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
        
        // Стили для toast
        if (!document.querySelector('#toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #333;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transform: translateY(100px);
                    opacity: 0;
                    transition: all 0.3s ease;
                    z-index: 9999;
                    max-width: 300px;
                }
                
                .toast.show {
                    transform: translateY(0);
                    opacity: 1;
                }
                
                .toast-success {
                    background: #00b894;
                }
                
                .toast-error {
                    background: #ff6b6b;
                }
            `;
            document.head.appendChild(styles);
        }
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const contactPage = new ContactPage();
    window.ContactPage = contactPage;
    
    console.log('Contact page module loaded successfully');
});