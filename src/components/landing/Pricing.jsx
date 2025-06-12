import { CheckCircle } from "lucide-react";

function Pricing() {
  const freeTierFeatures = [
    "Gestión de tareas ilimitadas",
    "Creación de proyectos y tableros Kanban",
    "Gestión de miembros ilimitados",
    "Sincronización entre dispositivos",
    "Acceso a todas las funcionalidades actuales",
    "¡Y mucho más por venir!",
  ];

  return (
    <section
      id="pricing"
      className="px-4 md:px-16 lg:px-10 2xl:px-16 bg-background"
    >
      <div className="max-w-7xl mx-auto py-16 md:py-20 lg:py-32">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
            Accede a Kanaroo Totalmente Gratis
          </h2>
          <p className="text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Queremos que experimentes todo el poder de Kanaroo sin barreras.
            Todas las funcionalidades están disponibles para ti de forma
            completamente gratuita. ¡Aprovecha para organizar tu vida y
            proyectos como nunca antes!
          </p>
        </div>

        <div className="max-w-xl mx-auto mt-10 lg:mt-12 p-8 rounded-xl bg-card border border-muted/70">
          <h3 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-8 tracking-tight">
            Plan Gratuito
          </h3>
          <ul className="space-y-4 flex flex-col items-start md:items-center">
            {freeTierFeatures.map((feature, index) => (
              <li key={index} className="flex items-start w-auto">
                <CheckCircle className="h-6 w-6 text-success mr-3 flex-shrink-0 mt-1" />
                <span className="text-lg text-foreground leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
