console.log("✅ script.js is loaded and running");

const arrow = document.querySelector(".rotArrow");
arrow.style.transform = "rotate(180deg)";

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const leftArrow = document.querySelector(".prevBtnDark");
leftArrow.style.transform = "rotate(180deg)";
leftArrow.style.display = "none";

const rightArrow = document.querySelector(".nextBtnDark");
rightArrow.style.display = "none";

nextBtn.addEventListener("click", () => {
  rightArrow.style.display = "block";
  nextBtn.style.display = "none";
  leftArrow.style.display = "none";
  prevBtn.style.display = "block";
});

prevBtn.addEventListener("click", () => {
  leftArrow.style.display = "block";
  prevBtn.style.display = "none";
  rightArrow.style.display = "none";
  nextBtn.style.display = "block";
});

// =========================
// Spaces Carousel (Smooth)
// =========================
const track = document.querySelector(".carousel-track");

function getSlideWidth() {
  return track.querySelector(".slider").offsetWidth;
}
let isMoving = false;

// Active slide scaling
function updateActiveSlide() {
  Array.from(track.children).forEach((slide) => {
    slide.style.transition = "transform 0.5s ease";
    slide.style.transform = "scale(1)";
  });

  let activeIndex = window.innerWidth <= 768 ? 0 : 1;
  const activeSlide = track.children[activeIndex];
  if (activeSlide) activeSlide.style.transform = "scale(1.1)";
}

// Smooth Next (clone-based)
function slideNext() {
  if (isMoving) return;
  isMoving = true;

  const slideWidth = getSlideWidth();
  const firstSlide = track.firstElementChild;
  const clone = firstSlide.cloneNode(true);

  track.appendChild(clone); // clone goes to end
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${slideWidth}px)`;

  track.addEventListener(
    "transitionend",
    () => {
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
      track.removeChild(firstSlide); // remove old first slide
      updateActiveSlide();
      isMoving = false;
    },
    { once: true }
  );
}

// Smooth Prev (clone-based)
function slidePrev() {
  if (isMoving) return;
  isMoving = true;

  const slideWidth = getSlideWidth();
  const lastSlide = track.lastElementChild;
  const clone = lastSlide.cloneNode(true);

  track.insertBefore(clone, track.firstElementChild); // clone at start
  track.style.transition = "none";
  track.style.transform = `translateX(-${slideWidth}px)`;

  requestAnimationFrame(() => {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = "translateX(0)";
  });

  track.addEventListener(
    "transitionend",
    () => {
      track.removeChild(lastSlide); // remove old last slide
      updateActiveSlide();
      isMoving = false;
    },
    { once: true }
  );
}

// Bind buttons
nextBtn.addEventListener("click", slideNext);
rightArrow.addEventListener("click", slideNext);
prevBtn.addEventListener("click", slidePrev);
leftArrow.addEventListener("click", slidePrev);

updateActiveSlide();
window.addEventListener("resize", updateActiveSlide);



const indicatorsGroup = document.querySelectorAll(".btnWidth");
const currentSlideSpan = document.querySelector(".current-slide");
const totalSlidesSpan = document.querySelector(".total-slides");

const totalSlides2 = track.children.length; // number of slides in carousel
totalSlidesSpan.textContent = String(totalSlides2).padStart(2, "0");

// Keep track of current index
let currentSlideIndex = 0;

// Function to update indicators and number
function updateSlideIndicators() {
  indicatorsGroup.forEach((btn, i) => btn.classList.toggle("active", i === currentSlideIndex));
  currentSlideSpan.textContent = String(currentSlideIndex + 1).padStart(2, "0");
}

// Override slideNext
function slideNextWithIndicator() {
  slideNext();
  currentSlideIndex = (currentSlideIndex + 1) % totalSlides2;
  updateSlideIndicators();
}

// Override slidePrev
function slidePrevWithIndicator() {
  slidePrev();
  currentSlideIndex = (currentSlideIndex - 1 + totalSlides2) % totalSlides2;
  updateSlideIndicators();
}

// Bind buttons to new functions
nextBtn.removeEventListener("click", slideNext);
prevBtn.removeEventListener("click", slidePrev);

nextBtn.addEventListener("click", slideNextWithIndicator);
prevBtn.addEventListener("click", slidePrevWithIndicator);
rightArrow.addEventListener("click", slideNextWithIndicator);
leftArrow.addEventListener("click", slidePrevWithIndicator);



    // facilties carousel



    const num = document.querySelector(".indicator-num");
num.style.transform = "rotate(270deg)";
num.style.transformOrigin = "center";

const trackFacility = document.querySelector(".carousel-facility");
const indicators = document.querySelectorAll(".custom-indicator");
const buttons = document.querySelectorAll(".indicate-btn");
let isMoving2 = false;

function getSlideHeight() {
  return trackFacility.querySelector(".slide-facility").offsetHeight;
}

const totalSlides = indicators.length;
let currentIndex = 0;
updateIndicators();

function updateIndicators() {
  indicators.forEach((btn, i) => {
    btn.classList.toggle("active", i === currentIndex);
  });
  buttons.forEach((btn, i) => {
    btn.classList.toggle("active", i === currentIndex);
  });

  const numText = document.querySelector(".indicator-num p");
  numText.innerHTML = `${String(currentIndex + 1).padStart(
    2,
    "0"
  )}/ <span class="text-secondary">${String(totalSlides).padStart(
    2,
    "0"
  )}</span>`;
}

// 👉 Smooth vertical slide transition (no flicker)
function goToSlide(i) {
  if (isMoving2 || i === currentIndex) return;
  isMoving2 = true;

  const slideHeight = getSlideHeight();
  let diff = i - currentIndex;

  if (diff > 0) {
    // --- Move DOWN (Next)
    const clones = [];
    for (let j = 0; j < diff; j++) {
      clones.push(trackFacility.children[j].cloneNode(true));
    }
    clones.forEach(clone => trackFacility.appendChild(clone));

    requestAnimationFrame(() => {
      trackFacility.style.transition = "transform 0.5s ease-in-out";
      trackFacility.style.transform = `translateY(-${slideHeight * diff}px)`;
    });

    trackFacility.addEventListener(
      "transitionend",
      () => {
        for (let j = 0; j < diff; j++) {
          trackFacility.removeChild(trackFacility.firstElementChild);
        }
        trackFacility.style.transition = "none";
        trackFacility.style.transform = "translateY(0)";
        currentIndex = i;
        updateIndicators();
        isMoving2 = false;
      },
      { once: true }
    );
  } else {
    // --- Move UP (Previous)
    diff = Math.abs(diff);
    const total = trackFacility.children.length;
    const clones = [];
    for (let j = total - diff; j < total; j++) {
      clones.push(trackFacility.children[j].cloneNode(true));
    }
    clones.reverse().forEach(clone => {
      trackFacility.insertBefore(clone, trackFacility.firstElementChild);
    });

    trackFacility.style.transition = "none";
    trackFacility.style.transform = `translateY(-${slideHeight * diff}px)`;

    requestAnimationFrame(() => {
      trackFacility.style.transition = "transform 0.5s ease-in-out";
      trackFacility.style.transform = "translateY(0)";
    });

    trackFacility.addEventListener(
      "transitionend",
      () => {
        for (let j = 0; j < diff; j++) {
          trackFacility.removeChild(trackFacility.lastElementChild);
        }
        currentIndex = i;
        updateIndicators();
        isMoving2 = false;
      },
      { once: true }
    );
  }
}

// 👉 Click events
indicators.forEach((btn, i) => {
  btn.addEventListener("click", () => goToSlide(i));
});
buttons.forEach((btn, i) => {
  btn.addEventListener("click", () => goToSlide(i));
});





    // Gallery Slider

      const galleryArrowright = document.querySelector(".rotArrowGallery");
      const prevBtnGallery = document.querySelector(".prevBtnGallery");
      const nextBtnGallery = document.querySelector(".nextBtnGallery");
      const prevGallery = document.querySelector(".prev-gallery");
      const GalleryTrack = document.querySelector(".gallery-carousel-track");

      // Initial setup
      galleryArrowright.style.transform = "rotate(180deg)";
      prevBtnGallery.style.transform = "rotate(180deg)";
      prevBtnGallery.style.display = "none";
      nextBtnGallery.style.display = "none";

      // Toggle arrows visibility
      galleryArrowright.addEventListener("click", () => {
        galleryArrowright.style.display = "none";
        nextBtnGallery.style.display = "block";
        prevBtnGallery.style.display = "none";
        prevGallery.style.display = "block";
      });

      prevGallery.addEventListener("click", () => {
        prevGallery.style.display = "none";
        prevBtnGallery.style.display = "block";
        nextBtnGallery.style.display = "none";
        galleryArrowright.style.display = "block";
      });

      let isMoving3 = false;

      function getGallerySlideWidth() {
        return GalleryTrack.querySelector(".gallery-slide").offsetWidth;
      }

      // Highlight active slide only
      function updateActiveHeightSlide() {
        Array.from(GalleryTrack.children).forEach((slide) => {
          // slide.style.transition =
          //   "height 0.4s ease, transform 0.4s ease, opacity 0.4s ease";
            slide.style.height = "297.12px";
          // slide.style.opacity = "0.6";
          slide.style.transform = "scale(1)";
        });

        const activeIndex = window.innerWidth <= 768 ? 0 : 1;
        const activeSlide = GalleryTrack.children[activeIndex];
        if (activeSlide) {

          activeSlide.style.height = "532px";
                              // slide.style.transition =
          //   "height 0.4s ease, transform 0.4s ease, opacity 0.4s ease";
          // activeSlide.style.opacity = "1";
          activeSlide.style.transform = "scale(1)";
        }
      }

      // Smooth move next
      function moveNext(toggleButtons = false) {
        if (isMoving3) return;
        isMoving3 = true;

        const slideWidth = getGallerySlideWidth();
        const firstSlide = GalleryTrack.firstElementChild;
        const clone = firstSlide.cloneNode(true);

        // Shrink only current active before moving
        const activeIndex = window.innerWidth <= 768 ? 0 : 1;
        const activeSlide = GalleryTrack.children[activeIndex];
        if (activeSlide) {
          activeSlide.style.transform = "scale(1)";
          // activeSlide.style.opacity = "0.5";
        }

        // Small delay for smoother feel
        setTimeout(() => {
          GalleryTrack.appendChild(clone);
          GalleryTrack.style.transition = "transform 0.6s ease-in-out";
          GalleryTrack.style.transform = `translateX(-${slideWidth}px)`;
        }, 150);

        GalleryTrack.addEventListener(
          "transitionend",
          () => {
            GalleryTrack.style.transition = "none";
            GalleryTrack.style.transform = "translateX(0)";
            GalleryTrack.removeChild(firstSlide);
            updateActiveHeightSlide();
            isMoving3 = false;
          },
          { once: true }
        );
      }

      // Smooth move prev
      function movePrev(toggleButtons = false) {
        if (isMoving3) return;
        isMoving3 = true;

        const slideWidth = getGallerySlideWidth();
        const lastSlide = GalleryTrack.lastElementChild;
        const clone = lastSlide.cloneNode(true);

        // Shrink only current active before moving
        const activeIndex = window.innerWidth <= 768 ? 0 : 1;
        const activeSlide = GalleryTrack.children[activeIndex];
        if (activeSlide) {
          activeSlide.style.transform = "scale(1)";
          // activeSlide.style.opacity = "0.5";
        }

        GalleryTrack.insertBefore(clone, GalleryTrack.firstElementChild);
        GalleryTrack.style.transition = "none";
        GalleryTrack.style.transform = `translateX(-${slideWidth}px)`;

        requestAnimationFrame(() => {
          GalleryTrack.style.transition = "transform 0.6s ease-in-out";
          GalleryTrack.style.transform = "translateX(0)";
        });

        GalleryTrack.addEventListener(
          "transitionend",
          () => {
            GalleryTrack.removeChild(GalleryTrack.lastElementChild);
            updateActiveHeightSlide();
            isMoving3 = false;
          },
          { once: true }
        );
      }

      // Attach controls
      galleryArrowright.addEventListener("click", () => moveNext(true));
      nextBtnGallery.addEventListener("click", () => moveNext());
      prevGallery.addEventListener("click", () => movePrev(true));
      prevBtnGallery.addEventListener("click", () => movePrev());

      // Init
      updateActiveHeightSlide();
      window.addEventListener("resize", updateActiveHeightSlide);


    // Customer Carousel 

const nextCustomer = document.querySelector(".next-customer");
const prevBtnCustomer = document.querySelector(".prevBtnCustomer");
const nextBtnCustomer = document.querySelector(".nextBtnCustomer");
const prevCustomer = document.querySelector(".prev-customer");
const CustomerTrack = document.querySelector(".customer-carousel-track");
const customerIndicators = document.querySelectorAll(".btnWidth2");


nextCustomer.style.transform = "rotate(180deg)";
prevBtnCustomer.style.transform = "rotate(180deg)";
prevBtnCustomer.style.display = "none";
nextBtnCustomer.style.display = "none";

let isMoving4 = false;
let currentCustomerIndex = 0; // 👈 track active indicator



// Get slide width dynamically
function getCustomerSlideWidth() {
  return CustomerTrack.querySelector(".customer-slide").offsetWidth;
}

// Update indicator states
function updateCustomerIndicators(index) {
  customerIndicators.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
}


nextCustomer.addEventListener("click", () => {
  nextCustomer.style.display = "none";
  nextBtnCustomer.style.display = "block";
  prevCustomer.style.display = "block";
  prevBtnCustomer.style.display = "none";
});

prevCustomer.addEventListener("click", () => {
  prevCustomer.style.display = "none";
  prevBtnCustomer.style.display = "block";
  nextBtnCustomer.style.display = "none";
  nextCustomer.style.display = "block";
});


function slideNextCustomer() {
  if (isMoving4) return;
  isMoving4 = true;

  // 🔹 Move to next indicator
  currentCustomerIndex = (currentCustomerIndex + 1) % customerIndicators.length;
  updateCustomerIndicators(currentCustomerIndex);

  const slideWidth = getCustomerSlideWidth();
  const firstSlide = CustomerTrack.firstElementChild;
  const clone = firstSlide.cloneNode(true);

  CustomerTrack.appendChild(clone);
  CustomerTrack.style.transition = "transform 0.5s ease-in-out";
  CustomerTrack.style.transform = `translateX(-${slideWidth}px)`;

  CustomerTrack.addEventListener(
    "transitionend",
    () => {
      CustomerTrack.style.transition = "none";
      CustomerTrack.style.transform = "translateX(0)";
      CustomerTrack.removeChild(firstSlide);
      isMoving4 = false;
    },
    { once: true }
  );
}

function slidePrevCustomer() {
  if (isMoving4) return;
  isMoving4 = true;

  // 🔹 Move to previous indicator
  currentCustomerIndex =
    (currentCustomerIndex - 1 + customerIndicators.length) %
    customerIndicators.length;
  updateCustomerIndicators(currentCustomerIndex);

  const slideWidth = getCustomerSlideWidth();
  const lastSlide = CustomerTrack.lastElementChild;
  const clone = lastSlide.cloneNode(true);

  CustomerTrack.insertBefore(clone, CustomerTrack.firstElementChild);
  CustomerTrack.style.transition = "none";
  CustomerTrack.style.transform = `translateX(-${slideWidth}px)`;

  requestAnimationFrame(() => {
    CustomerTrack.style.transition = "transform 0.5s ease-in-out";
    CustomerTrack.style.transform = "translateX(0)";
  });

  CustomerTrack.addEventListener(
    "transitionend",
    () => {
      CustomerTrack.removeChild(lastSlide);
      isMoving4 = false;
    },
    { once: true }
  );
}


nextCustomer.addEventListener("click", slideNextCustomer);
nextBtnCustomer.addEventListener("click", slideNextCustomer);
prevCustomer.addEventListener("click", slidePrevCustomer);
prevBtnCustomer.addEventListener("click", slidePrevCustomer);


customerIndicators.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (i === currentCustomerIndex || isMoving4) return;
    currentCustomerIndex = i;
    updateCustomerIndicators(currentCustomerIndex);
  });
});



      //Help Center Cards

const cardBtns = document.querySelectorAll(".cardBtn");
const cardBodies = document.querySelectorAll(".Help-section-card");

cardBtns.forEach((Cardbtn) => {
  const card = Cardbtn.closest(".card"); // parent card
  const icon = Cardbtn.querySelector(".btnText");

  // Default styles
  Cardbtn.style.background = "#FF5722";
  icon.style.color = "white";

  function applyHoverEffect() {
    Cardbtn.style.background = "white";
    icon.style.color = "#FF5722";
    Cardbtn.style.boxShadow = "8px 8px 34px #DD2C003D";

    if (card) {
      card.style.background = "#FF5722";
      card.style.color = "white";
    }
  }

  function removeHoverEffect() {
    Cardbtn.style.background = "#FF5722";
    icon.style.color = "white";
    Cardbtn.style.boxShadow = "none";

    if (card) {
      card.style.background = "";
      card.style.color = "";
    }
  }

  // Hover on button
  Cardbtn.addEventListener("mouseenter", applyHoverEffect);
  Cardbtn.addEventListener("mouseleave", removeHoverEffect);

  // Hover on card body (same effect)
  if (card) {
    card.addEventListener("mouseenter", applyHoverEffect);
    card.addEventListener("mouseleave", removeHoverEffect);
  }
});




// Spaces Carousel Button

const customBtns = document.querySelectorAll(".customBtn");

customBtns.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.classList.add("active");
  });

  btn.addEventListener("mouseleave", () => {
    btn.classList.remove("active");
  });
});

// DELEGATED hover (works with cloned slides)
// Use mouseover/mouseout and check relatedTarget to avoid child-events noise
document.addEventListener("mouseover", (e) => {
  const btn = e.target.closest(".customBtn");
  if (!btn) return;

  // ignore mouseover if coming from inside the same button
  const from = e.relatedTarget;
  if (from && btn.contains(from)) return;

  btn.classList.add("active");
});

document.addEventListener("mouseout", (e) => {
  const btn = e.target.closest(".customBtn");
  if (!btn) return;

  // ignore mouseout if moving to something inside the same button
  const to = e.relatedTarget;
  if (to && btn.contains(to)) return;

  btn.classList.remove("active");
});












