import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);

    const handleStorageChange = () => {
      const currentToken = localStorage.getItem("authToken");
      setIsAuthenticated(!!currentToken);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleDashboardNavigation = () => navigate("/dashboard");
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  const Logo = () => {
    const logoSrc = "/blue.svg";
    return (
      <Link
        to="/"
        className="flex items-center text-foreground transition-colors"
      >
        <img src={logoSrc} alt="Logo de Kanaroo" className="h-7 w-auto" />
        <span className="ml-2 text-xl font-bold self-center">Kanaroo</span>
      </Link>
    );
  };

  const navLinks = [
    { label: "Características", path: "/#features" },
    { label: "Precios", path: "/#pricing" },
    { label: "Nosotros", path: "/#about" },
  ];

  return (
    <nav className="bg-background/60 backdrop-blur-md sticky top-0 z-50 w-full border-b border-border/90">
      <div className="w-9/10 lg:w-3/4 mx-auto relative h-16 flex items-center">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2 md:space-x-3 ml-auto">
          <div className="hidden lg:flex items-center space-x-2 md:space-x-3">
            {isAuthenticated ? (
              <Button
                variant="default"
                size="sm"
                onClick={handleDashboardNavigation}
                className="cursor-pointer"
              >
                Ir al Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                  className="cursor-pointer"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleRegister}
                  className="cursor-pointer"
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir menú principal"
                >
                  <MenuIcon size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-3/4 max-w-xs p-6 flex flex-col"
              >
                <SheetHeader className="mb-6 p-0">
                  <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navega por las secciones principales del sitio o accede a tu
                    cuenta.
                  </SheetDescription>
                  <SheetClose asChild>
                    <Link
                      to="/"
                      className="flex items-center text-foreground transition-colors"
                    >
                      <img
                        src="/blue.svg"
                        alt="Logo de Kanaroo"
                        className="h-7 w-auto"
                      />
                    </Link>
                  </SheetClose>
                </SheetHeader>

                <div className="flex flex-col space-y-2 mb-auto">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <Link
                        to={link.path}
                        className="block py-2 rounded-md text-base font-medium text-foreground hover:bg-accent"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <div className="mt-auto">
                  <hr className="my-4 border-border" />
                  <div className="flex flex-col space-y-3">
                    {isAuthenticated ? (
                      <SheetClose asChild>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleDashboardNavigation}
                          className="w-full cursor-pointer"
                        >
                          Ir al Dashboard
                        </Button>
                      </SheetClose>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogin}
                            className="w-full justify-center cursor-pointer p-0"
                          >
                            Iniciar Sesión
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={handleRegister}
                            className="w-full cursor-pointer"
                          >
                            Registrarse
                          </Button>
                        </SheetClose>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
