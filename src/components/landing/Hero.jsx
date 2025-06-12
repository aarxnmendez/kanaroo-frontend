import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section
      id="hero"
      className="bg-background text-foreground px-4 md:px-16 lg:px-10 2xl:px-16"
    >
      <div className="max-w-7xl mx-auto pt-30 md:pt-35 lg:pt-48 2xl:pt-56 pb-16 md:pb-24 lg:pb-32">
        <div className="grid grid-cols-1 gap-y-12 md:gap-y-16 items-center">
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground">
              Salta hacia la eficiencia
              <br />
              con cada clic
            </h1>
            <p className="text-md max-w-lg">
              Organiza. Planifica. Avanza.
              <br className="block xs:hidden" /> Todo bajo control.
            </p>
            <Button
              asChild
              className="pl-3 pr-1.5 py-1.5 text-sm sm:pl-4 sm:pr-2 sm:py-2 md:pl-5 md:pr-2 md:py-2 sm:text-base font-semibold text-primary-foreground hover:bg-primary h-full w-fit rounded-lg"
            >
              <Link
                to="/signup"
                className="group h-full flex items-center overflow-hidden"
              >
                <span className="flex items-center gap-2 md:gap-3">
                  <span className="whitespace-nowrap">Empieza gratis!</span>
                  <span className="relative flex w-7 h-7 md:w-8 md:h-8 bg-background text-primary rounded-lg shrink-0 items-center justify-center overflow-hidden">
                    <ArrowRight
                      className="absolute size-3.5 md:size-4 transition-all duration-200 ease-in-out group-hover:translate-x-20"
                      strokeWidth={3}
                    />
                    <ArrowRight
                      className="absolute size-3.5 md:size-4 transition-all duration-200 ease-in-out -translate-x-20 group-hover:translate-x-0"
                      strokeWidth={3}
                    />
                  </span>
                </span>
              </Link>
            </Button>
          </div>

          <div className="relative w-full max-w-7xl mx-auto">
            <AspectRatio
              ratio={16 / 9}
              className="bg-card rounded-3xl shadow-lg max-w-5xl mx-auto border-5 lg:border-7 2xl:border-8 border-foreground/20"
            >
              <div className="flex items-center justify-center h-full">
                <span className="text-sm text-muted-foreground">
                  Image Placeholder (16:9)
                </span>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
