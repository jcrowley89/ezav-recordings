import { useRef } from "react";

export function usePresentation(slides, currentSlide) {
    const presCanvasRef = useRef(document.createElement("canvas"));
    const presCanvasCtx = presCanvasRef.current.getContext("2d");

    function drawSlide(n) {
        const slideWrappers = document.querySelectorAll(".slide-wrapper");
        slideWrappers.forEach((e) => e.classList.remove("active"));
        slideWrappers[n].classList.add("active");
        currentSlide.current = n;
        const allSlides = document.querySelectorAll(".slide");
        presCanvasCtx.globalAlpha = 0;
        let newSlide = allSlides[n];
        newSlide.classList.add("active");
        function fadeIn() {
          if (presCanvasCtx.globalAlpha >= 0.9) {
            presCanvasCtx.globalAlpha = 1;
            presCanvasCtx.drawImage(newSlide, 0, 0);
          } else {
            presCanvasCtx.globalAlpha += 0.05;
            presCanvasCtx.drawImage(newSlide, 0, 0);
            requestAnimationFrame(fadeIn);
          }
        }
        requestAnimationFrame(fadeIn);
      }

  return [presCanvasRef, drawSlide];
}