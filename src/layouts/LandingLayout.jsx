import { Outlet } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar.jsx';
//import Footer from '@/components/landing/home/Footer.jsx';

const LandingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default LandingLayout;
