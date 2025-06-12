function Benefits() {
  const benefits = [
    {
      icon: "⚡",
      metric: "3x",
      title: "Más Productivo",
      description: "Completa tus proyectos en un tercio del tiempo habitual",
    },
    {
      icon: "🎯",
      metric: "90%",
      title: "Menos Reuniones",
      description:
        "Mejor organización significa menos tiempo perdido en juntas",
    },
    {
      icon: "👥",
      metric: "0",
      title: "Tareas Perdidas",
      description: "Sistema de seguimiento que garantiza que nada se olvide",
    },
  ];

  return (
    <section
      id="benefits"
      className="bg-background px-4 md:px-16 lg:px-10 2xl:px-16"
    >
      <div className="max-w-7xl mx-auto py-16 md:py-20 lg:py-32">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
            ¿Por qué elegir Kanaroo?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
            Transforma la manera en que gestionas tus proyectos y alcanza tus
            metas más rápido
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative text-center 2xl:transition-all 2xl:duration-300 2xl:hover:scale-105 2xl:opacity-60 2xl:hover:opacity-100"
            >
              <div className="absolute inset-0 flex items-center justify-center text-8xl lg:text-9xl opacity-5 pointer-events-none 2xl:transition-opacity 2xl:duration-300 2xl:group-hover:opacity-20">
                {benefit.icon}
              </div>
              <div className="relative py-6">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-4 tracking-tight">
                  {benefit.metric}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed font-medium max-w-sm mx-auto">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
