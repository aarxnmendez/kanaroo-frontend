import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useSmoothScroll(offset = 0) {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.hash) {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash, location.key, offset]);
}
