# Portfolio Website Specification

## Project Overview
This project is a single-page personal portfolio website designed to showcase my profile, skills, and projects.  
The website should be visually engaging with smooth animations, scroll-based transitions, and a modern dark theme.

The entire website exists on a single page with navigation links that scroll to different sections.

The goal of the website is to:
- Present my identity and personal brand
- Showcase my projects
- Display the technologies I know
- Provide contact information
- Allow visitors to download my resume

---

# Global Design Requirements

Theme: Dark  
Font Color: White  
Background Color: rgb(19, 38, 59)

Primary Button Color:  
rgb(77, 144, 219)

Button Hover Color:  
rgb(101, 170, 247)

Animations should be smooth and modern.

---

# Navbar

The navigation bar should remain fixed at the top throughout the website.

Design:
- floating
- translucent background
- rounded borders
- slight blur effect

Navbar Items:

Home  
About Me  
Projects  
Contact  
Instagram  
Github  
LinkedIn

Navigation Behaviour:

Home → scrolls to start of page  
About Me → scrolls to about section  
Projects → scrolls to project section  
Contact → scrolls to contact section  

External Links:

Instagram → opens Instagram profile in new tab  
Github → opens GitHub profile in new tab  
LinkedIn → opens LinkedIn profile in new tab

---

# Section 1: Hero Scroll Animation

The landing section contains a scroll-driven animation.

A folder called:

scroll_animation

contains sequential images:

1.jpg
2.jpg  
3.jpg  
4.jpg  
...  

These images represent frames of an animation.

Behaviour:

As the user scrolls down:
- images change sequentially
- animation should feel smooth and seamless
- scrolling controls the frame progression

Layout:

Left side:
Large text displaying my name.

While scrolling:
- my name slowly fades or moves away

Right side (appears after animation):
A short description about me appears.

Example description:

"I am a developer passionate about building intelligent systems, solving problems with code, and creating impactful digital experiences."

---

# Section 2: Skills and Technologies

This section displays the tools and technologies I know.

Design:

There should be a horizontal line of technology tags or icons.

Example:

React | JavaScript | Python | Machine Learning | Git | SQL | APIs

Behaviour:

The line should scroll continuously from right to left.

Animation Rules:

- infinite loop
- smooth movement
- when user hovers → scrolling pauses
- when hover removed → scrolling resumes

---

# Section 3: Projects

Projects should be displayed as cards.

Layout:

Left Side:
Project cards stacked vertically.

Right Side:
Selected project details.

Scrolling Behaviour:

When user scrolls:

scroll down → next project card becomes active  
scroll up → previous project card becomes active

When a card becomes active:

Right side updates to show:

Project Name  
Short Description  
Technologies Used  
Project Link (optional)

Card design should include:

- project title
- small preview image (optional)
- hover animation

---

# Section 4: Contact Form

This section allows visitors to contact me.

Form Fields:

Name (text input)

Email (email input)

Message (textarea)

Submit Button

For now the form does not need backend integration.  
It can simply log data to console or simulate submission.

---

# Section 5: Final Section

At the end of the page display a message:

"Thank you for visiting."

Below the message place a button:

Download Resume

When clicked:
- it downloads my resume PDF file.

The button should be centered on the page.

---

# Performance Requirements

The site should:

- load fast
- be mobile responsive
- support smooth scrolling
- maintain high animation performance

---

# Assets

Images for scroll animation:

/scroll_animation/

Resume file:

/resume.pdf

Project images:

/projects/

---

# Future Expansion

In the future the site may include:

- backend contact form
- blog section
- project case studies
- analytics