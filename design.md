---
version: alpha
name: Monimonet
description: An editorial fan-site design system pairing warm ivory surfaces, deep blue accents, expressive photography, and Thai-friendly typography.
colors:
  primary: "#1E3A8A"
  primary-hover: "#14235A"
  primary-active: "#0C1736"
  secondary: "#4F6070"
  tertiary: "#FFFFFF"
  neutral: "#FAF6EC"
  surface: "#FAFBF6"
  surface-alt: "#E3E9F0"
  on-surface: "#1F2A37"
  text-muted: "#8A97A3"
  border: "#D6DEE8"
  error: "#E23B3B"
  accent-bnk: "#CB96C2"
  accent-cgm: "#3CC2B1"
  accent-biii: "#97886B"
  accent-nv: "#EC248E"
  accent-c: "#44BFAD"
  accent-trainee: "#93001D"
typography:
  headline-display:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: "clamp(4rem, 11vw + 1rem, 9rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: "clamp(40px, 7vw, 80px)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: -0.03em
  headline-md:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.25rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: -0.025em
  headline-sm:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: 0px
  body-lg:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: 0px
  body-md:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0px
  body-sm:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  label-lg:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0.18em
  label-md:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0.14em
  label-sm:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: 10px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0.1em
  nav-md:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0.12em
  button-md:
    fontFamily: "Outfit, Noto Sans Thai, sans-serif"
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: 0.18em
rounded:
  none: 0px
  sm: 5px
  md: 6px
  lg: 12px
  xl: 24px
  full: 1000px
spacing:
  xs: 4px
  sm: 12px
  md: 20px
  lg: 32px
  xl: 80px
  gutter: "clamp(24px, 3vw, 64px)"
  section: "clamp(72px, 9vw, 112px)"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.none}"
    padding: "0px 0px 2px"
    borderBottom: "1.5px solid currentColor"
  button-secondary:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "15px 20px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.nav-md}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "16px"
    border: "1px solid {colors.border}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
    height: "40px"
    border: "1px solid {colors.border}"
---

# Monimonet

## Overview
Monimonet is a fan site for Monet BNK48, with an editorial visual direction built around portraits, event imagery, milestones, and schedules. The visual character is warm and personal rather than stark: a soft ivory canvas and deep blue identity color support large, confident headlines, while photography and small group-specific accents bring energy to the page. The interface is responsive, content-led, and designed to work in both Thai and English.

## Colors
- **Primary (#1E3A8A):** Deep blue is the main identity color. It anchors section labels, editorial links, focus indicators, and interactive highlights. In light mode it is the core accent rather than a large-area background.
- **Primary hover (#14235A) and active (#0C1736):** Darker blue states for interactive feedback.
- **Neutral (#FAF6EC):** Warm ivory page background. It softens large open areas and gives the site a personal, welcoming tone.
- **Surface (#FAFBF6):** Near-white content surface for profile and information areas.
- **Surface-alt (#E3E9F0):** Cool pale blue-gray for secondary grouping and restrained filled controls.
- **On-surface (#1F2A37):** Deep slate for main text and headings; use secondary slate (#4F6070) and muted gray-blue (#8A97A3) for less prominent copy and metadata.
- **Border (#D6DEE8):** Soft blue-gray separators and outlines for image frames, counts, and navigation details.
- **Error (#E23B3B):** Red is reserved for errors and destructive feedback. It also appears as the dark-theme primary accent.
- **Group accents:** BNK48 pink (#CB96C2), CGM48 teal (#3CC2B1), and additional group colors are reserved for identifying related groups or specific content. Use them selectively rather than as general UI accents.

The site also uses distinct colors for weekday schedule markers. Keep those colors local to schedule data and do not let them compete with the core blue-and-ivory palette.

## Typography
Outfit is the primary typeface, with Noto Sans Thai as the Thai-script companion and sans-serif fallback. The type system contrasts oversized, heavy display headings with restrained body copy. Hero names use a responsive editorial scale, very tight line-height, and slight negative tracking; page titles are bold, while supporting title lines may be lighter and more widely tracked.

Body copy is typically 16px with comfortable line-height; Thai introductions use larger text and generous leading for readability. Labels and navigation are compact, bold, uppercase, and letter-spaced in English UI areas. Keep Thai text naturally shaped and avoid forcing uppercase or excessive tracking onto Thai-script content.

## Layout
The site uses a centered content frame up to approximately 1200px, with responsive horizontal gutters and generous vertical section padding. The home hero fills the viewport and places its large title at the bottom-left over photography. Subsequent sections use editorial labels, strong left-aligned headings, and content-specific layouts such as a two-column profile area and horizontally browsable event cards.

Use the spacing scale for broad separation between page sections and tighter spacing within information groups. Let photography and content establish hierarchy; avoid adding decorative grids or unnecessary containers. On smaller screens, collapse multi-column content into a single column and preserve comfortable side padding.

## Elevation & Depth
Depth comes primarily from full-bleed photography, dark image overlays, restrained glass effects in the fixed header, and soft shadows. Avoid a stack of floating cards. Use subtle borders to frame portrait imagery and schedule details; event and gallery images should remain the visual focus.

The hero uses dark gradients over its image to keep white text readable. The scrolled header uses a translucent, blurred surface. Shadows should remain soft and broad, especially on cards, and should not replace clear contrast or spacing.

## Shapes
The core shape language is rounded but not uniformly pill-shaped. Profile and event imagery use approximately 12px corners, popups and larger panels share that base radius, and large feature panels may use 24px rounding. Small badges and social links can use full pill or circular shapes. Use square edges selectively for editorial dividers and image-led gallery layouts.

## Components
### Buttons and links
The primary call to action is generally an editorial text link: small uppercase blue text with bold weight, generous letter spacing, a fine underline, and an arrow that moves on hover. Keep this lightweight instead of introducing a large filled black button. Navigation links are compact uppercase labels with rounded hover backgrounds and a short underline for the active destination. Secondary social links may use soft tinted pill surfaces and platform colors.

### Cards
Event cards lead with square cover imagery and keep the information panel visually light, using bold titles and compact location/date metadata. Portrait and media frames use a subtle border and 12px rounding. Gallery cards are deliberately image-led and mostly avoid visible card chrome.

### Inputs and controls
Use white or near-white surfaces, soft blue-gray borders, and the shared rounded geometry for controls. Focus states use a visible ring derived from the primary blue. Keep controls visually quieter than the featured content.

### Navigation
The header is fixed and initially transparent over the hero, with light text and logos. After scrolling it transitions to a translucent, blurred background and switches to dark text in light mode. On dark backgrounds, maintain readable contrast and use the corresponding theme assets and tokens.

### Photography and overlays
Photography is a defining part of the identity. Prefer large portrait and event images with natural cropping. Place dark gradients behind text when needed, and reserve strong color treatments for social platforms, group identity, or schedule markers.

## Do's and Don'ts
- Do use Outfit with Noto Sans Thai for consistent Latin and Thai typography.
- Do pair the warm ivory background with the deep blue primary accent in light mode.
- Do let portrait and event photography carry much of the visual impact.
- Do use large, bold editorial headings and compact, letter-spaced English labels.
- Do retain generous responsive section spacing and adapt grids for mobile.
- Do keep group and weekday colors tied to their specific content roles.
- Don't replace the site's palette with monochrome black and white.
- Don't apply pill rounding to every card or image; use the site's 12px base radius.
- Don't add heavy borders, dramatic stacked shadows, or decorative gradients unrelated to photography or established accents.
- Don't apply uppercase styling or wide letter spacing to Thai-script text.
