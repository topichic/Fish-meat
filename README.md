# 🐟🥩 Fish & Meat Studio

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)
![Version](https://img.shields.io/badge/Version-2.0.1-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

**Сайт компании по разработке Telegram-ботов** - учебный проект по командной работе в Git.

🌐 **[Посмотреть сайт на GitHub Pages](https://[username].github.io/fish-meat-studio/)**

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

## 📊 Git Workflow с 6 участниками

### Ветвление проекта:

```mermaid
gitGraph
    commit id: "Initial commit"
    branch develop
    checkout develop
    commit id: "Add base structure"
    
    branch feature/html-core
    checkout feature/html-core
    commit id: "Add index & services by Andrey"
    checkout develop
    merge feature/html-core
    
    branch feature/html-pages
    checkout feature/html-pages
    commit id: "Add portfolio & team by Pavel"
    checkout develop
    merge feature/html-pages
    
    branch feature/css-core
    checkout feature/css-core
    commit id: "Add main styles by Arthur"
    checkout develop
    merge feature/css-core
    
    branch feature/css-responsive
    checkout feature/css-responsive
    commit id: "Add responsive styles by Alexey"
    checkout develop
    merge feature/css-responsive
    
    branch feature/js-core
    checkout feature/js-core
    commit id: "Add main scripts by Artem"
    checkout develop
    merge feature/js-core
    
    branch feature/blog
    checkout feature/blog
    commit id: "Add blog page by Daniel"
    checkout develop
    merge feature/blog
    
    branch feature/optimization
    checkout feature/optimization
    commit id: "Performance optimizations"
    checkout develop
    merge feature/optimization
    
    checkout main
    merge develop id: "Release v2.1"
    tag id: "v2.1.0"
```
---
## **Итоговое распределение работы:**

1. **Артем Чудин (Тимлид)** - JavaScript архитектура, координация, основные скрипты (`main.js`, `form-validation.js`, `contact.js`)
2. **Артур Любин** - Основные CSS стили (`style.css`), дизайн компонентов
3. **Калединов Андрей** - HTML страницы (`index.html`, `services.html`)
4. **Емельянов Павел** - HTML страницы (`portfolio.html`, `team.html`)
5. **Лупой Алексей** - Адаптивная верстка (`responsive.css`), утилитарные скрипты (`menu.js`, `portfolio.js`)
