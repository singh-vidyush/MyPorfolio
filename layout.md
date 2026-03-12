# Website Layout Blueprint

This file describes the visual layout of the portfolio website.

The site is a single page composed of vertically stacked sections.

Sections:

1. Navbar
2. Hero Scroll Animation
3. Skills / Technologies
4. Projects
5. Contact
6. Footer

---

# Navbar Layout

Position: Fixed Top

Width: Full

Height: ~70px

Structure:

| Logo/Name | Navigation Links | Social Links |

Navigation Links:
Home
About
Projects
Contact

Social Links:
Instagram
Github
LinkedIn

Style:
floating
translucent background
blur effect
rounded borders

---

# Hero Section Layout

Full screen height.

Structure:

| LEFT SIDE | RIGHT SIDE |
|-----------|------------|
| Large Name | Scroll Animation Frames |

Initial state:
Large name displayed on left side.

During scrolling:
scroll animation images change in center/background.

After animation ends:
name fades out
description text fades in on right side.

---

# Skills Section Layout

Centered horizontal scrolling row.

Example:

React | JavaScript | Python | Machine Learning | SQL | Git | APIs

Movement:

Right → Left infinite scroll.

Hover behaviour:

Pause animation.

---

# Projects Section Layout

Two column layout.

| LEFT SIDE | RIGHT SIDE |
|-----------|------------|
| Project Cards | Project Details |

Left Side:

Stack of project cards.

Scrolling changes active card.

Right Side:

Displays:

Project Name  
Description  
Technologies  
Project Link

Only one project active at a time.

---

# Contact Section Layout

Centered contact form.

Structure:

Name Input

Email Input

Message Textarea

Submit Button

Vertical layout.

Spacing between inputs.

---

# Footer Section

Centered content.

Text:

Thank you for visiting.

Below text:

Download Resume Button

Button should be prominent and centered.

---

# Mobile Layout

Navbar collapses into hamburger menu.

Sections stack vertically.

Projects section becomes:

Cards on top  
Description below.

Animations should remain smooth on mobile.