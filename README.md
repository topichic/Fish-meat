# 🐟🥩 Fish & Meat Studio

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)
![Version](https://img.shields.io/badge/Version-2.1.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Team](https://img.shields.io/badge/Team-6%20members-success)
![Version](https://img.shields.io/badge/Version-2.0.1-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

**Сайт компании по разработке Telegram-ботов** - учебный проект по командной работе в Git.

🌐 **[Посмотреть сайт на GitHub Pages](https://[username].github.io/fish-meat-studio/)**

## 👥 Команда проекта (6 человек)

| Участник | Роль | Основные задачи | Контакты (GitHub) |
|----------|------|-----------------|-------------------|
| **Артем Чудин** (Тимлид) | JavaScript разработчик | Архитектура проекта, основные скрипты, координация команды | @artemchudin |
| **Артур Любин** | Frontend разработчик | Основные стили CSS (`style.css`), дизайн компонентов | @arthurlubin |
| **Калединов Андрей** | HTML верстальщик | Главная страница (`index.html`), страница услуг (`services.html`) | @andreykaledinov |
| **Емельянов Павел** | HTML верстальщик | Портфолио (`portfolio.html`), страница команды (`team.html`) | @pavelemelyanov |
| **Лупой Алексей** | Frontend разработчик | Адаптивная верстка (`responsive.css`), утилитарные скрипты (`menu.js`, `portfolio.js`) | @alexeylupoy |
| **Абрамов Даниил** | Frontend разработчик | Страница блога (`blog.html`), дополнительные стили и скрипты для блога | @danielabramov |

## 📊 Git Workflow с 6 участниками
## 📋 О проекте

Fish & Meat Studio - это веб-сайт визитка для студии разработки Telegram-ботов. Проект реализован командой из 5 человек в рамках учебного задания по Git и совместной разработке.

### 🎯 Основные особенности:
- **Адаптивный дизайн** - работает на всех устройствах
- **Интерактивные элементы** - формы, фильтры, модальные окна
- **Анимации и эффекты** - плавные переходы и интерактив
- **Доступность (a11y)** - поддержка скринридеров и клавиатурной навигации
- **Оптимизация** - быстрая загрузка и производительность

## 👥 Команда проекта

| Участник | Роль | Основные задачи |
|----------|------|-----------------|
| **Артем Чудин** (Тимлид) | JavaScript разработчик | Архитектура проекта, основные скрипты, координация команды |
| **Артур Любин** | Frontend разработчик | Основные стили CSS, дизайн компонентов |
| **Калединов Андрей** | HTML верстальщик | Главная страница и страница услуг |
| **Емельянов Павел** | HTML верстальщик | Портфолио и страница команды |
| **Лупой Алексей** | Frontend разработчик | Адаптивная верстка, дополнительные скрипты |

## 🏗️ Структура проекта

## 🚀 Технологии

- **HTML5** - семантическая верстка
- **CSS3** - Flexbox, Grid, анимации, переменные
- **JavaScript (ES6+)** - нативный JS без фреймворков
- **Git & GitHub** - система контроля версий
- **GitHub Pages** - хостинг статического сайта
- **Font Awesome** - иконки
- **Google Fonts** - шрифты Montserrat и Russo One
- **Leaflet.js** - интерактивные карты (для контактов)

## 📊 Git Workflow

### Ветвление проекта:
```mermaid  
    branch feature/html-core
    checkout feature/html-core
    commit id: "Add index & services (Андрей)"
    checkout develop
    merge feature/html-core
    
    branch feature/html-pages
    checkout feature/html-pages
    commit id: "Add portfolio & team (Павел)"
    checkout develop
    merge feature/html-pages
    
    branch feature/css-core
    checkout feature/css-core
    commit id: "Add main styles (Артур)"
    checkout develop
    merge feature/css-core
    
    branch feature/css-responsive
    checkout feature/css-responsive
    commit id: "Add responsive styles (Алексей)"
    checkout develop
    merge feature/css-responsive
    
    branch feature/js-core
    checkout feature/js-core
    commit id: "Add main scripts (Артем)"
    checkout develop
    merge feature/js-core
    
    branch feature/blog
    checkout feature/blog
    commit id: "Add blog page (Даниил)"
    checkout develop
    merge feature/blog
    
    branch feature/optimization
    checkout feature/optimization
    commit id: "Performance optimizations"
    checkout develop
    merge feature/optimization
    
    checkout main
    merge develop id: "Release v2.1"
    tag: "v2.1.0"
    branch feature/html-pages
    checkout feature/html-pages
    commit id: "Add index & services"
    checkout develop
    merge feature/html-pages id: "Merge HTML pages"
    
    branch feature/css-styles
    checkout feature/css-styles
    commit id: "Add main styles"
    commit id: "Add responsive"
    checkout develop
    merge feature/css-styles id: "Merge CSS"
    
    branch feature/js-functionality
    checkout feature/js-functionality
    commit id: "Add menu & forms"
    commit id: "Add portfolio filters"
    checkout develop
    merge feature/js-functionality id: "Merge JS"
    
    branch feature/optimization
    checkout feature/optimization
    commit id: "Add performance optimizations"
    checkout develop
    merge feature/optimization id: "Merge optimizations"
    
    checkout main
    merge develop id: "Release v2.0"
    tag: "v2.0.0"
    
```

## **Итоговое распределение работы:**

1. **Артем Чудин (Тимлид)** - JavaScript архитектура, координация, основные скрипты (`main.js`, `form-validation.js`, `contact.js`)
2. **Артур Любин** - Основные CSS стили (`style.css`), дизайн компонентов
3. **Калединов Андрей** - HTML страницы (`index.html`, `services.html`)
4. **Емельянов Павел** - HTML страницы (`portfolio.html`, `team.html`)
5. **Лупой Алексей** - Адаптивная верстка (`responsive.css`), утилитарные скрипты (`menu.js`, `portfolio.js`)
