import { MoveRight, UserPlus, LayoutDashboard, Target } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Regístrate Fácilmente",
      description:
        "Crea tu cuenta en segundos y accede a todas las herramientas de Kanaroo.",
      icon: UserPlus,
    },
    {
      id: 2,
      title: "Organiza tu Mundo",
      description:
        "Empieza a crear tareas, proyectos o tableros Kanban. Personaliza todo a tu manera.",
      icon: LayoutDashboard,
    },
    {
      id: 3,
      title: "Alcanza tus Metas",
      description:
        "Disfruta de una mayor productividad y mira cómo tus proyectos se completan con eficiencia.",
      icon: Target,
    },
  ];

  const elementsToRender = [];
  steps.forEach((step, index) => {
    elementsToRender.push(
      <div
        key={step.id}
        className="flex flex-col items-center text-center p-6 bg-card border border-muted/70 rounded-xl shadow-sm"
      >
        <div className="mb-5 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
          <step.icon className="w-8 h-8" strokeWidth={2} />
        </div>
        <h3 className="text-xl xl:text-2xl font-semibold text-card-foreground mb-3 tracking-tight">
          {step.title}
        </h3>
        <p className="text-card-foreground/80 text-base leading-relaxed">
          {step.description}
        </p>
      </div>
    );

    if (index < steps.length - 1) {
      elementsToRender.push(
        <div
          key={`arrow-${index}`}
          className="hidden md:flex items-center justify-center text-primary"
        >
          <MoveRight className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={1.5} />
        </div>
      );
    }
  });

  return (
    <section className="px-4 md:px-16 lg:px-10 2xl:px-16 bg-background">
      <div className="max-w-7xl mx-auto py-16 md:py-20 lg:py-32">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Empezar con Kanaroo es Así de Sencillo
          </h2>
          <p className="text-lg lg:text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
            Sigue estos simples pasos para transformar tu productividad y
            organizar tu trabajo como nunca antes.
          </p>
        </div>
        <div
          className={`grid grid-cols-1 ${
            steps.length === 3
              ? "md:grid-cols-[1fr_auto_1fr_auto_1fr]"
              : "md:grid-cols-3"
          } gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 items-stretch`}
        >
          {elementsToRender}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
