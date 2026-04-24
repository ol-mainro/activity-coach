---
name: Atheos High-Performance
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#564052'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#897083'
  outline-variant: '#dcbed4'
  surface-tint: '#a900a9'
  primary: '#a900a9'
  on-primary: '#ffffff'
  primary-container: '#ff00ff'
  on-primary-container: '#510051'
  inverse-primary: '#ffabf3'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#919292'
  on-tertiary-container: '#292b2c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd7f5'
  primary-fixed-dim: '#ffabf3'
  on-primary-fixed: '#380038'
  on-primary-fixed-variant: '#810081'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Lexend
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-bold:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  xxl: 96px
  gutter: 24px
  margin: 32px
---

## Brand & Style
This design system captures the essence of high-end athletic performance: precision, speed, and uncompromising clarity. The aesthetic blends **Minimalism** with **High-Contrast Boldness** to create a digital environment that feels like a premium gallery or a technical racing instrument. 

The target audience is the elite athlete and the luxury fitness enthusiast. The UI evokes a sense of "active focus"—eliminating digital noise to highlight data and action. By utilizing a stark white canvas and razor-sharp black typography, the design system ensures maximum legibility, while the fuchsia accents serve as high-energy catalysts for interaction and urgency.

## Colors
The palette is intentionally restricted to maintain a sophisticated, high-contrast signature.
- **Primary (Fuchsia):** Used sparingly for critical calls to action, active states, and performance metrics. It represents energy and movement.
- **Secondary (Pure Black):** Used for primary typography, borders, and heavy-duty structural elements.
- **Surface (White):** The foundation of the system, providing expansive whitespace to suggest a premium, breathable layout.
- **Accents (Cool Gray):** A subtle tint used for secondary backgrounds and disabled states to keep the focus on the primary fuchsia and black contrast.

## Typography
Lexend is selected for its unique origin in reading proficiency and its inherently athletic, geometric structure. 
- **Headlines:** Use heavy weights (700-800) with tight letter-spacing to create a sense of strength and impact.
- **Labels:** Small labels should use uppercase styling with increased letter spacing to emulate technical gear labeling.
- **Readability:** Maintain generous line heights for body text to contrast against the dense, powerful headlines.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop (12 columns) and a fluid model on mobile. The "Spacing Rhythm" is built on a 4px base unit, but emphasizes large, "breathable" gaps (xl and xxl) to separate content sections.

- **Margins:** Large external margins create a "letterboxed" look that feels editorial and high-end.
- **Alignment:** Strict adherence to a vertical rhythm. Data points should be aligned to the grid to feel like a high-performance dashboard.
- **Density:** High density for data-rich areas (metrics), low density for brand storytelling.

## Elevation & Depth
In this design system, depth is communicated through **Bold Borders** and **Tonal Layers** rather than soft shadows.
- **Flat Depth:** Use solid 1px or 2px black borders to define containers.
- **Layering:** Instead of shadows, use slight offsets or the #F4F4F4 gray to indicate that a component (like a modal or a card) is sitting above the primary surface.
- **Interaction:** On hover, elements do not lift; instead, they shift color (from white to fuchsia) or increase border thickness to maintain a "hard-surface" athletic feel.

## Shapes
The shape language is strictly **Sharp (0)**. 0px border radii are used across all components—buttons, cards, and input fields. This communicates precision, technical engineering, and a "no-frills" performance mindset. The only exception to the sharp rule is the use of circular "Pill" shapes for specific status indicators or badges to provide a singular point of visual contrast against the otherwise rectangular system.

## Components
- **Buttons:** Primary buttons are solid Black with White text. On hover, they flash to Fuchsia. No rounded corners. Secondary buttons use a 2px black outline.
- **Input Fields:** Bottom-border only (2px Black). Labels are positioned above in `label-bold` style. Focus state changes the bottom border to Fuchsia.
- **Cards:** Defined by a 1px Black border. No shadow. The header of the card should use a Fuchsia accent line (2px height) at the very top.
- **Chips/Badges:** Solid Black background with White `label-sm` text. Use these for category tags or equipment types.
- **Checkboxes:** Square, 2px border. When checked, the entire box fills with Fuchsia and displays a white checkmark.
- **Progress Bars:** High-contrast Fuchsia fills against a Light Gray (#F4F4F4) track. The container is sharp-edged.
- **Data Visuals:** Line charts should use a thick (3px) Fuchsia line. Grid lines should be faint Gray.