# Responsive Breakpoints & Visual Guide

## Tailwind Breakpoints Reference

```
┌─────────────────────────────────────────────────────────────────────┐
│                     RESPONSIVE VIEWPORT SIZES                       │
├──────────────┬──────────────┬──────────────┬──────────────────────┤
│   Mobile     │    Tablet    │   Desktop    │    Large Desktop     │
│   < 640px    │  640-1023px  │  1024-1279px │    > 1280px         │
│   (no prefix)│    sm:       │     md:      │      lg: & xl:      │
└──────────────┴──────────────┴──────────────┴──────────────────────┘
```

### Breakpoint Usage in Code

| Prefix | Min-Width | Max-Width | Use Case | Example |
|--------|-----------|-----------|----------|---------|
| (none) | 0px | 639px | Mobile | `text-lg` |
| `sm:` | 640px | 767px | Small tablet | `sm:text-xl` |
| `md:` | 768px | 1023px | Tablet | `md:text-2xl` |
| `lg:` | 1024px | 1279px | Desktop | `lg:text-3xl` |
| `xl:` | 1280px | 1535px | Large desktop | `xl:text-4xl` |
| `2xl:` | 1536px | ∞ | Ultra-wide | `2xl:text-5xl` |

---

## Responsive Scaling Examples

### Text Sizing Progression

```
Mobile   → Tablet   → Desktop  → Ultra-Wide
(640px)    (768px)    (1024px)   (1536px)

text-xs      sm:text-xs    md:text-sm    lg:text-base
12px         12px          14px          16px

text-sm      sm:text-sm    md:text-base  lg:text-lg
14px         14px          16px          18px

text-base    sm:text-lg    md:text-xl    lg:text-2xl
16px         18px          20px          24px

text-lg      sm:text-xl    md:text-2xl   lg:text-3xl
18px         20px          24px          30px

text-2xl     sm:text-3xl   md:text-4xl   lg:text-5xl
24px         30px          36px          48px

text-3xl     sm:text-4xl   md:text-5xl   lg:text-6xl
30px         36px          48px          60px

text-4xl     sm:text-5xl   md:text-6xl   lg:text-7xl
36px         48px          60px          72px

text-5xl     sm:text-6xl   md:text-7xl   lg:text-8xl
48px         60px          72px          96px

text-6xl     sm:text-7xl   md:text-8xl   lg:text-9xl
60px         72px          96px          128px
```

### Spacing Progression

```
Mobile      Tablet      Desktop     Ultra-Wide
(640px)     (768px)     (1024px)    (1536px)

p-2         sm:p-3      md:p-4      lg:p-6
8px         12px        16px        24px

p-3         sm:p-4      md:p-6      lg:p-8
12px        16px        24px        32px

gap-2       sm:gap-3    md:gap-4    lg:gap-6
8px         12px        16px        24px

gap-3       sm:gap-4    md:gap-6    lg:gap-8
12px        16px        24px        32px

mx-4        sm:mx-6     md:mx-8     lg:mx-12
16px        24px        32px        48px

mt-4        sm:mt-6     md:mt-8     lg:mt-12
16px        24px        32px        48px
```

---

## Component Breakpoint Examples

### Example 1: Button Scaling

```jsx
// Mobile:  small, easily touchable
// Tablet:  medium sized
// Desktop: full-featured with shadows

<button className="
  // Base (mobile)
  px-4 py-2 text-sm
  
  // Tablet
  sm:px-6 sm:py-3 sm:text-base
  
  // Desktop
  md:px-8 md:py-4 md:text-lg
  
  // Large Desktop
  lg:px-12 lg:py-5 lg:text-xl
  
  shadow-[2px_2px_0px]
  sm:shadow-[3px_3px_0px]
  md:shadow-[4px_4px_0px]
  lg:shadow-[6px_6px_0px]
">
  Click Me
</button>
```

**Visual Result:**
```
Mobile (320px)     Tablet (768px)      Desktop (1024px)
┌─────────┐        ┌──────────┐        ┌─────────────┐
│ Click▼ │        │ Click Me ▼│       │ Click Me! ▼ │
└─────────┘        └──────────┘        └─────────────┘
 8px padding       12px padding        16px padding
 2px shadow        3px shadow          6px shadow
```

### Example 2: Container Scaling

```jsx
<div className="
  // Mobile: full width with padding
  w-full px-3
  
  // Tablet: narrower
  sm:px-4 sm:max-w-sm
  
  // Desktop: wider
  md:px-6 md:max-w-md
  
  // Large: full width with generous margins
  lg:px-8 lg:max-w-lg
">
  Content scales with viewport
</div>
```

**Visual Result:**
```
Mobile (320px)
┌─────────────────────────────────┐
│ ┌─────────────────────────────┐ │
│ │  Content with padding       │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
  Full width with px-3 padding

Tablet (768px)
┌─────────────────────────────────────────────────────────┐
│   ┌────────────────────────────┐                        │
│   │  Content with padding      │                        │
│   └────────────────────────────┘                        │
└─────────────────────────────────────────────────────────┘
  Narrower container with sm:max-w-sm

Desktop (1024px+)
┌───────────────────────────────────────────────────────────────┐
│     ┌──────────────────────────────────┐                      │
│     │  Content with generous padding   │                      │
│     └──────────────────────────────────┘                      │
└───────────────────────────────────────────────────────────────┘
  Wider container with generous margins
```

### Example 3: Layout Direction

```jsx
<div className="
  // Mobile: vertical stack
  flex flex-col gap-4
  
  // Tablet: start to go horizontal
  sm:gap-6
  
  // Desktop: full horizontal
  md:flex-row md:gap-8
  
  // Ultra-wide: very generous spacing
  lg:gap-12
">
  <Box1 />
  <Box2 />
</div>
```

**Visual Result:**
```
Mobile (< 640px)        Tablet (640-1023px)     Desktop (> 1024px)
┌──────────┐           ┌──────────┐            ┌──────────┬──────────┐
│  Box 1   │           │  Box 1   │            │  Box 1   │  Box 2   │
├──────────┤           │          │            │          │          │
│  Box 2   │           ├──────────┤            └──────────┴──────────┘
└──────────┘           │  Box 2   │            Side-by-side layout
Stacked                │          │
                       └──────────┘
                       Still stacking
```

---

## The ShopOS App Responsive Breakdown

### EnvelopeView Scaling

```
                Mobile          Tablet          Desktop
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ENVELOPE SIZE                                         │
│  w: 280px → 340px → 500px                             │
│  h: 200px → 240px → 350px                             │
│                                                         │
│  HEADING "We need a break"                            │
│  text-3xl → text-5xl → text-6xl                       │
│                                                         │
│  BODY TEXT                                             │
│  text-base → text-lg → text-2xl                       │
│                                                         │
│  BUTTONS                                               │
│  Layout: vertical → vertical → horizontal             │
│  Size: text-2xl → text-3xl → text-4xl                │
│  Spacing: gap-4 → gap-6 → gap-16                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### ConfirmationView Celebration

```
                Mobile          Tablet          Desktop
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  HEADLINE "You're in!"                                 │
│  text-4xl → text-6xl → text-9xl                       │
│  ✨ (emoji scaling with text)                          │
│                                                         │
│  SUBHEADING                                            │
│  text-lg → text-2xl → text-3xl                        │
│                                                         │
│  DECORATIVE DOODLES                                    │
│  w-12 h-12 → w-16 h-16 → w-20 h-20                  │
│                                                         │
│  BUTTONS                                               │
│  Layout: vertical → vertical → horizontal             │
│  Button 1 (Calendar): full width → auto width        │
│  Button 2 (Badge): full width → auto width           │
│                                                         │
│  SPACING                                               │
│  gap: 3 → 4 → 6 units                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### TicketView Form

```
                Mobile          Tablet          Desktop
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  FORM CONTAINER                                        │
│  max-w: full → sm → lg                                │
│  padding: p-4 → p-6 → p-8                            │
│                                                         │
│  HEADING "Make it yours"                              │
│  text-3xl → text-4xl → text-5xl                       │
│                                                         │
│  INPUT FIELD                                           │
│  text: text-2xl → text-3xl → text-4xl                │
│  placeholder: smaller → medium → larger               │
│                                                         │
│  CAMERA CAPTURE AREA                                   │
│  Responsive with adaptive button sizing               │
│                                                         │
│  ACTION BUTTONS                                        │
│  Size: text-sm → text-base → text-lg                 │
│  Layout: full-width → full-width → auto-width        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Polaroid Ticket

```
                Mobile          Tablet          Desktop
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  CARD SIZE                                             │
│  w-64 → w-80 → w-96                                   │
│  Padding: p-3 → p-4 → p-6                            │
│                                                         │
│  PHOTO AREA                                            │
│  Responsive aspect ratio 1:1                          │
│                                                         │
│  GUEST NAME                                            │
│  text-4xl → text-5xl → text-7xl                       │
│                                                         │
│  SUBTEXT                                               │
│  text-[9px] → text-[11px] → text-sm                  │
│                                                         │
│  DETAILS SECTION                                       │
│  Date/Time: text-xs → text-sm → text-base            │
│  Location: text-xs → text-sm → text-base             │
│                                                         │
│  OBSESSION TEXT                                        │
│  text-3xl → text-4xl → text-5xl                       │
│                                                         │
│  DECORATIVE TAPE                                       │
│  w-24 → w-28 → w-32                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Responsive Image Sizing

### Image Scaling Pattern

```jsx
<img 
  src="image.jpg"
  className="
    // Mobile: narrow
    w-full max-w-xs
    
    // Tablet: medium
    sm:max-w-sm
    
    // Desktop: larger
    md:max-w-md
    
    // Large Desktop: full potential
    lg:max-w-lg
    
    // Always maintain aspect ratio
    h-auto
  "
/>
```

**Responsive Image Widths:**
- Mobile: 320px (max-w-xs)
- Tablet: 384px (max-w-sm)
- Desktop: 448px (max-w-md)
- Large: 512px (max-w-lg)

---

## Touch Target Sizing

### Minimum Touch Target Guidelines

```
IDEAL SIZES (all in pixels)

┌─────────────────────────┐
│ 44px × 44px (Apple iOS)  │  ← Recommended minimum
│                          │
│ 48px × 48px (Android)    │  ← Also acceptable
│                          │
│ 40px × 40px (Minimum)    │  ← Bare minimum
└─────────────────────────┘

SPACING BETWEEN TARGETS

┌─────────────────────────┐
│ 8px minimum gap         │  ← Prevents accidental taps
│ 12px+ recommended       │  ← Comfortable spacing
│ 16px+ generous          │  ← Premium feel
└─────────────────────────┘
```

### Touch Target Examples

```
TOO SMALL (20px × 20px)     GOOD (44px × 44px)      PREMIUM (56px × 56px)
┌──────────────┐            ┌──────────────────┐    ┌──────────────────────┐
│ Hard to tap  │            │  Easy to tap     │    │ Very comfortable     │
│   ❌ ❌      │            │     ✓ ✓          │    │     ✓✓✓              │
│              │            │                  │    │                      │
└──────────────┘            └──────────────────┘    └──────────────────────┘
```

---

## Print Responsive Sizing

### Ticket Printing Layout

```
                Mobile View         Print Preview
┌─────────────────────────┐    ┌──────────────────┐
│ PHONE (375px)           │    │ PRINT (8.5" page)│
│                         │    │                  │
│ ┌─────────────────┐     │    │ ┌──────────────┐ │
│ │ Ticket (320px)  │     │    │ │  Ticket      │ │
│ │ fits on screen  │     │    │ │  centered    │ │
│ │ with scroll     │     │    │ │  w/ margins  │ │
│ │                 │     │    │ │              │ │
│ └─────────────────┘     │    │ └──────────────┘ │
│ [Print Button]          │    │                  │
└─────────────────────────┘    └──────────────────┘
```

---

## Performance at Different Breakpoints

### Rendering Performance

```
Mobile (640px)              Desktop (1024px+)
┌──────────────────┐       ┌───────────────────┐
│ Light animations │       │ Full animations   │
│ Fewer particles  │       │ More particles    │
│ Less blur        │       │ More blur         │
│ Optimized fonts  │       │ Premium fonts     │
│ Fast rendering   │       │ Smooth 60fps      │
└──────────────────┘       └───────────────────┘
```

---

## Device Examples (Real Dimensions)

### Common Device Sizes

```
PHONES                          TABLETS                 DESKTOP
iPhone SE: 375px               iPad Mini: 768px        Laptop: 1280px
iPhone 12: 390px               iPad: 810px             Desktop: 1920px
iPhone 14: 430px               iPad Pro: 1024px        Ultra-wide: 2560px
Samsung: 412px                 Galaxy Tab: 600px       4K Monitor: 3840px
Pixel 5: 393px                 Surface: 912px          TV: 1080px
```

### Testing Viewport Widths

```
TEST THESE WIDTHS:
- 320px  (small phone - minimum)
- 375px  (iPhone SE/8)
- 390px  (iPhone 12/13)
- 430px  (iPhone 14+)
- 480px  (large phone)
- 640px  (tablet break point)
- 768px  (iPad portrait)
- 1024px (iPad landscape / desktop breakpoint)
- 1280px (desktop standard)
- 1920px (full HD)
- 2560px (ultra-wide)
```

---

## Quick Copy-Paste Patterns

### Pattern: Responsive Text
```jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Title
</h1>
```

### Pattern: Responsive Container
```jsx
<div className="max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 sm:p-6 md:p-8">
  Content
</div>
```

### Pattern: Responsive Flex
```jsx
<div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
  <Item />
  <Item />
</div>
```

### Pattern: Responsive Grid
```jsx
<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
  <Item />
  <Item />
</div>
```

### Pattern: Responsive Button
```jsx
<button className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg lg:text-xl">
  Action
</button>
```

---

## Browser DevTools Testing

### Chrome DevTools
1. Press `F12` or `Ctrl+Shift+I`
2. Click device icon (top-left) or `Ctrl+Shift+M`
3. Select device from dropdown
4. Resize viewport freely

### Firefox DevTools
1. Press `Shift+Ctrl+M` or `Shift+Cmd+M` (Mac)
2. Select from device presets
3. Responsive design mode active

### Safari DevTools
1. Enable Developer Menu: Preferences → Advanced → Show Develop menu
2. Develop → Enter Responsive Design Mode
3. Select from presets or custom size

---

**Last Updated**: February 2026
**Responsive Status**: ✅ Production Ready
**Coverage**: All devices 320px - 2560px+
