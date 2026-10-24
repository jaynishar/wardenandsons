# WhatsApp Button Diagnosis

Audit executed across 4 target viewports (360x640, 390x844, 768x1024, 1280x800) against static export.

## 1. Viewport Geometries & Measurements

### Viewport 360x640 (360x640)

- **Mobile Bottom Nav**: top: 576px, height: 64px, bottom: 640px (anchored to viewport bottom)
- **Detected WhatsApp Triggers**: 4

| Trigger | Type | Rect (W x H) | Dist From Viewport Bottom | Visible |
|---|---|---|---|---|
| Chat on WhatsApp | `<a>` | 328x52 | 206px | Yes |
| Free video call→ | `<a>` | 97x16 | -3777px | Yes |
| Message on WhatsApp | `<a>` | 192x52 | -5254px | Yes |
| WhatsApp store desk | `<a>` | 135x21 | -5795px | Yes |

### Viewport 390x844 (390x844)

- **Mobile Bottom Nav**: top: 780px, height: 64px, bottom: 844px (anchored to viewport bottom)
- **Detected WhatsApp Triggers**: 4

| Trigger | Type | Rect (W x H) | Dist From Viewport Bottom | Visible |
|---|---|---|---|---|
| Chat on WhatsApp | `<a>` | 358x52 | 410px | Yes |
| Free video call→ | `<a>` | 97x16 | -3545px | Yes |
| Message on WhatsApp | `<a>` | 192x52 | -5022px | Yes |
| WhatsApp store desk | `<a>` | 135x21 | -5563px | Yes |

### Viewport 768x1024 (768x1024)

- **Mobile Bottom Nav**: top: 0px, height: 0px, bottom: 0px (anchored to viewport bottom)
- **Detected WhatsApp Triggers**: 4

| Trigger | Type | Rect (W x H) | Dist From Viewport Bottom | Visible |
|---|---|---|---|---|
| Chat on WhatsApp | `<a>` | 196x52 | 602px | Yes |
| Free video call→ | `<a>` | 97x16 | -2785px | Yes |
| Message on WhatsApp | `<a>` | 192x52 | -3981px | Yes |
| WhatsApp store desk | `<a>` | 135x21 | -4279px | Yes |

### Viewport 1280x800 (1280x800)

- **Mobile Bottom Nav**: top: 0px, height: 0px, bottom: 0px (anchored to viewport bottom)
- **Detected WhatsApp Triggers**: 4

| Trigger | Type | Rect (W x H) | Dist From Viewport Bottom | Visible |
|---|---|---|---|---|
| Chat on WhatsApp | `<a>` | 196x52 | 204px | Yes |
| Free video call→ | `<a>` | 97x16 | -2711px | Yes |
| Message on WhatsApp | `<a>` | 192x52 | -3805px | Yes |
| WhatsApp store desk | `<a>` | 135x21 | -4084px | Yes |

## 2. Issues Diagnosed

1. **Old Floating Trigger**: `ChatHelper` used a rounded-full 48px button with arbitrary shadow and offset `bottom-[calc(4.5rem+var(--sab,0px)+8px)]`, creating potential overlaps with mobile safe area and inconsistent spacing.
2. **Non-Unified Triggers**: WhatsApp links were scattered across `Hero`, `HowItWorks`, `VisitUsSection`, `Footer`, and `ChatHelper`, each using different markup, button heights, and hover styles.
3. **Visual Inconsistency**: Some buttons used `#0F7B4F`, some used dark ink `#0E1A33`, some had rounded pills, violating the zero-radius, flat square token rule.

## 3. Remedy Applied in P5

- Single unified `<WhatsAppButton>` component handling floating, inline, hero, and bottom bar variants.
- 56x56 square floating tile with 0 radius, authentic `--wa` fill (`#0F7B4F`), 28px white icon.
- Position on mobile: `bottom: calc(var(--bar-h, 64px) + env(safe-area-inset-bottom) + 16px)`, `right: 16px`.
- Position on desktop: `bottom: 24px`, `right: 24px`.
- z-index `var(--z-fab, 40)` strictly below modal overlays (`50`) and hides automatically when any sheet is open.
