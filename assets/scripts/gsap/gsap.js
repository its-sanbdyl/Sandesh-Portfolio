setTimeout(() => {
  if (!window.gsap) return;
  const { gsap } = window;
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother/*, SplitText*/);

    const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true,
  });

  // Handle "Let's Talk" button click
  const letsTalkBtn = document.querySelector(".hero-intro-cta");
  if (letsTalkBtn) {
    letsTalkBtn.addEventListener("click", e => {
      e.preventDefault();
      // Scroll directly to the contact section
      smoother.scrollTo(".contact-title", true); 
      // ↑ true = smooth animation
    });
  }

  // ---- GLOBAL DEFAULTS ----
  gsap.defaults({ ease: 'power3.out', duration: 1 });

  // Recalculate after everything is in place (fonts/images)
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refresh);
  }
  window.addEventListener('load', () => requestAnimationFrame(refresh));

  // ---- HELPERS ----
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---- BLOGS ----
  gsap.from(".blogs-title", { y: 50, autoAlpha: 0,
    scrollTrigger: { trigger: ".blogs-title", start: "top 90%" }
  });

  gsap.from(".blogs-item", {
    x: -100, autoAlpha: 0, stagger: 0.3,
    scrollTrigger: { trigger: ".blogs-container", start: "top 90%" }
  });

  // SplitText (only if you included the plugin)
  if (window.SplitText) {
    $$(".blogs-item-title").forEach(title => {
      const split = new SplitText(title, { type: "chars" });
      gsap.from(split.chars, {
        autoAlpha: 0, y: 20, stagger: 0.05, duration: 0.8,
        scrollTrigger: { trigger: title, start: "top 90%" }
      });
    });
  }

  // ---- GO TO TOP ----
  gsap.from(".go-to-top", { scale: 0, autoAlpha: 0, delay: 0.3, ease: "back.out(1.7)" });
  gsap.to(".go-to-top", { yoyo: true, repeat: -1, y: "+=10", duration: 1, ease: "sine.inOut" });

  // ---- NAVBAR ----
  gsap.from(".nav-bar", { y: -50, autoAlpha: 0, duration: 1.2 });
  gsap.from(".nav-links a, .social-link", {
    y: -20, autoAlpha: 0, stagger: 0.15, duration: 0.8, ease: "back.out(1.7)", delay: 0.5
  });
  
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

  gsap.from(".hero-intro-container", {x:-150, opacity:0, duration:1.2, scrollTrigger:{trigger:".hero-intro-container", start:"top 90%"}});
  gsap.from(".hero-sidebox-container", {x:150, opacity:0, duration:1.2, scrollTrigger:{trigger:".hero-sidebox-container", start:"top 90%"}});

  // ---- ABOUT ----
  gsap.from(".about-me-title", { y: 50, autoAlpha: 0,
    scrollTrigger: { trigger: ".about-me-title", start: "top 90%" }
  });

  gsap.from(".about-me-paragraph", {
    y: 50, autoAlpha: 0, stagger: 0.2,
    scrollTrigger: { trigger: ".about-me-paragraph", start: "top 90%" }
  });

  gsap.from(".about-me-img", {
    x: 100, autoAlpha: 0, duration: 1.2,
    scrollTrigger: { trigger: ".about-me-img", start: "top 90%" }
  });

  // ---- SKILLS ----
  gsap.from(".code-left-tag",  { x: -5, autoAlpha: 0, scrollTrigger: { trigger: ".code-tag", start: "top 70%" } });
  gsap.from(".code-close-tag", { x: 10, y: -10, autoAlpha: 0, scrollTrigger: { trigger: ".code-tag", start: "top 70%" } });
  gsap.from(".code-right-tag", { x: 5,  autoAlpha: 0, scrollTrigger: { trigger: ".code-tag", start: "top 70%" } });

  gsap.from(".skills-title", { y: 50, autoAlpha: 0,
    scrollTrigger: { trigger: ".skills-title", start: "top 90%" }
  });

  gsap.from(".skills-card", {
    y: 50, autoAlpha: 0, stagger: 0.2,
    scrollTrigger: { trigger: ".skills-card-container", start: "top 90%" }
  });

  gsap.from(".skills-language", {
    scale: 0, autoAlpha: 0, stagger: 0.15, ease: "back.out(1.7)",
    scrollTrigger: { trigger: ".skills-languages-container", start: "top 90%" }
  });

  // 3D hover tilt
  $$(".skills-card, .skills-language").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const rotateX = (e.clientY - r.top  - r.height/2) / 15;
      const rotateY = (e.clientX - r.left - r.width/2)  / 15;
      gsap.to(card, { rotateX: -rotateX, rotateY, scale: 1.05, ease: "power1.out", duration: 0.5 });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, ease: "power1.out", duration: 0.5 });
    });
  });

  // ---- WORKS ----
  gsap.from(".works-title", { y: 50, autoAlpha: 0,
    scrollTrigger: { trigger: ".works-title", start: "top 90%" }
  });

  gsap.from(".works-slide", {
    x: 100, autoAlpha: 0, stagger: 0.2,
    scrollTrigger: { trigger: ".works-carousel", start: "top 90%" }
  });

  $$(".works-link").forEach(link => {
    link.addEventListener("mouseenter", () => gsap.to(link, { scale: 1.05, duration: 0.3 }));
    link.addEventListener("mouseleave", () => gsap.to(link, { scale: 1,    duration: 0.3 }));
  });

  // ---- CONTACT ----
  gsap.from(".contact-title", { y: 50, autoAlpha: 0,
    scrollTrigger: { trigger: ".contact-title", start: "top 90%" }
  });

  gsap.from(".contact-form", {
    y: 50, autoAlpha: 0,
    scrollTrigger: { trigger: ".contact-form", start: "top 90%" }
  });

  // ---- FOOTER ----
  gsap.from(".footer", {
    x: -30, autoAlpha: 0,
    scrollTrigger: { trigger: ".footer", start: "top bottom" }
  });
}, 2000);

