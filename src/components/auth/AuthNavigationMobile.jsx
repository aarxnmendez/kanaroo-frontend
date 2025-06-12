import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function AuthNavigationMobile() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavigationMenu
      viewport={false}
      className="lg:hidden flex max-w-none items-center h-full w-full"
    >
      <div className="hidden sm:flex flex-grow h-full justify-end items-center gap-x-3">
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

      <div className="flex sm:hidden h-full w-full justify-end">
        <NavigationMenuList className="h-full">
          <NavigationMenuItem className="h-full flex items-center">
            <NavigationMenuTrigger
              className={cn(
                "h-full flex items-center justify-center p-2.5",
                "[&>svg.ml-1]:hidden",
                "relative group"
              )}
            >
              <Menu
                className={cn(
                  "h-5 w-5 xs:h-6 xs:w-6 transition-all duration-100 ease-in-out",
                  "group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90 group-data-[state=open]:scale-75"
                )}
                aria-hidden="true"
              />
              <X
                className={cn(
                  "h-5 w-5 xs:h-6 xs:w-6 absolute transition-all duration-100 ease-in-out",
                  "group-data-[state=closed]:opacity-0 group-data-[state=closed]:-rotate-90 group-data-[state=closed]:scale-75",
                  "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-0 group-data-[state=open]:scale-100"
                )}
                aria-hidden="true"
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!mt-3 -right-1 md:right-0 py-4 absolute w-auto">
              <div className="w-[calc(100vw-32px-16px-4px)] md:w-[400px] max-h-[calc(100vh-16px-56px-12px-50px)] md:max-h-[calc(100vh-36px-56px-12px-50px)] overflow-y-auto">
                <ul className="flex flex-col gap-1 p-2">
                  <li>
                    <a
                      href="mailto:support@kanaroo.com"
                      className="block p-3 text-base font-medium hover:bg-accent rounded-md w-full text-left"
                    >
                      Contactar a soporte
                    </a>
                  </li>
                  <li>
                    {currentPath === "/signup" ? (
                      <Link
                        to="/login"
                        className="block p-3 text-base font-medium hover:bg-accent rounded-md w-full text-left"
                      >
                        Iniciar Sesión
                      </Link>
                    ) : currentPath === "/login" ? (
                      <Link
                        to="/signup"
                        className="block p-3 text-base font-medium hover:bg-accent rounded-md w-full text-left"
                      >
                        Registrarse
                      </Link>
                    ) : null}
                  </li>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
