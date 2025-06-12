import { Heart } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 md:px-16 lg:px-10 2xl:px-16 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="text-sm text-foreground text-center md:text-left">
            <p>&copy; {currentYear} Kanaroo. Todos los derechos reservados.</p>
            <p className="mt-1 flex items-center justify-center md:justify-start">
              Hecho con <Heart className="w-4 h-4 mx-1.5 text-primary" /> por el
              equipo de Kanaroo.
            </p>
          </div>

          <div className="flex items-center gap-x-6 md:gap-x-8">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
