import { Link, useLocation } from "react-router-dom";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

export function AuthNavigationDesktop() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavigationMenu
      viewport={false}
      className="hidden lg:flex max-w-none items-center justify-start h-full w-full"
    >
      <div className="flex flex-grow h-full justify-end items-center gap-x-3">
        <a
          href="mailto:support@kanaroo.com"
          className="text-sm font-semibold hover:underline px-2 py-2 flex items-center"
        >
          Contactar a soporte
        </a>
        <Separator orientation="vertical" className="!h-6 bg-border/30" />
        {currentPath === "/signup" ? (
          <Link
            to="/login"
            className="text-sm font-semibold hover:underline px-2 py-2 flex items-center"
          >
            Iniciar Sesión
          </Link>
        ) : currentPath === "/login" ? (
          <Link
            to="/signup"
            className="text-sm font-semibold hover:underline px-2 py-2 flex items-center"
          >
            Registrarse
          </Link>
        ) : null}
      </div>
    </NavigationMenu>
  );
}
