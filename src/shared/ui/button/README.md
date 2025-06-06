# Button Component

Reusable UI button polymorphic component

---

## ✅ Features

- Variants: `primary`, `secondary`, `outline`, `text`
- Disabled state
- Supports custom className
- Full width
- As regular button or Link

---

## 📦 Usage

```tsx
// Button variants
<Button>Primary Button</Button>
<Button disabled >Primary Button disabled</Button>
<Button variant="outlined">Outlined Button</Button>

// As different elements
<Button as="a" href="/page">Navigation Link</Button>

// import Link from 'next/link
<Button as={Link} href="/route">React Router Link</Button>

// Full width responsive
<Button fullWidth>Full Width Button</Button>

// Pixel values
<Button width="200px">200px width</Button>

// Percentage
<Button width="50%">50% width</Button>

// CSS units
<Button width="20rem">20rem width</Button>
<Button width="fit-content">Fit content</Button>

// Custom styling
<Button className="my-custom-class">Styled Button</Button>
```
