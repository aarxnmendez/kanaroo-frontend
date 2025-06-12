import { Outlet } from "react-router-dom";
import Navbar from "@/components/landing/Navbar.jsx";
import Footer from "@/components/landing/Footer.jsx";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const LandingLayout = () => {
  useSmoothScroll(80);

  return (
    <div className="flex flex-col min-h-full min-w-full bg-background text-foreground">
      <Navbar />
      <main className="flex flex-col flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
