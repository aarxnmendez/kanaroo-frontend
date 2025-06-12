import React from "react";

const DocumentationPage = () => {
  return (
    <section className="bg-background text-foreground px-4 md:px-16 lg:px-10 2xl:px-16 flex flex-col flex-grow min-h-[80dvh]">
      <div className="max-w-7xl mx-auto pt-30 md:pt-35 lg:pt-48 2xl:pt-56 pb-16 md:pb-24 lg:pb-32 flex flex-col flex-grow items-center justify-center text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
          🚧 Documentación en Construcción 🚧
        </h1>
        <p className="text-lg sm:text-xl text-foreground max-w-2xl">
          Estamos trabajando arduamente para traerte una documentación completa
          y detallada. ¡Vuelve pronto!
        </p>
      </div>
    </section>
  );
};

export default DocumentationPage;
