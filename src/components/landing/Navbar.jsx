import { Link } from "react-router-dom";
import { NavigationDesktop } from "@/components/landing/NavigationDesktop";
import { NavigationMobile } from "@/components/landing/NavigationMobile";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-10 w-full flex flex-col items-center justify-stretch pt-4 pb-0 px-4 md:pt-9 md:pb-0 md:px-16 lg:pt-5 lg:pb-0 lg:px-10 2xl:pt-9 2xl:pb-0 2xl:px-16">
      <div className="flex h-14 p-1 max-w-7xl relative w-full 2xl:h-12 2xl:justify-start hover:shadow-lg dark:hover:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.1),_0_4px_6px_-4px_rgba(255,255,255,0.1)] transition-shadow duration-300 rounded-xl">
        <div className="h-full flex items-center">
          <Link
            to="/"
            className="flex items-center gap-x-2 w-full py-1 px-4 hover:scale-105 transition-transform duration-200"
          >
            <img
              src="/blue.svg"
              alt="Kanaroo Logo"
              className="h-5 xs:h-6 2xl:h-5 w-auto"
            />
            <span className="font-bold text-lg xs:text-xl 2xl:text-lg text-foreground">
              Kanaroo
            </span>
          </Link>
        </div>
        <NavigationDesktop />
        <NavigationMobile />
      </div>
    </header>
  );
}

export default Navbar;
