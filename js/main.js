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
      end: "+=5000",
      pin: true,
      scrub: 1,
    }
  });

  heroTl
    // PHASE 1: Zoom out the initial view and fade it away
    .to(".seq-1", { scale: 0.5, opacity: 0, duration: 2 })

    // PHASE 2: While Seq 1 fades out, Seq 2 flies in from off-screen
    .to(".seq-2", { scale: 1, opacity: 1, duration: 2 }, "-=1")
    .to(".seq-2-subtitle", { opacity: 1, duration: 2 }, "<")

    // PHASE 3: The stroke name fills with solid gold color
    .to(".stroke-name-new", { fill: "#D4AF37", duration: 1 })

    // PHASE 4: Crossfade and slide up Seq 2 out and Seq 3 (About Me) in seamlessly
    .to(".seq-2", { opacity: 0, y: -100, duration: 1.5 }, "+=0.5") // Slide up and fade out
    .to(".seq-3", { opacity: 1, y: 0, duration: 1.5 }, "<")     // Slide up and fade in AT THE SAME TIME

    // PHASE 5: Hold About Me so user can read it
    .to({}, { duration: 2 });

  // AUTO-PLAY MAGIC: Scroll the page automatically to the filled name state if at top
  setTimeout(() => {
    if (window.scrollY === 0) {
      let dummy = { y: 0 };
      gsap.to(dummy, {
        y: 2500, // Exactly halfway through the 5000px scrub where the name fills with gold
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => window.scrollTo(0, dummy.y)
      });
    }
  }, 300);


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
