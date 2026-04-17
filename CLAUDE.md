# Ali Murat Gültekin — Portfolio Website

## Project Overview

Building a technically impressive personal portfolio website. The goal is to wow visitors (recruiters, collaborators, other developers) with modern web technologies while showcasing my work in cybersecurity, machine learning, and software development.

## About Me (Context for Content)

- **Name**: Ali Murat Gültekin
- **Role**: Computer Science student at Sabancı University (graduating May 2026)
- **Focus Areas**: Cybersecurity, Machine Learning, Computer Vision, Full-Stack Development
- **Location**: Istanbul, Turkey
- **Notable Experience**:
  - Research Assistant at University of Michigan (ML for Android malware detection)
  - Cybersecurity & ML Intern at University of Groningen (Intrusion Detection Systems)
  - Deep Learning & Computer Vision Intern at Inovako, Spain
  - Co-author on paper under revision at Computers & Security journal
- **Technical Skills**: Python, C++, Machine Learning, Docker, Django, Socket Programming, and more
- **Languages**: English (fluent), Turkish (native), Spanish (conversational)

## Design Vision

### Aesthetic
- **Dark mode** as default (with potential light mode toggle later)
- **Cybersecurity-inspired**: sleek, technical, modern
- Clean and organized like brittanychiang.com
- Smooth transitions like tamalsen.dev
- 3D elements that impress but don't overwhelm (not as extreme as bruno-simon.com)

### Color Palette (Suggested)
- Background: Deep dark (#0a0a0f or similar)
- Primary accent: Cyan/teal (#00d4ff) or electric blue — cybersecurity feel
- Secondary: Subtle purples or greens for variety
- Text: Off-white (#e4e4e7) for readability

### Typography
- Modern sans-serif (Inter, Space Grotesk, or JetBrains Mono for code elements)
- Clear hierarchy with generous spacing

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 14 (App Router) | Use TypeScript |
| 3D Graphics | React Three Fiber + Drei | For hero section |
| Animations | Framer Motion | UI transitions, hover effects |
| Scroll Animations | GSAP + ScrollTrigger | Section reveals |
| Styling | Tailwind CSS | Dark mode config |
| Smooth Scroll | Lenis (optional) | For buttery scroll |
| Deployment | Vercel | Auto-deploy from GitHub |
| Domain | Namecheap (DNS points to Vercel) | Already owned |

## Site Structure

### 1. Hero Section (First View)
- **3D Element**: Interactive shield/lock that reacts to mouse movement
  - Should rotate/tilt based on cursor position
  - Subtle glow/emission effects
  - Cybersecurity themed
  - Can be built with Three.js primitives or a .glb model
- **Overlay Content**: 
  - My name (large, animated text reveal)
  - Tagline: "Computer Scientist | Cybersecurity Researcher | ML Engineer" (or similar)
  - Subtle CTA to scroll down
- **Simple Mode Toggle**: Small button in corner — "Enter Simple Mode" for accessibility

### 2. About Section
- Brief bio paragraph
- Professional photo (I'll provide)
- Quick stats or highlights
- Links to resume/CV download

### 3. Experience Section
- Vertical timeline layout
- Cards for each position with:
  - Company/institution name
  - Role
  - Date range
  - Brief description
  - Tech used (tags)
- Scroll-triggered reveal animations

### 4. Projects Section
- Grid or card-based layout
- Each project card shows:
  - Project name
  - Brief description
  - Tech stack tags
  - Links (GitHub, live demo if applicable)
  - Thumbnail/preview image
- Hover effects: lift, glow, or reveal more info

### 5. Skills Section
- Visual representation of tech stack
- Categorized: Languages, Frameworks, Tools, etc.
- Could be: icon grid, animated bars, tag cloud, or creative visualization

### 6. Contact Section
- Simple contact form (name, email, message)
- Social links (LinkedIn, GitHub, email)
- Optional: subtle animation or 3D element

## Special Features

### Simple Mode
- Toggle accessible from hero section
- Disables: 3D graphics, heavy animations, GSAP effects
- Enables: Clean, static, fast-loading version
- Preference saved in localStorage
- Can also be triggered via URL: `?simple=true`

### Animations Checklist
- [ ] Hero text: staggered letter/word reveal on load
- [ ] 3D shield: continuous subtle animation + mouse reactivity
- [ ] Scroll reveals: sections fade/slide in using GSAP ScrollTrigger
- [ ] Project cards: hover lift + glow effect
- [ ] Page transitions: smooth with Framer Motion
- [ ] Navigation: smooth scroll to sections

## Development Notes

### My Experience Level
- **React/Next.js**: Beginner (first time using)
- **Three.js/R3F**: Beginner (first time using)
- **General Programming**: Advanced (CS student, Python/C++ proficient)
- **Approach**: Learning as I build, using Claude Code for guidance

### Preferences
- Explain concepts when introducing new patterns
- Provide complete, working code blocks
- Use TypeScript throughout
- Follow Next.js 14 App Router conventions
- Keep components modular and organized
- Comment complex sections (especially 3D/animation code)

### File Structure (Suggested)
```
/app
  /page.tsx (main page)
  /layout.tsx
  /globals.css
/components
  /ui (buttons, cards, etc.)
  /sections (Hero, About, Experience, Projects, Skills, Contact)
  /3d (Shield, Scene, etc.)
/lib
  /utils.ts
/public
  /images
  /models (for .glb files if used)
/hooks (custom hooks if needed)
```

## Phases / Roadmap

### Phase 1: Setup
- Initialize Next.js with TypeScript + Tailwind
- Install dependencies (R3F, Framer Motion, GSAP)
- Set up folder structure
- Configure dark mode in Tailwind

### Phase 2: Hero + 3D
- Create R3F canvas component
- Build or import 3D shield model
- Add mouse tracking for rotation
- Add lighting and effects
- Overlay name/tagline with animations

### Phase 3: Core Sections
- Build each section component
- Add placeholder content
- Basic responsive layout

### Phase 4: Animations
- Implement GSAP ScrollTrigger for reveals
- Add Framer Motion hover effects
- Polish transitions

### Phase 5: Simple Mode + Polish
- Implement simple mode toggle
- Performance optimization
- SEO meta tags
- Mobile responsiveness
- Accessibility basics

### Phase 6: Deploy
- Push to GitHub
- Connect to Vercel
- Configure custom domain

## Inspiration References
- bruno-simon.com — 3D creativity (but simpler for us)
- brittanychiang.com — clean organization
- tamalsen.dev — smooth transitions
- dennissnellenberg.com — scroll animations

---

## Commands Quick Reference

```bash
# Create project
npx create-next-app@latest portfolio --typescript --tailwind --app

# Install dependencies
npm install three @react-three/fiber @react-three/drei framer-motion gsap

# Run dev server
npm run dev

# Build for production
npm run build
```

---

*This file helps Claude Code understand the full project context. Keep it updated as the project evolves.*
