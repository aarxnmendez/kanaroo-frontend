import MainLayout from "@/layouts/MainLayout";

import Hero from "@/components/landing/Hero";
import Preview from "@/components/landing/Preview";

function Landing() {
  return (
    <>
      <MainLayout>
        <Hero />
        <Preview />
      </MainLayout>
    </>
  );
}

export default Landing;
