const arrow = document.querySelector('.rotArrow');
arrow.style.transform = 'rotate(180deg)';



const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");


const leftArrow = document.querySelector('.prevBtnDark');
leftArrow.style.transform = 'rotate(180deg)';
leftArrow.style.display = 'none';

const rightArrow = document.querySelector('.nextBtnDark');
rightArrow.style.display = 'none';


    nextBtn.addEventListener('click', () => {
  rightArrow.style.display = 'block';
  nextBtn.style.display = 'none';
  leftArrow.style.display = 'none';
  prevBtn.style.display = 'block';
});

prevBtn.addEventListener('click', () => {
  leftArrow.style.display = 'block';
  prevBtn.style.display = 'none';
  rightArrow.style.display = 'none';
    nextBtn.style.display = 'block';
}); 





     //Spaces Carousel

      const track = document.querySelector(".carousel-track");


      function getSlideWidth() {
        return track.querySelector(".slider").offsetWidth;
      }
      let isMoving = false;

      function updateActiveSlide() {
        // Remove old active
        Array.from(track.children).forEach((slide) => {
          slide.style.transition = "transform 0.5s ease, opacity 0.5s ease";
          slide.style.transform = "scale(1)"; // reset
          slide.style.transition = "transform 0.5s ease-in-out"
          // slide.style.opacity = "0.5"; // dull background slides
        });

        // Default: 2nd slide is active
        let activeIndex = 1;
        // On small screens, 1st slide should be active
        if (window.innerWidth <= 768) {
          activeIndex = 0;
        }

        const activeSlide = track.children[activeIndex];
        if (activeSlide) {
          activeSlide.style.transform = "scale(1.1)";
          // activeSlide.style.opacity = "1"; // clear & focused
        }
      }

      //  Next button
      nextBtn.addEventListener("click", () => {
        if (isMoving) return;
        isMoving = true;
        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(-${slideWidth}px)`;
        track.style.transition = "transform 0.5s ease-in-out";

        track.addEventListener(
          "transitionend",
          () => {
            track.appendChild(track.firstElementChild); // move first to last
            track.style.transition = "none"; //. prevent the reset transition effect
            track.style.transform = "translateX(0)"; //moving 1 slide at a time
            updateActiveSlide(); // ✅ update immediately after reorder
            isMoving = false;
          },
          { once: true }
        );
      });




        rightArrow.addEventListener("click", () => {
        if (isMoving) return;
        isMoving = true;
        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(-${slideWidth}px)`;
        track.style.transition = "transform 0.5s ease-in-out";

        track.addEventListener(
          "transitionend",
          () => {
            track.appendChild(track.firstElementChild); // move first to last
            track.style.transition = "none"; //. prevent the reset transition effect
            track.style.transform = "translateX(0)"; //moving 1 slide at a time
            updateActiveSlide(); // ✅ update immediately after reorder
            isMoving = false;
          },
          { once: true }
        );
      });

      //  Prev button
      prevBtn.addEventListener("click", () => {
        if (isMoving) return; // prevent double click
        isMoving = true;
        const slideWidth = getSlideWidth();
        track.insertBefore(track.lastElementChild, track.firstElementChild);
        track.style.transition = "none";
        track.style.transform = `translateX(-${slideWidth}px)`; // shift immediately left

        // Step 2: Animate back to 0
        requestAnimationFrame(() => {
          track.style.transition = "transform 0.5s ease-in-out";
          track.style.transform = "translateX(0)";
        });
        track.addEventListener(
          "transitionend",
          () => {
            updateActiveSlide(); // ✅ update here too

            isMoving = false; // unlock again
          },
          { once: true }
        );
      });

            leftArrow.addEventListener("click", () => {
        if (isMoving) return; // prevent double click
        isMoving = true;
        const slideWidth = getSlideWidth();
        track.insertBefore(track.lastElementChild, track.firstElementChild);
        track.style.transition = "none";
        track.style.transform = `translateX(-${slideWidth}px)`; // shift immediately left

        // Step 2: Animate back to 0
        requestAnimationFrame(() => {
          track.style.transition = "transform 0.5s ease-in-out";
          track.style.transform = "translateX(0)";
        });
        track.addEventListener(
          "transitionend",
          () => {
            updateActiveSlide(); // ✅ update here too

            isMoving = false; // unlock again
          },
          { once: true }
        );
      });

      updateActiveSlide();
      window.addEventListener("resize", updateActiveSlide); // resize the active slide index 1 on 768> larger screens






    // facilties carousel



     const num = document.querySelector(".indicator-num");
    num.style.transform = "rotate(270deg)";
    num.style.transformOrigin = "center";

    const trackFacility = document.querySelector(".carousel-facility");
    const indicators = document.querySelectorAll(".custom-indicator");
    const buttons = document.querySelectorAll(".indicate-btn");
    let isMoving2 = false;

    function getSlidersWidth() {
      return trackFacility.querySelector(".slide-facility").offsetWidth;
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

    // 👉 Shared function for movement
    function goToSlide(i) {
      if (isMoving2 || i === currentIndex) return;
      isMoving2 = true;

      const slideWidth = getSlidersWidth();
      let diff = i - currentIndex;

      if (diff > 0) {
        trackFacility.style.transition = "transform 0.5s ease-in-out";
        trackFacility.style.transform = `translateY(-${slideWidth * diff}px)`;

        trackFacility.addEventListener(
          "transitionend",
          () => {
            for (let j = 0; j < diff; j++) {
              trackFacility.appendChild(trackFacility.firstElementChild);
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
        diff = Math.abs(diff);
        for (let j = 0; j < diff; j++) {
          trackFacility.insertBefore(
            trackFacility.lastElementChild,
            trackFacility.firstElementChild
          );
        }
        trackFacility.style.transition = "none";
        trackFacility.style.transform = `translateY(-${slideWidth * diff}px)`;

        requestAnimationFrame(() => {
          trackFacility.style.transition = "transform 0.5s ease-in-out";
          trackFacility.style.transform = "translateY(0)";
        });

        trackFacility.addEventListener(
          "transitionend",
          () => {
            currentIndex = i;
            updateIndicators();
            isMoving2 = false;
          },
          { once: true }
        );
      }
    }

    // 👉 Click events for indicators and buttons
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

    galleryArrowright.style.transform = "rotate(180deg)";
    prevBtnGallery.style.transform = "rotate(180deg)";
    prevBtnGallery.style.display = "none";
    nextBtnGallery.style.display = "none";

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

    // Get width of a single slide
    function getGallerySlideWidth() {
      return GalleryTrack.querySelector(".gallery-slide").offsetWidth;
    }

    // Adjust active slide height
    function updateActiveHeightSlide() {
      Array.from(GalleryTrack.children).forEach((slide) => {
        slide.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        slide.style.height = "297.12px";
      });

      let activeIndex = window.innerWidth <= 768 ? 0 : 1;
      const activeSlide = GalleryTrack.children[activeIndex];
      if (activeSlide) activeSlide.style.height = "532px";
    }

    // -----------------------
    // Function: Move NEXT ▶️
    // -----------------------
    function moveNext(toggleButtons = false) {
      if (isMoving3) return;
      isMoving3 = true;

      const slideWidth = getGallerySlideWidth();
      GalleryTrack.style.transition = "transform 0.5s ease-in-out";
      GalleryTrack.style.transform = `translateX(-${slideWidth}px)`;

      GalleryTrack.addEventListener(
        "transitionend",
        () => {
          GalleryTrack.appendChild(GalleryTrack.firstElementChild);
          GalleryTrack.style.transition = "none";
          GalleryTrack.style.transform = "translateX(0)";
          updateActiveHeightSlide();
          isMoving3 = false;
        },
        { once: true }
      );
    }

    // -----------------------
    // Function: Move PREV ◀️
    // -----------------------
    function movePrev(toggleButtons = false) {
      if (isMoving3) return;
      isMoving3 = true;

      const slideWidth = getGallerySlideWidth();
      GalleryTrack.insertBefore(
        GalleryTrack.lastElementChild,
        GalleryTrack.firstElementChild
      );

      GalleryTrack.style.transition = "none";
      GalleryTrack.style.transform = `translateX(-${slideWidth}px)`;

      requestAnimationFrame(() => {
        GalleryTrack.style.transition = "transform 0.5s ease-in-out";
        GalleryTrack.style.transform = "translateX(0)";
      });

      GalleryTrack.addEventListener(
        "transitionend",
        () => {
          updateActiveHeightSlide();
          isMoving3 = false;
        },
        { once: true }
      );
    }

    // -----------------------
    // Attach listeners
    // -----------------------
    galleryArrowright.addEventListener("click", () => moveNext(true)); // toggles btns + moves next
    nextBtnGallery.addEventListener("click", () => moveNext()); // moves next only
    prevGallery.addEventListener("click", () => movePrev(true)); // toggles btns + moves prev
    prevBtnGallery.addEventListener("click", () => movePrev()); // moves prev only

    // Initialize
    updateActiveHeightSlide();
    window.addEventListener("resize", updateActiveHeightSlide);





    // Customer Carousel 


      const nextCustomer = document.querySelector(".next-customer");
      const prevBtnCustomer = document.querySelector(".prevBtnCustomer");
      const nextBtnCustomer = document.querySelector(".nextBtnCustomer");
      const prevCustomer = document.querySelector(".prev-customer");
      const CustomerTrack = document.querySelector(".customer-carousel-track");

      nextCustomer.style.transform = "rotate(180deg)";
      prevBtnCustomer.style.transform = "rotate(180deg)";
      prevBtnCustomer.style.display = "none";
      nextBtnCustomer.style.display = "none";

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

      function getCustomerSlideWidth() {
        return CustomerTrack.querySelector(".customer-slide").offsetWidth;
      }

      let isMoving4 = false;

      // ✅ NEXT button
      nextCustomer.addEventListener("click", () => {
        if (isMoving4) return;
        isMoving4 = true;

        const slideWidth = getCustomerSlideWidth();
        CustomerTrack.style.transform = `translateX(-${slideWidth}px)`;
        CustomerTrack.style.transition = "transform 0.5s ease-in-out";

        CustomerTrack.addEventListener(
          "transitionend",
          () => {
            CustomerTrack.appendChild(CustomerTrack.firstElementChild); // ✅ fixed reference
            CustomerTrack.style.transition = "none";
            CustomerTrack.style.transform = "translateX(0)";
            isMoving4 = false;
          },
          { once: true }
        );
      });

      nextBtnCustomer.addEventListener("click", () => {
        if (isMoving4) return;
        isMoving4 = true;

        const slideWidth = getCustomerSlideWidth();
        CustomerTrack.style.transform = `translateX(-${slideWidth}px)`;
        CustomerTrack.style.transition = "transform 0.5s ease-in-out";

        CustomerTrack.addEventListener(
          "transitionend",
          () => {
            CustomerTrack.appendChild(CustomerTrack.firstElementChild); // ✅ fixed reference
            CustomerTrack.style.transition = "none";
            CustomerTrack.style.transform = "translateX(0)";
            isMoving4 = false;
          },
          { once: true }
        );
      });

      // ✅ PREV button
      prevCustomer.addEventListener("click", () => {
        if (isMoving4) return;
        isMoving4 = true;

        const slideWidth = getCustomerSlideWidth();
        CustomerTrack.insertBefore(
          CustomerTrack.lastElementChild,
          CustomerTrack.firstElementChild
        );

        CustomerTrack.style.transition = "none";
        CustomerTrack.style.transform = `translateX(-${slideWidth}px)`;

        requestAnimationFrame(() => {
          CustomerTrack.style.transition = "transform 0.5s ease-in-out";
          CustomerTrack.style.transform = "translateX(0)";
        });

        CustomerTrack.addEventListener(
          "transitionend",
          () => {
            isMoving4 = false;
          },
          { once: true }
        );
      });

      prevBtnCustomer.addEventListener("click", () => {
        if (isMoving4) return;
        isMoving4 = true;

        const slideWidth = getCustomerSlideWidth();
        CustomerTrack.insertBefore(
          CustomerTrack.lastElementChild,
          CustomerTrack.firstElementChild
        );

        CustomerTrack.style.transition = "none";
        CustomerTrack.style.transform = `translateX(-${slideWidth}px)`;

        requestAnimationFrame(() => {
          CustomerTrack.style.transition = "transform 0.5s ease-in-out";
          CustomerTrack.style.transform = "translateX(0)";
        });

        CustomerTrack.addEventListener(
          "transitionend",
          () => {
            isMoving4 = false;
          },
          { once: true }
        );
      });
