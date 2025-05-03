import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { MagicCard } from "@/components/magicui/magic-card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Clock, LineChart, CheckCircle, Brain } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    Icon: Clock,
    name: "Aumenta tu productividad",
    description: "Reduce el tiempo de gestión y organización.",
    href: "#",
    cta: "Descubrir",
    className: "col-span-1 md:col-span-2 xl:col-span-1 row-span-1",
    background: (
      <DotPattern
        className="absolute inset-0 opacity-10 [mask-image:radial-gradient(250px_250px_at_center,white,transparent_70%)]"
        width={20}
        height={20}
        radius={1}
        strength={0.6}
      />
    ),
  },
  {
    Icon: CheckCircle,
    name: "Nunca olvides una tarea",
    description: "Mantén todo bajo control y completa tus objetivos.",
    href: "#",
    cta: "Organizar",
    className: "col-span-1 md:col-span-2 xl:col-span-1 row-span-1",
    background: (
      <DotPattern
        className="absolute inset-0 opacity-10 [mask-image:radial-gradient(250px_250px_at_center,white,transparent_70%)]"
        width={20}
        height={20}
        radius={1}
        strength={0.6}
      />
    ),
  },
  {
    Icon: Brain,
    name: "Claridad mental",
    description:
      "Olvídate de fechas límite. Ten todo organizado en un solo lugar.",
    href: "#",
    cta: "Más info",
    className: "col-span-1 md:col-span-2 xl:col-span-1 row-span-1",
    background: (
      <DotPattern
        className="absolute inset-0 opacity-10 [mask-image:radial-gradient(250px_250px_at_center,white,transparent_70%)]"
        width={20}
        height={20}
        radius={1}
        strength={0.6}
      />
    ),
  },
  {
    Icon: LineChart,
    name: "Toma mejores decisiones",
    description: "Visualiza tu progreso y ajusta tu estrategia.",
    href: "#",
    cta: "Analizar",
    className: "col-span-1 md:col-span-2 xl:col-span-1 row-span-1",
    background: (
      <DotPattern
        className="absolute inset-0 opacity-10 [mask-image:radial-gradient(250px_250px_at_center,white,transparent_70%)]"
        width={20}
        height={20}
        radius={1}
        strength={0.6}
      />
    ),
  },
];

function Benefits() {
  return (
    <>
      <section
        id="benefits-section"
        className="relative flex flex-col items-center justify-center w-full py-8 lg:py-16 overflow-hidden"
      >
        {/* Benefits */}
        <div className="relative w-9/10 lg:w-3/4 mx-auto">
          <div className="flex flex-col items-center justify-center mb-8 text-center">
            <BlurFade inView="true" duration={0.6} delay={0.1} offset={10}>
              <Badge variant="outline" className="mb-2 md:mb-4">
                Beneficios
              </Badge>
            </BlurFade>
            <BlurFade inView="true" duration={0.6} delay={0.2} offset={10}>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold lg:font-bold text-center text-foreground mb-2 md:mb-4">
                Haz más. Piensa menos
              </h2>
            </BlurFade>
            <BlurFade inView="true" duration={0.6} delay={0.3} offset={10}>
              <p className="text-xs sm:text-sm md:text-base text-secondary mx-auto">
                Ventajas reales para tu día a día, sin complicaciones.
              </p>
            </BlurFade>
          </div>
          <BentoGrid className="grid-cols-1 md:grid-cols-4 lg:grid-cols-4 auto-rows-[9.5rem] md:auto-rows-[11rem] lg:auto-rows-[12rem] xl:auto-rows-[14rem] gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className={cn(benefit.className, "overflow-hidden rounded-xl")}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: -2,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 1,
                  delay: 0.9 + index * 0.08,
                  duration: 0.5,
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <MagicCard
                  gradientSize={150}
                  gradientOpacity={1}
                  gradientColor={
                    index === 0
                      ? "rgba(59, 130, 246, 0.4)"
                      : index === 1
                      ? "rgba(16, 185, 129, 0.4)"
                      : index === 2
                      ? "rgba(245, 158, 11, 0.4)"
                      : "rgba(239, 68, 68, 0.4)"
                  }
                  gradientFrom="transparent"
                  gradientTo="transparent"
                  className="h-full"
                >
                  <BentoCard
                    Icon={benefit.Icon}
                    name={benefit.name}
                    description={benefit.description}
                    href={benefit.href}
                    cta={benefit.cta}
                    background={benefit.background}
                    hoverColor={
                      index === 0
                        ? "rgb(59, 130, 246)"
                        : index === 1
                        ? "rgb(16, 185, 129)"
                        : index === 2
                        ? "rgb(245, 158, 11)"
                        : "rgb(239, 68, 68)"
                    }
                    className="h-full"
                  />
                </MagicCard>
              </motion.div>
            ))}
          </BentoGrid>
        </div>
      </section>
    </>
  );
}

export default Benefits;
