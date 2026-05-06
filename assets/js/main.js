// Fade-in on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll(".fade-up").forEach(el => {
  observer.observe(el);
});

// WORK FILTER
const filterButtons = document.querySelectorAll(".filter-btn");
const workItems = document.querySelectorAll(".main-grid .work-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    workItems.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Modal removed; only Video Editing opens a full page via link.

