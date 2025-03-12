import { modal, modalImg, closeBtn, nextBtn, prevBtn, activeGallery } from './variables.js';
import { GalleryEventHelper } from "./gallery.js";

const navbar = document.getElementById("navbar")
const hamburgerMenu = document.getElementById("hamburgerMenu");
const sections = document.querySelectorAll("section");
const unVisibleElements = document.querySelectorAll(".unvisible");

const galleries = [
  new GalleryEventHelper("scattersGallery", ".scatters-img"),
  new GalleryEventHelper("worksyncGallery", ".worksync-img"),
  new GalleryEventHelper("amobaGameGallery", ".amoba-img"),
  new GalleryEventHelper("costTrackerGallery", ".costtracker-img"),
  new GalleryEventHelper("productStorageGallery", ".product-img"),
];

let modalImgStartX = 0;

document.addEventListener("DOMContentLoaded", () => {
  // Galéria események kezelésének elindítása
  galleries.forEach((g) => {
    g.addEventHandlers();
  })

  // Leütött billentyűzet eseményeinek kezelése
  document.addEventListener("keydown", (event) => {
    // Ha a escape karaktert nyomtak le és a kép megjelenítő dialog atkív
    if (event.key === "Escape" && modal.style.display === "flex") {
      closeDialog();
    }

    const gallery = getActiveGallery();

    // Ha kerül ki választásra, megnyitásra egy kép valamelyik galériából
    if (gallery) {
      if (event.key === "ArrowLeft" && gallery.imgIndex != -1) {
        gallery.loadPrev();
      }

      if (event.key === "ArrowRight" && gallery.imgIndex != -1) {
        gallery.loadNext();
      }
    }
  });

  closeBtn.addEventListener("click", () => {
    closeDialog();
  });

  nextBtn.addEventListener("click", () => {
    const gallery = getActiveGallery();

    if (gallery) {
      gallery.loadNext();
    }
  });

  prevBtn.addEventListener("click", () => {
    const gallery = getActiveGallery();

    if (gallery) {
      gallery.loadPrev();
    }
  });

  modal.addEventListener("touchstart", (event) => {
    const gallery = getActiveGallery();
    if (gallery) {

      modalImgStartX = event.touches[0].clientX;
    }
  }, { passive: true });

  modal.addEventListener("touchend", (event) => {
    const gallery = getActiveGallery();

    if (gallery) {
      let endX = event.changedTouches[0].clientX;
      let diff = modalImgStartX - endX;

      if (diff > 50) {
        gallery.loadNext();
      } else if (diff < -50) {
        gallery.loadPrev();
      }
    }
  });

  hamburgerMenu.addEventListener("click", () => {
    document.body.classList.toggle('overflow-hidden')
    navbar.classList.toggle('opened');
  });

  checkVisibility();
  scrollTracker();
  resizeTracker();
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (window.innerWidth < 900) {
      hamburgerMenu.click();
    }
  });
});

window.addEventListener("scroll", () => {
  scrollTracker();
  checkVisibility();
});

window.addEventListener("resize", resizeTracker);


function closeDialog() {
  document.body.classList.remove('overflow-hidden');
  modal.style.display = "none";
  prevBtn.style.display = "block";
  nextBtn.style.display = "block";
  modalImg.setAttribute("src", "");
  modalImg.setAttribute("alt", "");
  activeGallery.id = null;
}

function getActiveGallery() {
  if (activeGallery.id) {
    return galleries.find((g) => g.id === activeGallery.id);
  }

  return null;
}

function scrollTracker() {
  const currentYScroll = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const id = section.getAttribute("id");
    const currentNavLink = document.querySelector(`nav a[href*="#${id}"]`);

    if (
      currentYScroll > sectionTop &&
      currentYScroll <= sectionTop + sectionHeight
    ) {
      currentNavLink.classList.add("label-active");
    } else {
      currentNavLink.classList.remove("label-active");
    }
  });
}

function checkVisibility() {
  unVisibleElements.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0) {
      section.classList.add("visible");
    }
  });
}

function resizeTracker() {
  navbar.classList.remove("opened");
   if (!modal || !modal.style.display || modal.style.display === "none") {
    document.body.classList.remove('overflow-hidden')
  }
}
