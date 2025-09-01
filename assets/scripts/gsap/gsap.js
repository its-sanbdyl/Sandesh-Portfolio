  //Final God Level Masterpiece GSAP animation by Chatgpt

  gsap.registerPlugin(ScrollTrigger);

  // ---------------- NAVBAR ----------------
  gsap.from(".nav-bar", {y:-50, opacity:0, duration:1.2, ease:"power3.out"});
  gsap.from(".nav-links a, .social-link", {y:-20, opacity:0, stagger:0.15, duration:0.8, ease:"back.out(1.7)", delay:0.5});

  // ---------------- HERO ----------------
  gsap.from(".hero-start-title", {opacity:0, duration:2, ease:"power3.out"});
  
  // Parallax mousemove effect
  document.querySelector(".hero").addEventListener("mousemove", (e) => {
    const x = (window.innerWidth/2 - e.clientX)/50;
    const y = (window.innerHeight/2 - e.clientY)/50;
    gsap.to(".hero-info-card", {x:x, y:y, rotateY:x, rotateX:y, ease:"power1.out", duration:0.5});
  });

  // Info cards stagger with 3D rotation
  gsap.from(".hero-info-card", {
    scale:0, opacity:0, rotationY:30, rotationX:15, stagger:0.3, duration:1, ease:"elastic.out(1,0.5)"
  });

  gsap.from(".hero-intro-container", {x:-150, opacity:0, duration:1.2, scrollTrigger:{trigger:".hero-intro-container", start:"top 80%"}});
  gsap.from(".hero-sidebox-container", {x:150, opacity:0, duration:1.2, scrollTrigger:{trigger:".hero-sidebox-container", start:"top 80%"}});

  // ---------------- ABOUT ME ----------------
  gsap.from(".about-me-title", {y:50, opacity:0, duration:1, scrollTrigger:{trigger:".about-me-title", start:"top 80%"}});
  gsap.from(".about-me-paragraph", {y:50, opacity:0, stagger:0.2, duration:1, scrollTrigger:{trigger:".about-me-paragraph", start:"top 80%"}});
  gsap.from(".about-me-img", {x:100, opacity:0, duration:1.2, scrollTrigger:{trigger:".about-me-img", start:"top 80%"}});

  // ---------------- SKILLS ----------------
  gsap.from(".code-left-tag", {x: -5, duration: 1, opacity: 0, scrollTrigger:{trigger: ".code-tag", start:"top 70%"}});
  gsap.from(".code-close-tag", {x: 10, y: -10, duration: 1, opacity: 0, scrollTrigger:{trigger: ".code-tag", start:"top 70%"}});
  gsap.from(".code-right-tag", {x: 5, duration: 1, opacity: 0, scrollTrigger:{trigger: ".code-tag", start:"top 70%"}});

  gsap.from(".skills-title", {y:50, opacity:0, duration:1, scrollTrigger:{trigger:".skills-title", start:"top 80%"}});
  gsap.from(".skills-card", {x:0, y:50, opacity:0, stagger:0.2, duration:1, scrollTrigger:{trigger:".skills-card-container", start:"top 80%"}});
  gsap.from(".skills-language", {scale:0, opacity:0, stagger:0.15, duration:0.8, ease:"back.out(1.7)", scrollTrigger:{trigger:".skills-languages-container", start:"top 80%"}});
  
  // 3D hover tilt effect for skill cards
  document.querySelectorAll(".skills-card, .skills-language").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width/2;
      const midY = rect.height/2;
      const rotateX = (y - midY)/15;
      const rotateY = (x - midX)/15;
      gsap.to(card, {rotateX: -rotateX, rotateY: rotateY, scale:1.05, ease:"power1.out", duration:0.5});
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {rotateX:0, rotateY:0, scale:1, ease:"power1.out", duration:0.5});
    });
  });

  // ---------------- WORKS ----------------
  gsap.from(".works-title", {y:50, opacity:0, duration:1, scrollTrigger:{trigger:".works-title", start:"top 80%"}});
  gsap.from(".works-slide", {x:100, opacity:0, stagger:0.2, duration:1, ease:"power3.out", scrollTrigger:{trigger:".works-carousel", start:"top 80%"}});

  gsap.to(".works-link", {
    scale: 1.05,
    duration: 0.3,
    ease: "power1.inOut",
    paused: true,
    repeat: 0,
  });

  document.querySelectorAll(".works-link").forEach(link => {
    link.addEventListener("mouseenter", () => gsap.to(link, { scale: 1.05 }));
    link.addEventListener("mouseleave", () => gsap.to(link, { scale: 1 }));
  });

  // ---------------- BLOGS ----------------
  gsap.from(".blogs-title", {y:50, opacity:0, duration:1, scrollTrigger:{trigger:".blogs-title", start:"top 80%"}});
  gsap.from(".blogs-item", {x:-100, opacity:0, stagger:0.3, duration:1, ease:"power3.out", scrollTrigger:{trigger:".blogs-container", start:"top 80%"}});

  // SplitText text animation for blog titles
 

  window.addEventListener("load", () => {
  // all images, fonts, etc. are fully loaded
   document.querySelectorAll(".blogs-item-title").forEach(title => {
    const split = new SplitText(title, {type:"chars"});
    gsap.from(split.chars, {opacity:0, y:20, stagger:0.05, duration:0.8, scrollTrigger:{trigger:title, start:"top 90%"}});
  });
});

  // ---------------- CONTACT ----------------
  gsap.from(".contact-title", {y:50, opacity:0, duration:1, scrollTrigger:{trigger:".contact-title", start:"top 80%"}});
  gsap.from(".contact-form", {y:50, opacity:0, duration:1, stagger:0.2, scrollTrigger:{trigger:".contact-form", start:"top 80%"}});

  // ---------------- FOOTER ----------------
  gsap.from(".footer", {x:-30, opacity:0, duration:1, stagger:0.2, scrollTrigger:{trigger:".footer", start:"top bottom"}});

  // ---------------- GO TO TOP ----------------
  gsap.from(".go-to-top", {scale:0, opacity:0, duration:1, delay:0.5, ease:"back.out(1.7)"});
  gsap.to(".go-to-top", {yoyo:true, repeat:-1, y:"+=10", duration:1, ease:"sine.inOut"});
  
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    effects: true
  });