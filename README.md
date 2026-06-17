# GROC Landing Page v1 — Creative + Engineering Specification

You are redesigning the entire GROC landing page.

Your goal is NOT to create another student community website.

Your goal is to create a world-class, story-driven, cinematic landing page that feels closer to Apple, Linear, Stripe Sessions, Arc Browser, Raycast and Vercel than a traditional college club website.

Before writing any code:

1. Analyze every asset inside `/public/assets`
2. Understand visual relationships between assets
3. Build a narrative around the assets
4. Create reusable components
5. Follow SOLID principles
6. Follow composition-first architecture
7. Avoid duplicate code
8. Create motion primitives that can be reused across sections
9. Prefer maintainability over hacks
10. Optimize for future additions

---

## Available Assets

### Hero Asset

Analyze:

`/public/assets/*.webp`

This contains the main GROC animated hero background.

Visual characteristics:

* Floating ecosystem
* Massive GROC typography
* Open-source aesthetics
* Builder culture
* Nature + technology fusion
* Community-driven world

This is the visual identity of the website.

Extract palette, mood, atmosphere, depth and motion cues directly from the asset.

---

### Zoom Journey Asset

Analyze folder:

`/public/assets/hero_zoom`

Contains image sequence frames.

Purpose:

The user scrolls INTO the world of GROC.

This is NOT a video.

This should become a frame-scrubbed cinematic experience.

Use scroll progress to drive frame progression.

Think Apple product storytelling.

Narrative:

Observe
→ Enter
→ Travel
→ Discover

---

### Contribution Assets

Analyze:

`github_contribution_l1`
`github_contribution_l2`

These represent growth.

L1:

Beginning stage

L2:

One year later

Do not display them as screenshots.

Treat them as symbols of consistency.

---

# Brand Interpretation

GROC is not:

* a coding club
* a Discord server
* a college community

GROC is:

A place where builders become creators through repetition and shipping.

Core themes:

* Curiosity
* Consistency
* Open Source
* Builders
* Learning in public
* Community
* Growth
* Momentum

Every visual decision must reinforce those themes.

---

# Desired User Journey

Hero
↓
Curiosity
↓
Journey
↓
Growth
↓
Community
↓
Proof
↓
Join

The entire page should feel like one continuous story.

Never feel like disconnected sections.

---

# Technical Stack

Use:

* Next.js App Router
* TypeScript
* Tailwind
* Framer Motion
* GSAP ScrollTrigger
* Lenis
* shadcn/ui where useful

Avoid:

* Heavy dependencies
* Animation libraries that duplicate capabilities
* Custom code when reusable abstractions can be created

---

# Motion Philosophy

Motion should communicate meaning.

Never animate for decoration.

Every animation must answer:

"Why is this moving?"

---

# Section 1 — Hero

Height:

100vh

Background:

Looping hero asset.

Full viewport.

No visible borders.

No boxed layouts.

No cards immediately.

Allow the artwork to breathe.

Overlay:

Large typography.

Premium spacing.

Minimal text.

The artwork should remain the hero.

Possible structure:

Headline
Subheadline
Primary CTA
Secondary CTA

Add subtle depth effects.

Parallax only if it improves immersion.

---

# Section 2 — Enter GROC

This section begins immediately after hero.

Pin the section.

Use hero_zoom frame sequence.

As user scrolls:

Camera enters the world.

Frame sequence progresses.

No autoplay.

Scroll controls progression.

Duration:

150–250vh.

Text appears during progression.

Stage 1:

Every builder starts somewhere.

Stage 2:

Ideas become experiments.

Stage 3:

Experiments become projects.

Stage 4:

Projects become proof.

Use cinematic timing.

Avoid overwhelming the user.

Text should feel discovered.

---

# Transition Section

After zoom journey.

Minimal section.

Almost empty.

Large typography.

Single message:

Building isn't talent.

It's repetition.

Allow whitespace.

Allow breathing room.

---

# Section 3 — Growth

Use github contribution assets.

Create a transformation experience.

Start:

L1 visible.

Then:

Crossfade.
Morph.
Progressively reveal L2.

Narrative:

Day 1

Curious.

↓

Day 365

Consistent.

↓

Not smarter.

Just shipped more.

Do not make this look like GitHub marketing.

Make it feel emotional.

---

# Section 4 — Why GROC

Three pillars.

Build
Learn
Ship

Use elegant cards.

No giant gradients.

No excessive glassmorphism.

Modern.

Clean.

Readable.

---

# Section 5 — Community Network

Visualize collaboration.

Floating nodes.

Connections.

Builders finding builders.

Subtle animations.

No flashy particle systems.

Message:

You're not joining another Discord.

You're joining people who actually build.

---

# Section 6 — Proof

Display:

Projects
Hackathons
Open Source
Research
Internships

Design should establish credibility.

Avoid fake metrics.

Avoid placeholder corporate language.

---

# Final Section

Return visually to the atmosphere established in Hero.

Create narrative closure.

Full-screen CTA.

Message:

A year from now,
your contribution graph will look different.

The question is—

will you?

Primary CTA:

Join GROC

---

# UX Requirements

* Perfect spacing scale
* Responsive from mobile to ultra-wide
* Accessibility considered
* Reduced motion support
* Smooth scrolling
* Lazy loading where possible
* Image optimization
* Video optimization
* Clean semantic HTML

---

# Engineering Requirements

Before implementation:

Create:

1. Component architecture
2. Folder architecture
3. Animation architecture
4. Shared motion primitives
5. Shared typography system
6. Shared spacing system

Do not jump into code immediately.

First produce:

* Information Architecture
* Component Tree
* Motion System
* Design System
* Asset Usage Plan

Then implement.

Avoid rewriting existing code unnecessarily.

Extend and compose whenever possible.

Aim for a landing page that could realistically sit beside products like Linear, Raycast, Arc or Vercel in terms of polish and intentionality.
