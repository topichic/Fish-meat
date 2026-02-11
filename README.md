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

## 👥 Команда проекта (6 человек)

| Участник | Роль | Основные задачи | Ветка Git |
|----------|------|-----------------|-----------|
| **Артем Чудин** (Тимлид) | JavaScript разработчик | Архитектура проекта, основные скрипты, координация команды | `feature/artem` |
| **Артур Любин** | Frontend разработчик | Основные стили CSS (`style.css`), дизайн компонентов | `feature/arthurliubin` |
| **Калединов Андрей** | HTML верстальщик | Главная страница (`index.html`), страница услуг (`services.html`) | `feature/MisakiAori` |
| **Емельянов Павел** | HTML верстальщик | Портфолио (`portfolio.html`), страница команды (`team.html`) | `feature/Pasha` |
| **Лупой Алексей** | Frontend разработчик | Адаптивная верстка (`responsive.css`), утилитарные скрипты (`menu.js`, `portfolio.js`) | `feature/Aleksey` |
| **Абрамов Даниил** | Frontend разработчик | Страница блога (`blog.html`), дополнительные стили и скрипты для блога | `feature/daniil` |

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
    commit
    branch develop
    checkout develop
    commit
    
    branch feature/MisakiAori
    checkout feature/MisakiAori
    commit
    checkout develop
    merge feature/MisakiAori
    
    branch feature/Pasha
    checkout feature/Pasha
    commit
    checkout develop
    merge feature/Pasha
    
    branch feature/arthurliubin
    checkout feature/arthurliubin
    commit
    checkout develop
    merge feature/arthurliubin
    
    branch feature/Aleksey
    checkout feature/Aleksey
    commit
    checkout develop
    merge feature/Aleksey
    
    branch feature/artem
    checkout feature/artem
    commit
    checkout develop
    merge feature/artem
    
    branch feature/daniil
    checkout feature/daniil
    commit
    checkout develop
    merge feature/daniil
    
    branch feature/optimization
    checkout feature/optimization
    commit
    checkout develop
    merge feature/optimization
    
    checkout main
    merge develop
```
---
## **Итоговое распределение работы:**

1. **Артем Чудин (Тимлид)** - JavaScript архитектура, координация, основные скрипты (`main.js`, `form-validation.js`, `contact.js`)
2. **Артур Любин** - Основные CSS стили (`style.css`), дизайн компонентов
3. **Калединов Андрей** - HTML страницы (`index.html`, `services.html`)
4. **Емельянов Павел** - HTML страницы (`portfolio.html`, `team.html`)
5. **Лупой Алексей** - Адаптивная верстка (`responsive.css`), утилитарные скрипты (`menu.js`, `portfolio.js`)
