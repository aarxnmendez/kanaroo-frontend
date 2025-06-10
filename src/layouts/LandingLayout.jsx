import { Outlet } from "react-router-dom";
import Navbar from "@/components/landing/Navbar.jsx";
//import Footer from '@/components/landing/home/Footer.jsx';

const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-full min-w-full bg-background text-foreground">
      <Navbar />
      <main className="flex flex-col">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default LandingLayout;
