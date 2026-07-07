document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  /* --------------------------------------------------------
    1. HERO PINNED SEQUENCES
     -------------------------------------------------------- */
  // INITIAL STATES
  gsap.set(".seq-2", { scale: 5, opacity: 0 }); // Seq 2 starts massive (out of screen) and hidden
  gsap.set(".seq-3", { opacity: 0, y: 100 }); // About me hidden and pushed down initially

  let heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pin-hero",
      start: "top top",
      end: () => `+=${window.matchMedia("(max-width: 768px)").matches ? 1200 : 1800}`,
      pin: true,
      scrub: 0.5,
      invalidateOnRefresh: true,
    }
  });

  heroTl
    // PHASE 1: Zoom out the initial view and fade it away
    .to(".seq-1", { scale: 0.5, opacity: 0, duration: 1.2, ease: "power1.out" })

    // PHASE 2: While Seq 1 fades out, Seq 2 flies in from off-screen
    .to(".seq-2", { scale: 1, opacity: 1, duration: 1.2, ease: "power1.out" }, "-=0.8")
    .to(".seq-2-subtitle", { opacity: 1, duration: 1.2, ease: "power1.out" }, "<")

    // PHASE 3: The stroke name fills with solid gold color
    .to(".stroke-name-new", { fill: "#D4AF37", duration: 0.7, ease: "power1.out" })

    // PHASE 4: Crossfade and slide up Seq 2 out and Seq 3 (About Me) in seamlessly
    .to(".seq-2", { opacity: 0, y: -80, duration: 1.1, ease: "power1.out" }, "+=0.2")
    .to(".seq-3", { opacity: 1, y: 0, duration: 1.1, ease: "power1.out" }, "<")

    // Keep a short settling beat, then release directly into Services.
    .to({}, { duration: 0.15 });

  // AUTO-PLAY MAGIC: Scroll the page automatically to the filled name state if at top
  setTimeout(() => {
    if (window.scrollY === 0) {
      let dummy = { y: 0 };
      gsap.to(dummy, {
        y: window.matchMedia("(max-width: 768px)").matches ? 800 : 1200,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => window.scrollTo(0, dummy.y)
      });
    }
  }, 200);


  /* --------------------------------------------------------
    2. SERVICES (CHARACTER STYLE REVEAL)
     -------------------------------------------------------- */
  const serviceCards = gsap.utils.toArray(".char-reveal");

  serviceCards.forEach((card, i) => {
    // Slide in from left for even index, right for odd index
    let xOffset = i % 2 === 0 ? -100 : 100;

    gsap.fromTo(card,
      { x: xOffset, opacity: 0 },
      {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
        },
        x: 0,
        opacity: 1,
        ease: "power1.out"
      }
    );
  });


  /* --------------------------------------------------------
    3. TOOLS STAGGER REVEAL
     -------------------------------------------------------- */
  const toolCategories = gsap.utils.toArray(".stagger-tool");

  toolCategories.forEach((cat) => {
    gsap.fromTo(cat,
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: cat,
          start: "top 85%",
          end: "top 60%",
          scrub: 1
        },
        y: 0,
        opacity: 1
      }
    );
  });

});
