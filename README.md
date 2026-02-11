# 🐟🥩 Fish & Meat Studio

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)
![Version](https://img.shields.io/badge/Version-2.1.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Team](https://img.shields.io/badge/Team-6%20members-success)

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

### Ветвление проекта:
```mermaid
gitGraph
    commit id: "Initial commit"
    branch develop
    checkout develop
    commit id: "Add base structure"
    
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
