import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils/utils";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <section
        id="not-found-section"
        className="relative flex flex-col items-center justify-center w-full px-6 py-12 sm:py-16 md:py-24 lg:py-32"
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black lg:font-extrabold text-foreground mb-3 md:mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold lg:font-bold text-center text-foreground mb-2 md:mb-4">
          Página no encontrada
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-secondary text-center mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 w-9/10 max-w-md">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Button
          variant="default"
          size="sm"
          onClick={() => navigate("/")}
          className={cn(
            "md:hidden shadow-lg shadow-primary/20 font-medium cursor-pointer",
            "transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1",
            "relative overflow-hidden group"
          )}
        >
          <span className="relative z-10 flex items-center">
            Regresar al inicio
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
        </Button>
        <Button
          variant="default"
          size="lg"
          onClick={() => navigate("/")}
          className={cn(
            "hidden md:flex shadow-lg shadow-primary/20 font-medium cursor-pointer",
            "transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1",
            "relative overflow-hidden group"
          )}
        >
          <span className="relative z-10 flex items-center">
            Regresar al inicio
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
        </Button>
      </section>
    </MainLayout>
  );
}

export default NotFound;
