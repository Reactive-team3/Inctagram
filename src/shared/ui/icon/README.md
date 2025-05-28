# Icon Component

# Basic Usage

`‼️️ 
name 'string'-Required. (The name of the icon from the sprite)`

## 🔍 How to Find the Correct SVG Icon ID

✅ Option

1: Using Figma

Open Figma and find the icon you want to use.
Copy the icon name (for example: checkmark-outline).
Use it like this in your code:

```tsx
<Icon name="checkmark-outline" />
```

🔎 Option 2:

-Search in icons-sprite.svg
Open Figma and find the icon you want to use.
Find the icon name
Open this file: public/icons/sprite/icons-sprite.svg

`Press Cmd + F (Mac) or Ctrl + F (Windows) and type part of the icon name`
(example: home, bell, done-all).

Find the matching <symbol> block. Example:

```tsx
<symbol id="fill-bell" viewBox="0 0 24 24">
```

Copy the id value (in this case: `fill-bell`).
Use it like this in your code:

```tsx
<Icon name="fill-bell" />
```

## 📦 Usage

```tsx
<Icon name="checkmark-outline" />
<Icon name="done-all-outline" />
<Icon name="fill-bell" />

```

Custom Size

```tsx
<Icon name="checkmark-outline" width={32} height={32} />
```

Custom Color

```tsx
<Icon name="fill-bell" color="#ff6b6b" />
<Icon name="checkmark-outline" color="var(--primary-color)" />
```

Complete Example

```tsx
<Icon name="fill-bell" width={48} height={48} color="#4a90e2" className="notification-icon" />
```
