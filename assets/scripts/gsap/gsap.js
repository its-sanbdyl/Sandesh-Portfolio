// Logo Animation

gsap.from('.tagslash-left', {
    x: -50,
    opacity: 0,
    duration: 2
})

gsap.from('.tagslash-center', {
    scale: 5,
    opacity: 0,
    duration: 2 
})

gsap.from('.tagslash-right', {
    x: 50,
    opacity: 0,
    duration: 2 
})

gsap.from('.logo-name', {
    y: 40,
    opacity: 0,
    duration: 2.5
})

// Navbar Animation

gsap.from('.nav-items', {
    opacity: 0,
    duration: 4
})

// Hero Section Animations

gsap.from('.hero-info-card', {
    rotate: -10,
    opacity: 0,
    duration: 4
})

gsap.fromTo('.hero-start-title', {
    x: 0,
    scale: 1.2,
    opacity: 0,
}, {
    x: 0,
    scale: 1,
    opacity: 1,
    duration: 3
})

gsap.from('.hero-intro-container', {
    opacity: 0,
    duration: 4
})

gsap.from('.hero-intro-title', {
    x: -50,
    duration: 4
})

gsap.from('.hero-intro-paragraph', {
    x: -50,
    duration: 4
})

gsap.from('.hero-sidebox-container', {
    opacity: 0,
    duration: 3
})

gsap.from('.hero-sidebox-item-number', {
    y: 30,
    duration: 3  
})