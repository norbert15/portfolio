document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal");
  const modalImg = document.getElementById("modelGaleryImg");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.querySelector(".right-arrow");
  const prevBtn = document.querySelector(".left-arrow");

  let currentIndex = -1;

  const imgsGroup = {
    workSync: document.querySelectorAll(".worksync-img"),
    amoba: document.querySelectorAll(".amoba-img"),
    costTracker: document.querySelectorAll(".costtracker-img"),
    products: document.querySelectorAll(".product-img"),
  };

  let activeItems = [];

  document
    .querySelector("#worksyncGallery")
    .addEventListener("click", (event) => {
      activeItems = imgsGroup.workSync;
      handleImgClick(event);
    });

  document
    .querySelector("#amobaGameGallery")
    .addEventListener("click", (event) => {
      activeItems = imgsGroup.amoba;
      handleImgClick(event);
    });

  document
    .querySelector("#costTrackerGallery")
    .addEventListener("click", (event) => {
      activeItems = imgsGroup.costTracker;
      handleImgClick(event);
    });

  document
    .querySelector("#productStorageGallery")
    .addEventListener("click", (event) => {
      activeItems = imgsGroup.products;
      handleImgClick(event);
    });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "flex") {
      closeDialog();
    }

    if (event.key === "ArrowLeft") {
      loadPrev();
    }

    if (event.key === "ArrowRight") {
      loadNext();
    }
  });

  closeBtn.addEventListener("click", () => {
    closeDialog();
  });

  nextBtn.addEventListener("click", () => {
    loadNext();
  });

  prevBtn.addEventListener("click", () => {
    loadPrev();
  });

  function handleImgClick(event) {
    const { target } = event;
    setImage(target.src, target.alt, target.getAttribute("data-index"));

    if (currentIndex === 0) {
      prevBtn.style.display = "none";
    }

    if (currentIndex === activeItems.length - 1) {
      nextBtn.style.display = "none";
    }
  }

  function loadNext() {
    if (currentIndex < activeItems.length - 1) {
      const target = activeItems[currentIndex + 1];
      setImage(target.src, target.alt, currentIndex + 1);

      if (currentIndex === activeItems.length - 1) {
        nextBtn.style.display = "none";
      }

      if (currentIndex > 0) {
        prevBtn.style.display = "block";
      }
    }
  }

  function loadPrev() {
    if (currentIndex > 0) {
      const target = activeItems[currentIndex - 1];
      setImage(target.src, target.alt, currentIndex - 1);

      if (currentIndex === 0) {
        prevBtn.style.display = "none";
      }

      if (currentIndex < activeItems.length - 1) {
        nextBtn.style.display = "block";
      }
    }
  }

  function closeDialog() {
    document.body.style.overflow = "unset";
    modal.style.display = "none";
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
    modalImg.setAttribute("src", "");
    modalImg.setAttribute("alt", "");
    currentIndex = -1;
  }

  function setImage(src, alt, index) {
    if (src && modal && modalImg) {
      document.body.style.overflow = "hidden";
      modal.style.display = "flex";
      modalImg.setAttribute("src", src);
      modalImg.setAttribute("alt", alt);
      currentIndex = +index;
    }
  }

  checkVisibility();
  scrollTracker();
});

const navbarUl = document.querySelector("nav ul");
const hamburgerMenu = document.getElementById("hamburgerMenu");

hamburgerMenu.addEventListener("click", () => {
  const opened = hamburgerMenu.classList.contains("nav-close");
  navbarUl.style.top = opened ? "-1000px" : "70px";
  document.body.style.overflow = opened ? "unset" : "hidden";
  hamburgerMenu.classList.toggle("nav-close");
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
      /*  navbarUl.style.display = "none";
      hamburgerMenu.classList.remove('nav-close');
      document.body.style.overflow = "unset"; */
    }
  });
});

const sections = document.querySelectorAll("section");
const unVisibleElements = document.querySelectorAll(".unvisible");

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

    if (rect.top <= window.innerHeight * 0.7 && rect.bottom >= 0) {
      section.classList.add("visible");
    }
  });
}

function resizeTracker() {
  navbarUl.style.top = "-1000px";
  hamburgerMenu.classList.remove("nav-close");

  if (window.innerWidth < 900) {
    navbarUl.classList.add("mobile-navbar");
  } else {
    navbarUl.classList.remove("mobile-navbar");
    document.body.style.overflow = "unset";
  }
}

window.addEventListener("scroll", () => {
  scrollTracker();
  checkVisibility();
});

window.addEventListener("resize", resizeTracker);

resizeTracker();
