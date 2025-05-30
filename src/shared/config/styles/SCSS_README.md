# SCSS Architecture and Auto-Import

## Structure

SCSS is organized according to the FSD (Feature-Sliced Design) principles. All functions, mixins, and variables are 
located in src/shared/config/helpers/:

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

## next.config.ts Setup

The project’s Webpack config is set to automatically inject global.scss:

```ts
loader.options.additionalData = `@use "@/shared/config/styles/helpers" as *;`
```

This means that all SCSS and .module.scss files automatically include:

```scss
@use '@/shared/config/styles/helpers' as *;
```

---

## How to Use

Just write SCSS functions and mixins — no imports needed:

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

## What Not to Do

🚫 Do not manually import rem.scss, fluid.scss, or media.scss
🚫 Do not write @use or @import in .module.scss files
🚫 Do not copy functions between files

---

## 🧱 How to Add a New Mixin or Function

1. Create a new *.scss file in helpers/, e.g., _grid.scss
2. Add your code inside:

```scss
@mixin grid-center {
  display: grid;
  place-items: center;
}
```

3. Import it in _index.scss:

```scss
@forward 'grid';
```

Now you can use @include grid-center; in any component.

---

## Examples

| Что                | Пример                      |
| ------------------ | --------------------------- |
| `rem()`            | `margin-top: rem(24);`      |
| `fluid()`          | `font-size: fluid(28, 16);` |
| Media mixin        | `@include tablet { ... }`   |
| Color variable	 | `color: $color-primary;`    |

---

## Global Styles (Not to Be Confused with Helpers)

The index.scss file is imported in layout.tsx:

```scss
@import './normalize.scss';
@import './variables.scss';
```

> Used only for global resets, fonts, and base variables.

---

## Important

All SCSS functions and mixins work without explicit imports — thanks to next.config.ts.
Keep _index.scss as the only place where everything is connected.
