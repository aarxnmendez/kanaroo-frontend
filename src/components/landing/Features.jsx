function Features() {
  return (
    <section id="features" className="px-4 md:px-16 lg:px-10 2xl:px-16">
      <div className="max-w-7xl w-full lg:w-4/5 mx-auto py-16 md:py-20 lg:py-32">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
            Todo lo que necesitas para ser más productivo
          </h2>
          <p className="text-lg lg:text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
            Herramientas poderosas para personas y equipos que buscan
            eficiencia, organización y mejores resultados
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6 xl:grid-rows-[auto_auto_1fr] xl:items-stretch">
          <div
            id="features-tasks"
            className="xl:col-span-3 group bg-card border border-muted/70 rounded-2xl p-6 md:p-8 xl:p-10 shadow-sm dark:shadow-white/10 hover:shadow-lg hover:dark:shadow-white/20 transition-all duration-300 hover:-translate-y-1 min-h-fit @container"
          >
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-start md:gap-8 h-full">
              <div className="flex-1 min-w-0 overflow-hidden">
                <h3 className="text-xl xl:text-2xl font-bold text-card-foreground mb-2 md:mb-3 xl:mb-4 tracking-tight">
                  Tu centro de control personal
                </h3>
                <p className="text-base text-card-foreground leading-relaxed">
                  Organiza tus tareas en un único lugar, de simples a complejas.
                  Etiqueta y completa con facilidad.
                </p>
              </div>
              <div className="w-3/5 min-w-[200px] mx-auto aspect-square md:w-3/5 lg:w-2/3 md:order-first flex-shrink-0 xl:min-w-0 2xl:aspect-[3/2] bg-muted rounded-xl md:rounded-2xl flex items-center justify-center text-muted-foreground/50">
                <span className="text-xs md:text-sm">
                  Screenshot de gestión de tareas
                </span>
              </div>
            </div>
          </div>
          <div className="group bg-card border border-muted/70 rounded-2xl p-6 md:p-8 xl:p-10 shadow-sm dark:shadow-white/10 hover:shadow-lg hover:dark:shadow-white/20 transition-all duration-300 hover:-translate-y-1 min-h-fit @container">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-start md:gap-6 xl:flex-col h-full">
              <div className="flex-1 min-w-0 overflow-hidden">
                <h3 className="text-xl xl:text-2xl font-bold text-card-foreground mb-2 md:mb-3 tracking-tight">
                  Tus datos protegidos
                </h3>
                <p className="text-base text-card-foreground leading-relaxed">
                  Encriptación avanzada y máxima privacidad para mantener tu
                  información personal completamente segura.
                </p>
              </div>
              <div className="w-2/5 min-w-[200px] aspect-[4/3] xl:w-[70%] h-auto flex-shrink-0 xl:min-w-0 xl:order-first xl:@md:aspect-[3/2] xl:@sm:aspect-[4/3] bg-muted rounded-xl md:rounded-2xl flex items-center justify-center text-muted-foreground/50 xl:max-w-none">
                <span className="text-xs md:text-sm">Seguridad Demo</span>
              </div>
            </div>
          </div>
          <div className="group bg-card border border-muted/70 rounded-2xl p-6 md:p-8 xl:p-10 shadow-sm dark:shadow-white/10 hover:shadow-lg hover:dark:shadow-white/20 transition-all duration-300 hover:-translate-y-1 min-h-fit overflow-hidden @container">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-start md:gap-6 xl:flex-col h-full">
              <div className="flex-1 min-w-0 overflow-hidden xl:flex-shrink-0">
                <h3 className="text-xl xl:text-2xl font-bold text-card-foreground mb-2 md:mb-3 tracking-tight">
                  Enfocate en lo importante
                </h3>
                <p className="text-base text-card-foreground leading-relaxed">
                  Establece niveles de prioridad para tus tareas.
                </p>
              </div>
              <div className="w-1/2 min-w-[200px] aspect-[4/3] md:order-first xl:min-w-0 xl:w-full flex-shrink-0 xl:@md:aspect-[4/3] xl:@sm:aspect-[5/4] bg-muted rounded-xl md:rounded-2xl flex items-center justify-center text-muted-foreground/50 xl:max-w-none">
                <span className="text-xs md:text-sm">Prioridades Demo</span>
              </div>
            </div>
          </div>
          <div
            id="features-projects"
            className="xl:col-span-3 group bg-card border border-muted/70 rounded-2xl p-6 md:p-8 xl:p-10 shadow-sm dark:shadow-white/10 hover:shadow-lg hover:dark:shadow-white/20 transition-all duration-300 hover:-translate-y-1 min-h-fit @container"
          >
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-start md:gap-8 h-full">
              <div className="flex-1 min-w-0 overflow-hidden">
                <h3 className="text-xl xl:text-2xl font-bold text-card-foreground mb-2 md:mb-3 xl:mb-4 tracking-tight">
                  Gestiona proyectos visualmente
                </h3>
                <p className="text-base text-card-foreground leading-relaxed">
                  Organiza tus proyectos con tableros Kanban intuitivos.
                  Visualiza el progreso de cada tarea de forma clara y
                  eficiente.
                </p>
              </div>
              <div className="w-3/5 min-w-[200px] mx-auto aspect-square md:w-3/5 lg:w-2/3 md:order-first flex-shrink-0 xl:min-w-0 2xl:aspect-[3/2] bg-muted rounded-xl md:rounded-2xl flex items-center justify-center text-muted-foreground/50">
                <span className="text-xs md:text-sm">Kanban Demo</span>
              </div>
            </div>
          </div>
          <div
            id="features-collaboration"
            className="xl:col-span-3 group bg-card border border-muted/70 rounded-2xl p-6 md:p-8 xl:p-10 shadow-sm dark:shadow-white/10 hover:shadow-lg hover:dark:shadow-white/20 transition-all duration-300 hover:-translate-y-1 xl:h-auto @container"
          >
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-start md:gap-8 h-full">
              <div className="flex-1 min-w-0 overflow-hidden">
                <h3 className="text-xl xl:text-2xl font-bold text-card-foreground mb-2 md:mb-3 xl:mb-4 tracking-tight">
                  Colabora sin fronteras
                </h3>
                <p className="text-base text-card-foreground leading-relaxed">
                  Conecta con tu equipo desde cualquier parte del mundo. Trabaja
                  en tiempo real, comparte proyectos y mantén a todos
                  sincronizados sin importar la zona horaria.
                </p>
              </div>
              <div className="w-3/5 min-w-[200px] mx-auto aspect-square md:w-3/5 lg:w-2/3 flex-shrink-0 xl:min-w-0 2xl:aspect-[4/3] bg-muted rounded-xl md:rounded-2xl flex items-center justify-center text-muted-foreground/50">
                <span className="text-xs md:text-sm">Colaboración Demo</span>
              </div>
            </div>
          </div>
          <div
            id="features-time-management"
            className="group bg-card border border-muted/70 rounded-2xl p-6 md:p-8 xl:p-10 shadow-sm dark:shadow-white/10 hover:shadow-lg hover:dark:shadow-white/20 transition-all duration-300 hover:-translate-y-1 xl:h-auto @container"
          >
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-start md:gap-6 xl:flex-col h-full">
              <div className="flex-1 min-w-0 overflow-hidden">
                <h3 className="text-xl xl:text-2xl font-bold text-card-foreground mb-2 md:mb-3 tracking-tight">
                  Domina tu tiempo
                </h3>
                <p className="text-base text-card-foreground leading-relaxed">
                  Optimiza tu día y sigue el progreso de tus actividades.
                </p>
              </div>
              <div className="w-2/5 min-w-[200px] aspect-[4/3] xl:w-[70%] h-auto flex-shrink-0 xl:min-w-0 xl:order-first xl:@md:aspect-square xl:@sm:aspect-[5/4] bg-muted rounded-xl md:rounded-2xl flex items-center justify-center text-muted-foreground/50 xl:max-w-none">
                <span className="text-xs md:text-sm">Timer Demo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
