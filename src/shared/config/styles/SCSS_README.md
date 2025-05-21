#  SCSS Архитектура и Автоимпорт

## Структура

SCSS организован по FSD-принципам. Все функции, миксины и переменные лежат в `src/shared/config/helpers/`:

```
src/shared/config/styles/
├── fonts.scss                 // Подключение шрифтов (@font-face)
├── normalize.scss             // Сброс браузерных стилей
├── variables.scss             // Цвета, размеры, z-index и др.
├── index.scss                 // Подключается в layout.tsx (глобально)
└── helpers/                   // Только функции и миксины
    ├── _rem.scss               // rem($px)
    ├── _fluid.scss             // fluid($max, $min)
    ├── _media.scss             // @include tablet { ... }
    └── _index.scss            // Объединение всех выше
```

---

## Настройка `next.config.ts`

В проекте настроен Webpack на автоматическое подключение `global.scss`:

```ts
loader.options.additionalData = `@use "@/shared/config/styles/helpers" as *;`
```

Это значит, что **во все SCSS и module.scss файлы автоматически добавляется**:

```scss
@use "@/shared/config/styles/helpers" as *;
```

---

## Как использовать

Просто пиши SCSS-функции и миксины — **никаких импортов не нужно**:

```scss
.button {
  font-size: fluid(32, 16);
  padding: rem(20);

  @include tablet {
    font-size: rem(18);
  }
}
```

---

## Что делать не нужно

- 🚫 Не импортируй вручную `rem.scss`, `fluid.scss`, `media.scss`
- 🚫 Не пиши `@use` или `@import` в `.module.scss`
- 🚫 Не копируй функции между файлами

---

## 🧱 Как добавить новый миксин или функцию

1. Создай новый файл `*.scss` в `helpers/`, например `_grid.scss`
2. Добавь туда код:

```scss
@mixin grid-center {
  display: grid;
  place-items: center;
}
```

3. Подключи в `_index.scss`:

```scss
@forward "grid";
```

Теперь `@include grid-center;` доступен в любом компоненте.

---

## Примеры

| Что                 | Пример                         |
|---------------------|--------------------------------|
| `rem()`             | `margin-top: rem(24);`         |
| `fluid()`           | `font-size: fluid(28, 16);`    |
| Media mixin         | `@include tablet { ... }`      |
| Цвет из переменной  | `color: $color-primary;`       |

---

## Глобальные стили (не путать с helpers)

Файл `index.scss` подключается в `layout.tsx`:

```scss
@import './normalize.scss';
@import './fonts.scss';
@import './variables.scss';
```

> Только для глобальных reset, шрифтов и базовых переменных.

---

## Важно

Все SCSS-функции и миксины работают без явного импорта — за счёт `next.config.ts`.  
Следи за `_index.scss`, чтобы он оставался единственным местом подключения.