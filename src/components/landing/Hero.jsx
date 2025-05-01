import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/magicui/particles";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ArrowRight } from "lucide-react";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="hero-section"
      className="relative flex flex-col items-center justify-center w-full py-16 md:py-24 lg:py-32 bg-background"
    >
      <div className="absolute inset-0 z-0 opacity-80">
        <Particles
          className="w-full h-full"
          quantity={100}
          staticity={10}
          ease={100}
          size={1}
          color="#3b82f6"
        />
      </div>
      <div className="relative z-10 text-center w-full mx-auto">
        <BlurFade duration={0.6} delay={0.1} offset={10}>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black lg:font-extrabold text-foreground mb-3 md:mb-4">
            Ordena. Crea. <br />
            Salta más alto.
          </h1>
        </BlurFade>

        <BlurFade duration={0.6} delay={0.2} offset={10}>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xs sm:max-w-sm md:max-w-md mb-6 md:mb-8 mx-auto">
            Un espacio diseñado para que avances sin ruido.
          </p>
        </BlurFade>

        <BlurFade duration={0.6} delay={0.3} offset={10}>
          <div className="flex gap-3 md:gap-4 justify-center">
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate("/register")}
              className={cn(
                "md:hidden shadow-lg shadow-primary/20 font-medium cursor-pointer",
                "transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1",
                "relative overflow-hidden group"
              )}
            >
              <span className="relative z-10 flex items-center">
                ¡Empieza Gratis Ahora!
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate("/register")}
              className={cn(
                "hidden md:flex shadow-lg shadow-primary/20 font-medium cursor-pointer",
                "transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1",
                "relative overflow-hidden group"
              )}
            >
              <span className="relative z-10 flex items-center">
                ¡Empieza Gratis Ahora!
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

export default Hero;
