import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Users,
  HelpCircle,
  LayoutGrid,
  UserCircle,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  Menu,
  X,
  Info,
  Tickets,
} from "lucide-react";

const productFeatures = [
  {
    title: "Tareas",
    href: "/#features-tasks",
    description:
      "Organiza tus tareas en un único lugar, de simples a complejas.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-12 items-center justify-center rounded-full w-12">
        <CheckCircle className="group-hover/navlink:text-primary-foreground !h-6 !w-6" />
      </span>
    ),
  },
  {
    title: "Proyectos",
    href: "/#features-projects",
    description:
      "Gestiona tus proyectos de forma visual, flexible e intuitiva.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-12 items-center justify-center rounded-full w-12">
        <LayoutGrid className="group-hover/navlink:text-primary-foreground !h-6 !w-6" />
      </span>
    ),
  },
  {
    title: "Colaboración",
    href: "/#features-collaboration",
    description: "Conecta, comparte y avanza con tu equipo hacia objetivos.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-12 items-center justify-center rounded-full w-12">
        <Users className="group-hover/navlink:text-primary-foreground !h-6 !w-6" />
      </span>
    ),
  },
  {
    title: "Gestión del Tiempo",
    href: "/#features-time-management",
    description: "Optimiza tu día y sigue el progreso de tus actividades.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-12 items-center justify-center rounded-full w-12">
        <Clock className="group-hover/navlink:text-primary-foreground !h-6 !w-6" />
      </span>
    ),
  },
];

const resourceItems = [
  {
    title: "FAQs",
    href: "/#faq",
    description: "Encuentra respuestas rápidas a las preguntas más comunes.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-12 items-center justify-center rounded-full w-12">
        <HelpCircle className="group-hover/navlink:text-primary-foreground !h-6 !w-6" />
      </span>
    ),
  },
  {
    title: "Documentación",
    href: "/docs",
    description:
      "Explora guías detalladas y aprende a usar Kanaroo eficazmente.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-12 items-center justify-center rounded-full w-12">
        <FileText className="group-hover/navlink:text-primary-foreground !h-6 !w-6" />
      </span>
    ),
  },
  {
    title: "Contacto",
    href: "mailto:support@kanaroo.com",
    description:
      "Ponte en contacto con nuestro equipo para soporte o consultas.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-12 items-center justify-center rounded-full w-12">
        <MessageSquare className="group-hover/navlink:text-primary-foreground !h-6 !w-6" />
      </span>
    ),
  },
  {
    title: "Nuestro Equipo",
    href: "/team",
    description: "Conoce al equipo detrás de Kanaroo y nuestra misión.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-12 items-center justify-center rounded-full w-12">
        <UserCircle className="group-hover/navlink:text-primary-foreground !h-6 !w-6" />
      </span>
    ),
  },
];

const ListItem = ({ title, children, to, iconSpan, className }) => {
  const isExternalOrMailto =
    to.startsWith("https://") ||
    to.startsWith("http://") ||
    to.startsWith("mailto:");
  const isHttp = to.startsWith("https://") || to.startsWith("http://");
  const commonClasses =
    "flex flex-row focus:bg-accent focus:text-accent-foreground gap-4 group/navlink h-full hover:bg-accent hover:text-accent-foreground items-center rounded-xl w-full p-4";

  return (
    <li className={cn("h-full", className)}>
      <NavigationMenuLink asChild>
        {isExternalOrMailto ? (
          <a
            href={to}
            className={cn(commonClasses)}
            target={isHttp ? "_blank" : undefined}
            rel={isHttp ? "noopener noreferrer" : undefined}
          >
            {iconSpan}
            <div className="flex-1">
              <div className="text-base font-semibold">{title}</div>
              <p className="text-sm font-semibold text-muted-foreground/70">
                {children}
              </p>
            </div>
          </a>
        ) : (
          <Link to={to} className={cn(commonClasses)}>
            {iconSpan}
            <div className="flex-1">
              <div className="text-base font-semibold">{title}</div>
              <p className="text-sm font-semibold text-muted-foreground/70">
                {children}
              </p>
            </div>
          </Link>
        )}
      </NavigationMenuLink>
    </li>
  );
};

export function NavigationMobile() {
  return (
    <NavigationMenu
      viewport={false}
      className="lg:hidden flex max-w-none items-center h-full w-full gap-2 sm:gap-4"
    >
      <div className="flex flex-grow h-full justify-end">
        <NavigationMenuList className="h-full">
          <NavigationMenuItem className="hidden h-full xs:flex items-center">
            <Button
              variant="ghost"
              asChild
              className="px-4 py-2 text-sm sm:text-base font-semibold h-full"
            >
              <Link
                to="/login"
                className="h-full w-full flex items-center justify-center"
              >
                <span className="block">Iniciar Sesión</span>
              </Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden h-full xs:flex items-center">
            <Button
              asChild
              className="px-4 py-1.5 text-primary-foreground text-sm sm:text-base font-semibold hover:bg-primary h-full"
            >
              <Link
                to="/signup"
                className="h-full w-full flex items-center justify-start overflow-hidden"
              >
                <span className="whitespace-nowrap">Registrarse</span>
              </Link>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>

      <div className="flex h-full">
        <div className="flex items-center h-full">
          <Separator orientation="vertical" className="!h-6 bg-border/30" />
        </div>
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
                <ul className="flex flex-col gap-1">
                  <li className="px-2 text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
                    Nosotros
                  </li>
                  <ListItem
                    title="La Esencia Kanaroo"
                    to="/#hero"
                    iconSpan={
                      <span className="bg-accent flex group-hover/navlink:bg-primary h-12 items-center justify-center rounded-full w-12">
                        <Info className="group-hover/navlink:text-primary-foreground !h-6 !w-6" />
                      </span>
                    }
                  >
                    Descubre nuestra filosofía y valores.
                  </ListItem>

                  <Separator
                    orientation="horizontal"
                    className="bg-border/30 my-2"
                  />

                  <li className="px-2 text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
                    Producto
                  </li>
                  {productFeatures.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      to={item.href}
                      iconSpan={item.iconSpan}
                    >
                      {item.description}
                    </ListItem>
                  ))}

                  <Separator
                    orientation="horizontal"
                    className="bg-border/30 my-2"
                  />

                  <li className="px-2 text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
                    Recursos
                  </li>
                  {resourceItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      to={item.href}
                      iconSpan={item.iconSpan}
                    >
                      {item.description}
                    </ListItem>
                  ))}

                  <Separator
                    orientation="horizontal"
                    className="bg-border/30 my-2"
                  />

                  <li className="px-2 text-xs font-bold text-muted-foreground/40 uppercase tracking-widest">
                    Precios
                  </li>
                  <ListItem
                    title="Precios"
                    to="/#pricing"
                    iconSpan={
                      <span className="bg-accent flex group-hover/navlink:bg-primary h-12 items-center justify-center rounded-full w-12">
                        <Tickets className="group-hover/navlink:text-primary-foreground !h-6 !w-6" />
                      </span>
                    }
                  >
                    Consulta nuestros planes y tarifas.
                  </ListItem>

                  <Separator
                    orientation="horizontal"
                    className="bg-border/30 my-2 xs:hidden"
                  />

                  <div className="flex xs:hidden flex-row items-center justify-center w-full h-12 gap-2">
                    <Button
                      variant="ghost"
                      asChild
                      className="flex-1 px-4 py-2 text-base font-semibold h-full bg-accent"
                    >
                      <Link
                        to="/login"
                        className="h-full flex items-center justify-center"
                      >
                        <span className="block">Iniciar Sesión</span>
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="flex-1 px-4 py-2 text-primary-foreground text-base font-semibold hover:bg-primary h-full"
                    >
                      <Link
                        to="/signup"
                        className="h-full flex items-center justify-center"
                      >
                        <span className="whitespace-nowrap">Registrarse</span>
                      </Link>
                    </Button>
                  </div>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
