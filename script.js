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

    //   const track = document.querySelector(".carousel-track");


    //   function getSlideWidth() {
    //     return track.querySelector(".slider").offsetWidth;
    //   }
    //   let isMoving = false;

    //   function updateActiveSlide() {
    //     // Remove old active
    //     Array.from(track.children).forEach((slide) => {
    //       slide.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    //       slide.style.transform = "scale(1)"; // reset
    //       slide.style.transition = "transform 0.5s ease-in-out"
    //       // slide.style.opacity = "0.5"; // dull background slides
    //     });

    //     // Default: 2nd slide is active
    //     let activeIndex = 1;
    //     // On small screens, 1st slide should be active
    //     if (window.innerWidth <= 768) {
    //       activeIndex = 0;
    //     }

    //     const activeSlide = track.children[activeIndex];
    //     if (activeSlide) {
    //       activeSlide.style.transform = "scale(1.1)";
    //       // activeSlide.style.opacity = "1"; // clear & focused
    //     }
    //   }

    //   //  Next button
    //   nextBtn.addEventListener("click", () => {
    //     if (isMoving) return;
    //     isMoving = true;
    //     const slideWidth = getSlideWidth();
    //     track.style.transform = `translateX(-${slideWidth}px)`;
    //     track.style.transition = "transform 0.5s ease-in-out";

    //     track.addEventListener(
    //       "transitionend",
    //       () => {
    //         track.appendChild(track.firstElementChild); // move first to last
    //         track.style.transition = "none"; //. prevent the reset transition effect
    //         track.style.transform = "translateX(0)"; //moving 1 slide at a time
    //         updateActiveSlide(); // ✅ update immediately after reorder
    //         isMoving = false;
    //       },
    //       { once: true }
    //     );
    //   });




    //     rightArrow.addEventListener("click", () => {
    //     if (isMoving) return;
    //     isMoving = true;
    //     const slideWidth = getSlideWidth();
    //     track.style.transform = `translateX(-${slideWidth}px)`;
    //     track.style.transition = "transform 0.5s ease-in-out";

    //     track.addEventListener(
    //       "transitionend",
    //       () => {
    //         track.appendChild(track.firstElementChild); // move first to last
    //         track.style.transition = "none"; //. prevent the reset transition effect
    //         track.style.transform = "translateX(0)"; //moving 1 slide at a time
    //         updateActiveSlide(); // ✅ update immediately after reorder
    //         isMoving = false;
    //       },
    //       { once: true }
    //     );
    //   });

    //   //  Prev button
    //   prevBtn.addEventListener("click", () => {
    //     if (isMoving) return; // prevent double click
    //     isMoving = true;
    //     const slideWidth = getSlideWidth();
    //     track.insertBefore(track.lastElementChild, track.firstElementChild);
    //     track.style.transition = "none";
    //     track.style.transform = `translateX(-${slideWidth}px)`; // shift immediately left

    //     // Step 2: Animate back to 0
    //     requestAnimationFrame(() => {
    //       track.style.transition = "transform 0.5s ease-in-out";
    //       track.style.transform = "translateX(0)";
    //     });
    //     track.addEventListener(
    //       "transitionend",
    //       () => {
    //         updateActiveSlide(); // ✅ update here too

    //         isMoving = false; // unlock again
    //       },
    //       { once: true }
    //     );
    //   });

    //         leftArrow.addEventListener("click", () => {
    //     if (isMoving) return; // prevent double click
    //     isMoving = true;
    //     const slideWidth = getSlideWidth();
    //     track.insertBefore(track.lastElementChild, track.firstElementChild);
    //     track.style.transition = "none";
    //     track.style.transform = `translateX(-${slideWidth}px)`; // shift immediately left

    //     // Step 2: Animate back to 0
    //     requestAnimationFrame(() => {
    //       track.style.transition = "transform 0.5s ease-in-out";
    //       track.style.transform = "translateX(0)";
    //     });
    //     track.addEventListener(
    //       "transitionend",
    //       () => {
    //         updateActiveSlide(); // ✅ update here too

    //         isMoving = false; // unlock again
    //       },
    //       { once: true }
    //     );
    //   });

    //   updateActiveSlide();
    //   window.addEventListener("resize", updateActiveSlide); // resize the active slide index 1 on 768> larger screens



