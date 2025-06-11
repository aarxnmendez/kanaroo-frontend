import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function FinalCTA() {
  return (
    <section className="px-4 md:px-16 lg:px-10 2xl:px-16 bg-background py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto bg-card rounded-[60px] p-12 sm:p-16 md:p-24 lg:p-32 shadow-xl text-center min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex flex-col justify-center items-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-10 md:mb-12 tracking-tight">
          ¿Listo para Organizar tu Vida y Proyectos?
        </h2>
        <Button
          asChild
          className="pl-4 pr-2 py-2 text-base sm:pl-5 sm:pr-2.5 sm:py-2.5 md:pl-6 md:pr-3 md:py-3 sm:text-lg md:text-xl font-semibold text-primary-foreground hover:bg-primary h-full w-fit rounded-xl"
        >
          <Link
            to="/signup"
            className="group h-full flex items-center overflow-hidden"
          >
            <span className="flex items-center gap-3 md:gap-4">
              <span className="whitespace-nowrap">Empieza Gratis Ahora</span>
              <span className="relative flex w-8 h-8 md:w-10 md:h-10 bg-background text-primary rounded-lg shrink-0 items-center justify-center overflow-hidden">
                <ArrowRight
                  className="absolute size-4 md:size-5 transition-all duration-200 ease-in-out group-hover:translate-x-24"
                  strokeWidth={3}
                />
                <ArrowRight
                  className="absolute size-4 md:size-5 transition-all duration-200 ease-in-out -translate-x-24 group-hover:translate-x-0"
                  strokeWidth={3}
                />
              </span>
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default FinalCTA;
