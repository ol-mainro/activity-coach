---
name: Botanical High-Contrast
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#424842'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#737971'
  outline-variant: '#c2c8bf'
  surface-tint: '#48654c'
  primary: '#000d03'
  on-primary: '#ffffff'
  primary-container: '#0a2612'
  on-primary-container: '#719074'
  inverse-primary: '#aecfb0'
  secondary: '#43664d'
  on-secondary: '#ffffff'
  secondary-container: '#c2e9c9'
  on-secondary-container: '#486a51'
  tertiary: '#1b0200'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c1409'
  on-tertiary-container: '#b77967'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#caebcb'
  primary-fixed-dim: '#aecfb0'
  on-primary-fixed: '#05210d'
  on-primary-fixed-variant: '#314d36'
  secondary-fixed: '#c5eccc'
  secondary-fixed-dim: '#aad0b1'
  on-secondary-fixed: '#00210e'
  on-secondary-fixed-variant: '#2c4e36'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#fdb5a2'
  on-tertiary-fixed: '#350f05'
  on-tertiary-fixed-variant: '#6b392b'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-xl:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Noto Serif
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
This design system centers on a "Modern Botanical" aesthetic, merging the organic elegance of nature with the precision of high-end editorial design. It targets a sophisticated audience that values sustainability, premium craftsmanship, and clarity. 

The style is **High-Contrast Minimalism**. It leverages expansive whitespace and a dramatic "Deep Forest" primary tone to create a sense of grounded authority. By combining the classic, literary feel of serif headlines with the utilitarian efficiency of modern sans-serif UI, the system evokes a feeling of being both established and cutting-edge. The visual language is crisp, avoiding unnecessary ornamentation in favor of structural integrity and purposeful color accents.

## Colors
The palette is built on extreme tonal ranges to ensure accessibility and visual impact. 
- **Primary (#0A2612):** A dense, near-black forest green used for key brand moments, primary buttons, and heavy navigational headers.
- **Surface (#FCFCFA):** A clinical yet warm parchment white that provides a high-clarity canvas for all content.
- **Accents:** Vibrant Sage (#84A98C) is used for success states and organic highlights, while Soft Terracotta (#CC8B79) provides a warm contrast for secondary actions or notifications.
- **Text (#2F2F2F):** Deep charcoal ensures maximum readability without the harshness of pure black.

## Typography
The typographic hierarchy relies on the tension between **Noto Serif** and **Inter**. 
- **Headlines:** Use Noto Serif for all display and heading levels. Keep tracking tight on larger sizes to maintain a premium, editorial feel.
- **UI & Body:** Use Inter for all functional elements. This ensures that even at small sizes, data and labels remain legible and professional.
- **Labels:** Utilize Inter in semi-bold with slight letter spacing and uppercase styling for small metadata or section headers to create a distinct visual "stamp."

## Layout & Spacing
The design system utilizes a **Fixed Grid** approach for desktop views to maintain the "framed" feel of a high-end publication, transitioning to a fluid model for mobile devices. 

- **The 8px Rhythm:** All padding and margins must be multiples of 8px. 
- **Whitespace:** Emphasize large vertical margins between sections (80px+) to allow the botanical color palette to breathe.
- **Grid:** A 12-column grid with generous 24px gutters is standard. Content should often be centered with wide "parchment" margins on either side to focus the eye.

## Elevation & Depth
In keeping with the high-contrast botanical theme, elevation is achieved through **Tonal Layering** and **Subtle Ambient Shadows** rather than heavy gradients.

- **Layers:** Use subtle shifts in surface color (e.g., a slightly darker parchment or a very pale sage) to define card areas.
- **Shadows:** When depth is required (such as on floating action buttons or menus), use a "Forest Glow"—a very soft, diffused shadow with a hint of #0A2612 (10% opacity) rather than pure grey.
- **Borders:** Use thin, 1px solid borders in the primary forest green for input fields and containers to reinforce the high-contrast, crisp architectural feel.

## Shapes
The shape language is defined by a **Modern Slight Rounding**. A base radius of 8px (Level 2) is applied to all standard UI components like buttons, cards, and input fields.

- **Standard (8px):** Primary buttons, cards, and text fields.
- **Large (16px):** Featured containers or hero image masks.
- **Full (Pill):** Used exclusively for status chips or tags to differentiate them from actionable buttons.
This subtle rounding softens the high-contrast edges, making the interface feel organic and "botanical" without losing its professional structure.

## Components
- **Buttons:** Primary buttons use the #0A2612 background with parchment text. Secondary buttons use a 1px border of the primary color. The hover state should introduce the Sage accent.
- **Input Fields:** Use a 1px border of #0A2612 against the parchment surface. Floating labels use the "label-sm" typography style.
- **Chips/Tags:** Pill-shaped with a soft Sage (#84A98C) background and primary green text for a "leaf-like" appearance.
- **Cards:** Clean white surfaces with 1px borders or very soft ambient shadows. Use Noto Serif for card titles to maintain the editorial vibe.
- **Selection Controls:** Checkboxes and radios use the primary forest green for the active state, providing a sharp, high-contrast checkmark against the parchment background.
- **Progress Indicators:** Use a thin, elegant line with the Sage accent color for the progress fill and the Primary green for the track.