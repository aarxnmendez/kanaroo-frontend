import MainLayout from "@/layouts/MainLayout";

import Hero from "@/components/landing/Hero";
import Preview from "@/components/landing/Preview";
import Benefits from "@/components/landing/Benefits";

function Landing() {
  return (
    <>
      <MainLayout>
        <Hero />
        <Preview />
        <Benefits />
      </MainLayout>
    </>
  );
}

export default Landing;
