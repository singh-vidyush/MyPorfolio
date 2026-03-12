# Development Guidelines

## Tech Stack

Frontend Framework:
React.js

Styling:
Tailwind CSS

Animations:
Framer Motion or GSAP

Scroll-based animations:
GSAP ScrollTrigger or Framer Motion Scroll

Icons:
React Icons

---

# Project Structure

src/

components/
Navbar.jsx
HeroAnimation.jsx
SkillsScroller.jsx
ProjectsSection.jsx
ContactForm.jsx
Footer.jsx

sections/
Hero.jsx
Skills.jsx
Projects.jsx
Contact.jsx

assets/
scroll_animation/
projects/
resume.pdf

App.jsx
main.jsx

---

# Styling Rules

Theme: Dark

Background:
rgb(19, 38, 59)

Text Color:
white

Primary Button:
rgb(77, 144, 219)

Button Hover:
rgb(101, 170, 247)

Navbar should include:

- translucent background
- blur effect
- rounded edges

---

# Animation Guidelines

Animations must be smooth.

Hero animation must be scroll driven.

Frame animation behaviour:

scroll progress → determines image frame.

Example logic:

totalFrames = number of images

currentFrame = scrollProgress * totalFrames

---

# Skills Scroller

Technologies should move from right to left continuously.

Implementation suggestions:

CSS keyframe animation  
or GSAP infinite loop

Hover behaviour:

pause animation on hover

---

# Projects Section Behaviour

Projects should be controlled by scroll.

Scrolling should:

change active project

When project changes:

update right side content dynamically.

Recommended implementation:

React state to track active project.

---

# Contact Form

Fields:

Name  
Email  
Message  

Submit button should trigger a simple handler.

For now it can:

console.log(formData)

No backend required yet.

---

# Responsiveness

The website must be fully responsive.

Breakpoints:

Desktop  
Tablet  
Mobile

Navbar should collapse into a hamburger menu on mobile.

---

# Accessibility

All buttons should be keyboard accessible.

Images must include alt text.

Color contrast should remain readable.

---

# Performance

Images should be optimized.

Scroll animations should not block rendering.

Use lazy loading where possible.

---

# Deployment

The project should be easily deployable to:

Vercel  
Netlify  
GitHub Pages

---

# Code Quality

Code should follow:

- reusable components
- clean structure
- readable naming conventions
- modular architecture

---

# Future Improvements

Potential upgrades include:

backend contact API  
blog system  
CMS integration  
analytics integration  
project filtering