document.addEventListener('DOMContentLoaded', function() {
    // Данные событий
    const eventsData = {
        '2024-03-15': 'Дегустация вин',
        '2024-03-22': 'Мастер-класс',
        '2024-03-29': 'Живая музыка',
        '2024-03-08': '8 Марта',
        '2024-03-30': 'Джазовый вечер'
    };

    let currentDate = new Date();
    
    // Инициализация календаря
    initCalendar();
    
    // Навигация по месяцам
    document.getElementById('prevMonth').addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    function initCalendar() {
        renderCalendar();
        
        // Клик по дню
        document.getElementById('calendarGrid').addEventListener('click', function(e) {
            if (e.target.classList.contains('calendar-day') && 
                !e.target.classList.contains('empty')) {
                
                const day = e.target.dataset.day;
                if (day) {
                    showDayEvents(day);
                }
            }
        });
    }
    
    function renderCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        
        // Обновить заголовок месяца
        document.getElementById('currentMonth').textContent = 
            `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        // Очистить календарь
        calendarGrid.innerHTML = '';
        
        // Получить первый день месяца
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
        
        // Добавить пустые ячейки для начала месяца
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Добавить дни месяца
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            dayElement.dataset.day = day;
            
            // Проверить, сегодня ли это
            if (today.getDate() === day && 
                today.getMonth() === currentDate.getMonth() && 
                today.getFullYear() === currentDate.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Проверить, есть ли события
            const dateStr = `${currentDate.getFullYear()}-${pad(currentDate.getMonth() + 1)}-${pad(day)}`;
            if (eventsData[dateStr]) {
                dayElement.classList.add('event');
                dayElement.title = eventsData[dateStr];
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    function pad(num) {
        return num.toString().padStart(2, '0');
    }
    
    function showDayEvents(day) {
        const dateStr = `${currentDate.getFullYear()}-${pad(currentDate.getMonth() + 1)}-${pad(day)}`;
        const eventTitle = eventsData[dateStr];
        
        if (eventTitle) {
            alert(`На ${day}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}: ${eventTitle}`);
        } else {
            alert(`На ${day}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} событий не запланировано.`);
        }
    }
    
    // Программа лояльности
    document.getElementById('joinLoyalty').addEventListener('click', function() {
        const modalHTML = `
            <div class="modal-overlay active" id="loyaltyModal">
                <div class="modal">
                    <button class="modal-close" onclick="this.closest('.modal-overlay').classList.remove('active')">×</button>
                    <h3 class="modal-title">Присоединиться к программе лояльности</h3>
                    <form id="loyaltyForm">
                        <div class="form-group">
                            <label>Имя и фамилия *</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>Телефон *</label>
                            <input type="tel" required>
                        </div>
                        <div class="form-group">
                            <label>Дата рождения</label>
                            <input type="date">
                        </div>
                        <button type="submit" class="btn btn--primary">Стать участником</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        document.getElementById('loyaltyForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо! Вы успешно присоединились к программе лояльности.');
            document.getElementById('loyaltyModal').classList.remove('active');
        });
    });
});