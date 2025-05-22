import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import MainLayout from "@/layouts/MainLayout";

import Hero from "@/components/landing/Hero";
import Preview from "@/components/landing/Preview";
import Benefits from "@/components/landing/Benefits";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

function Landing() {
  // Initialize Lenis for smooth scroll on this page only
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      window.lenis = lenis; // Optional: make it globally available if other components on this page need it
    }
    // Cleanup function to destroy Lenis instance when component unmounts
    return () => {
      if (lenis) {
        lenis.destroy();
        window.lenis = null; // Optional: clear global instance
      }
    };
  }, [lenis]);

  return (
    <>
      <MainLayout>
        <Hero />
        <Preview />
        <Benefits />
        <VelocityScroll
          defaultVelocity={3}
          numRows={2}
          className="text-xl md:text-3xl lg:text-4xl font-thin text-center text-muted-foreground w-9/10 lg:w-3/4 py-12 md:py-24 lg:py-32"
        >
          Organiza tu vida. Potencia tu trabajo. Logra tus metas.
        </VelocityScroll>
      </MainLayout>
    </>
  );
}

export default Landing;
