import { modal, modalImg, activeGallery, nextBtn, prevBtn } from './variables.js';

export class GalleryEventHelper {
  imgElements = [];
  galeryElement;
  id;

  imgIndex = -1;

  velocity = 0;
  lastX;
  isDragging = false;
  isMoved = false;
  previewEventsAdded = false;

  constructor(galleryId, imagesSelector) {
    this.galeryElement = document.getElementById(galleryId);
    this.id = galleryId;
    this.imgElements = document.querySelectorAll(imagesSelector);
  }

  addEventHandlers() {
    if (this.galeryElement) {
      this.addClickHandler();
      this.addScrollHandler();
      this.addTouchHandler();
    }
  }

  addClickHandler() {
    this.galeryElement.addEventListener("click", (event) => {
      if (!this.isMoved) {
        activeGallery.id = this.id;
        this.onImgClick(event);
      }

      this.isDragging = false;
      this.isMoved = false;
    });
  }


  addScrollHandler() {
    this.galeryElement.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.isDragging = true;
      this.lastX = e.pageX - this.galeryElement.offsetLeft;
    });

    this.galeryElement.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - this.galeryElement.offsetLeft;
      const deltaX = (x - this.lastX) * 0.8;
      this.lastX = x;
      this.isMoved = true;

      this.galeryElement.scrollLeft -= deltaX;
    });

    this.galeryElement.addEventListener("mouseleave", () => {
      this.isDragging = false;
      this.isMoved;
    });
  }

  addTouchHandler() {
    this.galeryElement.addEventListener("touchend", () => {
      this.isDragging = false;
      this.isMoved = false;
    });

    this.galeryElement.addEventListener(
      "touchstart",
      (e) => {
        this.isDragging = true;
        this.lastX = e.touches[0].pageX - this.galeryElement.offsetLeft;
      },
      { passive: false }
    );

    this.galeryElement.addEventListener(
      "touchmove",
      (e) => {
        if (!this.isDragging) return;
        const x = e.touches[0].clientX - this.galeryElement.offsetLeft;
        const deltaX = (x - this.lastX) * 0.8;
        this.lastX = x;
        this.isMoved = true;
        this.galeryElement.scrollLeft -= deltaX;
      },
      { passive: true }
    );

    this.galeryElement.addEventListener("touchend", () => {
      this.isDragging = false;
      this.isMoved = false;
    });
  }

  onImgClick(event) {
    const { target } = event;
    this.openImgView(target.src, target.alt, target.getAttribute("data-index"));

    if (this.imgIndex === 0) {
      prevBtn.style.display = "none";
    }

    if (this.imgIndex === this.imgElements.length - 1) {
      nextBtn.style.display = "none";
    }
  }

  loadNext() {
    if (this.imgIndex < this.imgElements.length - 1) {
      const target = this.imgElements[this.imgIndex + 1];
      this.openImgView(target.src, target.alt, this.imgIndex + 1);

      if (this.imgIndex === this.imgElements.length - 1) {
        nextBtn.style.display = "none";
      }

      if (this.imgIndex > 0) {
        prevBtn.style.display = "block";
      }
    }
  }

  loadPrev() {
    if (this.imgIndex > 0) {
      const target = this.imgElements[this.imgIndex - 1];
      this.openImgView(target.src, target.alt, this.imgIndex - 1);

      if (this.imgIndex === 0) {
        prevBtn.style.display = "none";
      }

      if (this.imgIndex < this.imgElements.length - 1) {
        nextBtn.style.display = "block";
      }
    }
  }

  openImgView(src, alt, index) {
    if (src && modal && modalImg) {
      document.body.classList.add('overflow-hidden');
      modal.style.display = "flex";
      modalImg.setAttribute("src", src);
      modalImg.setAttribute("alt", alt);
      this.imgIndex = +index;
    }
  }
}
