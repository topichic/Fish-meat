/**
 * Функциональность блога
 */

class BlogManager {
    constructor() {
        this.articlesGrid = document.getElementById('articlesGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.searchInput = document.getElementById('blogSearch');
        this.sortSelect = document.getElementById('sortArticles');
        this.bookmarkButtons = document.querySelectorAll('.bookmark-btn');
        this.bookmarksModal = document.getElementById('bookmarksModal');
        this.bookmarksList = document.getElementById('bookmarksList');
        this.emptyBookmarks = document.getElementById('emptyBookmarks');
        this.newsletterForm = document.getElementById('newsletterForm');
        
        this.init();
    }
    
    init() {
        this.setupFiltering();
        this.setupSearch();
        this.setupSorting();
        this.setupBookmarks();
        this.setupNewsletter();
        this.setupCategories();
        this.loadArticles();
    }
    
    setupFiltering() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Убираем активный класс у всех кнопок
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                this.filterArticles(category);
            });
        });
        
        // Обработчики для категорий в сайдбаре
        const categoryItems = document.querySelectorAll('.category-item');
        categoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const category = item.getAttribute('data-category');
                
                // Активируем соответствующую кнопку фильтра
                this.filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-category') === category) {
                        btn.click();
                    }
                });
                
                // Прокручиваем к фильтрам
                document.querySelector('.blog-filters').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
    
    setupSearch() {
        if (!this.searchInput) return;
        
        const searchBtn = document.querySelector('.search-btn');
        const searchHandler = () => {
            const searchTerm = this.searchInput.value.toLowerCase();
            this.searchArticles(searchTerm);
        };
        
        this.searchInput.addEventListener('input', searchHandler);
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchHandler();
            }
        });
        
        if (searchBtn) {
            searchBtn.addEventListener('click', searchHandler);
        }
    }
    
    setupSorting() {
        if (!this.sortSelect) return;
        
        this.sortSelect.addEventListener('change', () => {
            const sortBy = this.sortSelect.value;
            this.sortArticles(sortBy);
        });
    }
    
    setupBookmarks() {
        // Загружаем сохраненные закладки
        this.loadBookmarks();
        
        // Обработчики для кнопок закладок
        this.bookmarkButtons.forEach(button => {
            button.addEventListener('click', () => {
                const articleId = button.getAttribute('data-article');
                this.toggleBookmark(articleId, button);
            });
        });
        
        // Модальное окно закладок
        const bookmarksBtn = document.querySelector('.bookmarks-btn');
        const bookmarksClose = document.getElementById('bookmarksClose');
        
        if (bookmarksBtn) {
            bookmarksBtn.addEventListener('click', () => {
                this.openBookmarksModal();
            });
        }
        
        if (bookmarksClose) {
            bookmarksClose.addEventListener('click', () => {
                this.closeBookmarksModal();
            });
        }
        
        // Закрытие по клику на оверлей
        if (this.bookmarksModal) {
            this.bookmarksModal.addEventListener('click', (e) => {
                if (e.target === this.bookmarksModal) {
                    this.closeBookmarksModal();
                }
            });
        }
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.bookmarksModal.classList.contains('active')) {
                this.closeBookmarksModal();
            }
        });
    }
    
    setupNewsletter() {
        if (!this.newsletterForm) return;
        
        this.newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = this.newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!this.validateEmail(email)) {
                this.showNewsletterError('Введите корректный email адрес');
                return;
            }
            
            // Показываем индикатор загрузки
            const submitBtn = this.newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
            
            try {
                // В реальном проекте здесь был бы fetch запрос
                await this.subscribeToNewsletter(email);
                
                this.showNewsletterSuccess('Вы успешно подписались на рассылку!');
                emailInput.value = '';
                
                // Сохраняем в localStorage
                this.saveSubscription(email);
                
            } catch (error) {
                this.showNewsletterError('Ошибка при подписке. Попробуйте еще раз.');
                console.error('Newsletter subscription error:', error);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    setupCategories() {
        // Обработчики для тегов
        const tags = document.querySelectorAll('.tag, .tag-cloud');
        tags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const tagText = tag.textContent;
                
                // Устанавливаем значение в поиск
                if (this.searchInput) {
                    this.searchInput.value = tagText;
                    this.searchArticles(tagText);
                }
            });
        });
    }
    
    filterArticles(category) {
        const articles = this.articlesGrid.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            const articleCategories = article.getAttribute('data-category').split(' ');
            
            if (category === 'all' || articleCategories.includes(category)) {
                article.style.display = 'block';
                setTimeout(() => {
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                }, 10);
            } else {
                article.style.opacity = '0';
                article.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    article.style.display = 'none';
                }, 300);
            }
        });
        
        // Обновляем счетчик
        this.updateArticlesCount();
    }
    
    searchArticles(term) {
        const articles = this.articlesGrid.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            const title = article.querySelector('.article-title').textContent.toLowerCase();
            const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
            const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(term) || 
                           excerpt.includes(term) ||
                           tags.some(tag => tag.includes(term)) ||
                           term === '';
            
            if (matches) {
                article.style.display = 'block';
                setTimeout(() => {
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                }, 10);
                
                // Подсветка совпадений
                if (term && term.length > 2) {
                    this.highlightText(article, term);
                }
            } else {
                article.style.opacity = '0';
                article.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    article.style.display = 'none';
                }, 300);
            }
        });
        
        this.updateArticlesCount();
    }
    
    highlightText(element, term) {
        const textElements = element.querySelectorAll('.article-title, .article-excerpt');
        
        textElements.forEach(textElement => {
            const originalText = textElement.textContent;
            const regex = new RegExp(`(${term})`, 'gi');
            const highlightedText = originalText.replace(regex, '<mark>$1</mark>');
            
            textElement.innerHTML = highlightedText;
        });
    }
    
    sortArticles(sortBy) {
        const articles = Array.from(this.articlesGrid.querySelectorAll('.article-card'));
        
        articles.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateB - dateA;
                    
                case 'oldest':
                    const dateA2 = new Date(a.getAttribute('data-date'));
                    const dateB2 = new Date(b.getAttribute('data-date'));
                    return dateA2 - dateB2;
                    
                case 'popular':
                    const viewsA = parseInt(a.getAttribute('data-views'));
                    const viewsB = parseInt(b.getAttribute('data-views'));
                    return viewsB - viewsA;
                    
                default:
                    return 0;
            }
        });
        
        // Переставляем статьи
        articles.forEach(article => {
            this.articlesGrid.appendChild(article);
        });
        
        // Анимация перестановки
        this.animateArticles();
    }
    
    animateArticles() {
        const articles = this.articlesGrid.querySelectorAll('.article-card');
        
        articles.forEach((article, index) => {
            article.style.opacity = '0';
            article.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                article.style.transition = 'all 0.5s ease-out';
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    updateArticlesCount() {
        const visibleCount = this.articlesGrid.querySelectorAll('.article-card[style*="display: block"]').length;
        const totalCount = this.articlesGrid.querySelectorAll('.article-card').length;
        
        const countElement = document.querySelector('.articles-count');
        if (countElement) {
            countElement.textContent = `Показано ${visibleCount} из ${totalCount} статей`;
        }
    }
    
    async loadArticles() {
        // В реальном проекте здесь был бы fetch запрос
        const loadingElement = document.createElement('div');
        loadingElement.className = 'loading';
        loadingElement.innerHTML = '<div class="loading-spinner"></div>';
        
        this.articlesGrid.appendChild(loadingElement);
        
        // Симуляция загрузки
        setTimeout(() => {
            loadingElement.remove();
            this.animateArticles();
            this.updateArticlesCount();
        }, 1000);
    }
    
    toggleBookmark(articleId, button) {
        const bookmarks = this.getBookmarks();
        const articleElement = document.querySelector(`.article-card[data-article="${articleId}"]`);
        
        if (!articleElement) return;
        
        const articleData = {
            id: articleId,
            title: articleElement.querySelector('.article-title').textContent,
            excerpt: articleElement.querySelector('.article-excerpt').textContent,
            date: articleElement.getAttribute('data-date'),
            author: articleElement.querySelector('.article-author').textContent.replace('Автор: ', ''),
            image: articleElement.querySelector('.article-image img').src
        };
        
        const index = bookmarks.findIndex(b => b.id === articleId);
        
        if (index === -1) {
            // Добавляем в закладки
            bookmarks.push(articleData);
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-bookmark"></i>';
            this.showToast('Статья добавлена в закладки');
        } else {
            // Удаляем из закладок
            bookmarks.splice(index, 1);
            button.classList.remove('active');
            button.innerHTML = '<i class="far fa-bookmark"></i>';
            this.showToast('Статья удалена из закладок');
        }
        
        // Сохраняем в localStorage
        localStorage.setItem('blog_bookmarks', JSON.stringify(bookmarks));
        
        // Обновляем иконку в заголовке
        this.updateBookmarksBadge();
    }
    
    getBookmarks() {
        const bookmarksJson = localStorage.getItem('blog_bookmarks');
        return bookmarksJson ? JSON.parse(bookmarksJson) : [];
    }
    
    loadBookmarks() {
        const bookmarks = this.getBookmarks();
        
        // Обновляем кнопки закладок
        this.bookmarkButtons.forEach(button => {
            const articleId = button.getAttribute('data-article');
            const isBookmarked = bookmarks.some(b => b.id === articleId);
            
            if (isBookmarked) {
                button.classList.add('active');
                button.innerHTML = '<i class="fas fa-bookmark"></i>';
            }
        });
        
        this.updateBookmarksBadge();
    }
    
    updateBookmarksBadge() {
        const bookmarks = this.getBookmarks();
        const bookmarksBtn = document.querySelector('.bookmarks-btn');
        
        if (bookmarksBtn) {
            const badge = bookmarksBtn.querySelector('.badge') || document.createElement('span');
            badge.className = 'badge';
            badge.textContent = bookmarks.length;
            
            if (bookmarks.length > 0) {
                if (!bookmarksBtn.contains(badge)) {
                    bookmarksBtn.appendChild(badge);
                }
            } else {
                badge.remove();
            }
        }
    }
    
    openBookmarksModal() {
        if (!this.bookmarksModal) return;
        
        this.bookmarksModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.renderBookmarksList();
        
        // Фокус внутри модального окна
        const closeBtn = this.bookmarksModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.focus();
        }
    }
    
    closeBookmarksModal() {
        if (!this.bookmarksModal) return;
        
        this.bookmarksModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    renderBookmarksList() {
        if (!this.bookmarksList || !this.emptyBookmarks) return;
        
        const bookmarks = this.getBookmarks();
        
        if (bookmarks.length === 0) {
            this.bookmarksList.innerHTML = '';
            this.emptyBookmarks.style.display = 'block';
            return;
        }
        
        this.emptyBookmarks.style.display = 'none';
        
        this.bookmarksList.innerHTML = bookmarks.map(bookmark => `
            <div class="bookmark-item" data-id="${bookmark.id}">
                <img src="${bookmark.image}" alt="${bookmark.title}">
                <div class="bookmark-info">
                    <h4 class="bookmark-title">${bookmark.title}</h4>
                    <div class="bookmark-meta">
                        <span>${bookmark.author}</span>
                        <span>${new Date(bookmark.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                </div>
                <button class="remove-bookmark" data-id="${bookmark.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        
        // Обработчики для кнопок удаления
        const removeButtons = this.bookmarksList.querySelectorAll('.remove-bookmark');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const articleId = button.getAttribute('data-id');
                this.removeBookmark(articleId);
            });
        });
    }
    
    removeBookmark(articleId) {
        let bookmarks = this.getBookmarks();
        bookmarks = bookmarks.filter(b => b.id !== articleId);
        
        localStorage.setItem('blog_bookmarks', JSON.stringify(bookmarks));
        
        // Обновляем кнопку в статье
        const articleButton = document.querySelector(`.bookmark-btn[data-article="${articleId}"]`);
        if (articleButton) {
            articleButton.classList.remove('active');
            articleButton.innerHTML = '<i class="far fa-bookmark"></i>';
        }
        
        // Обновляем список
        this.renderBookmarksList();
        this.updateBookmarksBadge();
        
        this.showToast('Статья удалена из закладок');
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    async subscribeToNewsletter(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Симуляция успешной подписки
                resolve({ success: true });
            }, 1000);
        });
    }
    
    saveSubscription(email) {
        const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
        
        if (!subscriptions.includes(email)) {
            subscriptions.push(email);
            localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
        }
    }
    
    showNewsletterSuccess(message) {
        this.showToast(message, 'success');
    }
    
    showNewsletterError(message) {
        this.showToast(message, 'error');
    }
    
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const blogManager = new BlogManager();
    window.BlogManager = blogManager;
    
    console.log('Blog module loaded successfully');
    
    // Добавляем кнопку закладок в навигацию
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const bookmarksItem = document.createElement('li');
        bookmarksItem.innerHTML = `
            <a href="#" class="bookmarks-btn">
                <i class="fas fa-bookmark"></i> Закладки
                <span class="badge" style="display: none;">0</span>
            </a>
        `;
        navMenu.appendChild(bookmarksItem);
        
        // Инициализируем закладки после добавления кнопки
        setTimeout(() => {
            blogManager.updateBookmarksBadge();
            
            const bookmarksBtn = document.querySelector('.bookmarks-btn');
            if (bookmarksBtn) {
                bookmarksBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    blogManager.openBookmarksModal();
                });
            }
        }, 100);
    }
});