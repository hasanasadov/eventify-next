import { useEffect, useRef } from "react";

export default function useBackgroundBlur() {
  const bgRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const MAX_BLUR_PX = 20;
    const MAX_SCALE = 1.03;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const blur = Math.min(y / 50, MAX_BLUR_PX);
        const scale = 1 + Math.min(y / 1000, MAX_SCALE - 1);
        bg.style.filter = `blur(${blur}px)`;
        bg.style.transform = `scale(${scale})`;
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return bgRef;
}
