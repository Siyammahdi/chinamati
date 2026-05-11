import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6, // how smooth the scroll feels
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // spring-like effect
      smoothWheel: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
