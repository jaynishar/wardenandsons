---
name: Framer Motion Luxury Animations & Micro-Interactions
description: High-performance 60fps editorial animations, spring physics, layout transitions, drawer slide-overs, and reduced-motion compliance using Framer Motion and Motion v12.
---

# Framer Motion Luxury Animations & Micro-Interactions

Design patterns for silky, editorial micro-interactions and transitions tailored for luxury fashion storefronts.

## 1. Editorial Motion Philosophy
- **Restraint Over Flashiness:** Animations must feel expensive, quiet, and fluid. Never bounce violently or cause cognitive fatigue.
- **Natural Spring Physics:** Favor subtle spring dampening (`damping: 25, stiffness: 200, mass: 0.8`) over linear easing.
- **Performance First:** Animate only GPU-accelerated properties: `transform` (`x`, `y`, `scale`) and `opacity`. Avoid animating `width`, `height`, `margin`, or `top`.

---

## 2. Key Animation Patterns

### A. Editorial Staggered Lookbook Reveal
Reveal product cards or collection highlights with sequential elegance:
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1], // cubic-bezier smooth ease-out
    },
  },
};
```

### B. Slide-Out Drawer & Modal Transitions
```tsx
const drawerVariants = {
  closed: { x: '100%', opacity: 0.8 },
  open: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 30, stiffness: 300 },
  },
  exit: {
    x: '100%',
    opacity: 0.8,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};
```

### C. Luxury Image Hover Zoom
Combine CSS transform with Framer Motion layout animations:
```tsx
<div className="overflow-hidden aspect-[3/4]">
  <motion.img
    whileHover={{ scale: 1.04 }}
    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    className="w-full h-full object-cover"
    src={product.image}
    alt={product.name}
  />
</div>
```

### D. Accordion Expand/Collapse (Size Chart, Fabric Details)
```tsx
<AnimatePresence initial={false}>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      {content}
    </motion.div>
  )}
</AnimatePresence>
```

---

## 3. Accessibility & `prefers-reduced-motion`
Always respect user motion preferences:
```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();
const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.5 };
```
