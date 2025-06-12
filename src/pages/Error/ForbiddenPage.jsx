import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ForbiddenPage() {
  return (
    <section className="flex flex-col flex-grow min-h-[100dvh] items-center justify-center px-4 md:px-16 lg:px-10 2xl:px-16 bg-background text-foreground">
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          403 - Acceso Denegado
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Lo sentimos, no tienes los permisos necesarios para acceder a este
          recurso.
        </p>
        <Button asChild>
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </section>
  );
}

export default ForbiddenPage;
