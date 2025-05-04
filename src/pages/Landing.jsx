import MainLayout from "@/layouts/MainLayout";

import Hero from "@/components/landing/Hero";
import Preview from "@/components/landing/Preview";
import Benefits from "@/components/landing/Benefits";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

function Landing() {
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
