(() => {
  const startAnimations = () => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (!reduceMotion) document.body.classList.add("is-ready");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAnimations, { once: true });
  } else {
    startAnimations();
  }

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");

  mobileMenuBtn?.addEventListener("click", () => {
    if (!mobileMenu) return;
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden");
    mobileMenuBtn.setAttribute("aria-expanded", String(!isOpen));
    
    // Toggle menu icon
    if (menuIcon) {
      if (!isOpen) {
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
      } else {
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />';
      }
    }
  });

  // Sticky Header Logic
  const header = document.getElementById("mainHeader");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header?.classList.add("bg-slate-900/90", "backdrop-blur-xl", "py-3", "shadow-2xl", "border-b", "border-white/5");
      header?.classList.remove("py-4");
    } else {
      header?.classList.remove("bg-slate-900/90", "backdrop-blur-xl", "py-3", "shadow-2xl", "border-b", "border-white/5");
      header?.classList.add("py-4");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Initial check

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const searchForm = document.getElementById("searchForm");
  const searchResult = document.getElementById("searchResult");
  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const location = String(formData.get("location") || "").trim();
    const type = String(formData.get("type") || "").trim();
    const budget = String(formData.get("budget") || "").trim();

    const parts = [location || "Anywhere", type || "Any type", budget || "Any budget"];
    if (searchResult) {
      searchResult.textContent = `Searching listings for: ${parts.join(" • ")}`;
      searchResult.classList.remove("hidden");
    }
  });

  const leadForm = document.getElementById("leadForm");
  const leadResult = document.getElementById("leadResult");
  leadForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(leadForm);
    const name = String(formData.get("name") || "").trim();

    if (leadResult) {
      leadResult.textContent = `Thanks, ${name || "there"}! Your enquiry was captured (demo). Connect this form to email/CRM when ready.`;
      leadResult.classList.remove("hidden");
    }

    leadForm.reset();
  });

  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterResult = document.getElementById("newsletterResult");
  newsletterForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (newsletterResult) {
      newsletterResult.textContent = "Subscribed (demo).";
      newsletterResult.classList.remove("hidden");
    }
    newsletterForm.reset();
  });
})();
