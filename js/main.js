document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  /* --------------------------------------------------------
     1. HERO PINNED SEQUENCES
     -------------------------------------------------------- */
  // We make the pinned scroll very long so all sequences have time to play
  let heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pin-hero",
      start: "top top",
      end: "+=5000", // 5000px of scrolling for the whole intro
      pin: true,
      scrub: 1,
    }
  });

  // INITIAL STATES
  gsap.set(".seq-2", { scale: 5, opacity: 0 }); // Seq 2 starts massive (out of screen) and hidden
  gsap.set(".seq-3", { opacity: 0 }); // About me hidden initially

  heroTl
    // PHASE 1: Zoom out the initial view and fade it away
    .to(".seq-1", { scale: 0.5, opacity: 0, duration: 2 })

    // PHASE 2: While Seq 1 fades out, Seq 2 (Stroke Name) flies in from off-screen
    .to(".seq-2", { scale: 1, opacity: 1, duration: 2 }, "-=1")

    // PHASE 3: The stroke name fills with solid gold color
    .to(".stroke-name-new", { fill: "#D4AF37", duration: 1 })

    // PHASE 4: The subtitle text fades in under the filled name
    .to(".seq-2-subtitle", { opacity: 1, duration: 1 })

    // Hold so user can read it
    .to({}, { duration: 1 })

    // PHASE 5: Fade out the Name + Subtitle
    .to(".seq-2", { opacity: 0, duration: 1 })

    // PHASE 6: Fade in the About Me section (all while still pinned)
    .to(".seq-3", { opacity: 1, duration: 1.5 })

    // Hold About Me so user can read it before the pin ends and standard scrolling starts
    .to({}, { duration: 2 });


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
