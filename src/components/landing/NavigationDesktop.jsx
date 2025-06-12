import { Link } from "react-router-dom";
import {
  Users,
  HelpCircle,
  LayoutGrid,
  UserCircle,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const productFeatures = [
  {
    title: "Tareas",
    href: "/#features-tasks",
    description:
      "Organiza tus tareas en un único lugar, de simples a complejas.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-8 items-center justify-center rounded-full w-8">
        <CheckCircle className="group-hover/navlink:text-primary-foreground" />
      </span>
    ),
  },
  {
    title: "Proyectos",
    href: "/#features-projects",
    description:
      "Gestiona tus proyectos de forma visual, flexible e intuitiva.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-8 items-center justify-center rounded-full w-8">
        <LayoutGrid className="group-hover/navlink:text-primary-foreground" />
      </span>
    ),
  },
  {
    title: "Colaboración",
    href: "/#features-collaboration",
    description: "Conecta, comparte y avanza con tu equipo hacia objetivos.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-8 items-center justify-center rounded-full w-8">
        <Users className="group-hover/navlink:text-primary-foreground" />
      </span>
    ),
  },
  {
    title: "Gestión del Tiempo",
    href: "/#features-time-management",
    description: "Optimiza tu día y sigue el progreso de tus actividades.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-8 items-center justify-center rounded-full w-8">
        <Clock className="group-hover/navlink:text-primary-foreground" />
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
      <span className="bg-accent flex group-hover/navlink:bg-primary h-8 items-center justify-center rounded-full w-8">
        <HelpCircle className="group-hover/navlink:text-primary-foreground" />
      </span>
    ),
  },
  {
    title: "Documentación",
    href: "/docs",
    description:
      "Explora guías detalladas y aprende a usar Kanaroo eficazmente.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-8 items-center justify-center rounded-full w-8">
        <FileText className="group-hover/navlink:text-primary-foreground" />
      </span>
    ),
  },
  {
    title: "Contacto",
    href: "mailto:support@kanaroo.com",
    description:
      "Ponte en contacto con nuestro equipo para soporte o consultas.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-8 items-center justify-center rounded-full w-8">
        <MessageSquare className="group-hover/navlink:text-primary-foreground" />
      </span>
    ),
  },
  {
    title: "Nuestro Equipo",
    href: "/team",
    description: "Conoce al equipo detrás de Kanaroo y nuestra misión.",
    iconSpan: (
      <span className="bg-accent flex group-hover/navlink:bg-primary h-8 items-center justify-center rounded-full w-8">
        <UserCircle className="group-hover/navlink:text-primary-foreground" />
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
    "flex flex-row focus:bg-accent focus:text-accent-foreground gap-2 group/navlink h-full hover:bg-accent hover:text-accent-foreground items-center rounded-xl w-full";

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
              <div className="text-sm font-semibold">{title}</div>
              <p className="text-[13px] font-semibold text-muted-foreground/70">
                {children}
              </p>
            </div>
          </a>
        ) : (
          <Link to={to} className={cn(commonClasses)}>
            {iconSpan}
            <div className="flex-1">
              <div className="text-sm font-semibold">{title}</div>
              <p className="text-[13px] font-semibold text-muted-foreground/70">
                {children}
              </p>
            </div>
          </Link>
        )}
      </NavigationMenuLink>
    </li>
  );
};

export function NavigationDesktop() {
  return (
    <NavigationMenu
      viewport={false}
      className="hidden lg:flex max-w-none items-center justify-start h-full w-full"
    >
      <div className="flex flex-grow h-full">
        <div className="flex items-center h-full">
          <Separator orientation="vertical" className="!h-6 bg-border/30" />
        </div>
        <NavigationMenuList className="h-full">
          <NavigationMenuItem className="h-full flex items-center">
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "text-base 2xl:text-sm font-semibold h-full flex items-center"
              )}
            >
              <Link to="/#benefits">La Esencia Kanaroo</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="h-full flex items-center">
            <NavigationMenuTrigger className="text-base 2xl:text-sm font-semibold h-full flex items-center">
              Producto
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!mt-3">
              <div className="w-[360px] xl:w-[550px]">
                <ul className="flex flex-col gap-1 xl:grid xl:grid-cols-2">
                  {productFeatures.map((feature) => (
                    <ListItem
                      key={feature.title}
                      title={feature.title}
                      to={feature.href}
                      iconSpan={feature.iconSpan}
                    >
                      {feature.description}
                    </ListItem>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="h-full flex items-center">
            <NavigationMenuTrigger className="text-base 2xl:text-sm font-semibold h-full flex items-center">
              Recursos
            </NavigationMenuTrigger>
            <NavigationMenuContent className="!mt-3">
              <div className="w-[275px]">
                <ul className="flex flex-col gap-1">
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
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="h-full flex items-center">
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "text-base 2xl:text-sm font-semibold h-full flex items-center"
              )}
            >
              <Link to="/#pricing">Precios</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>

      <div className="flex flex-grow h-full justify-end">
        <div className="flex items-center h-full">
          <Separator orientation="vertical" className="!h-6 bg-border/30" />
        </div>
        <NavigationMenuList className="flex items-center gap-2 h-full">
          <NavigationMenuItem className="h-full flex items-center">
            <Button
              variant="ghost"
              asChild
              className="group/login relative overflow-hidden px-4 py-2 text-base 2xl:text-sm font-semibold h-full"
            >
              <Link
                to="/login"
                className="h-full w-full flex items-center justify-center"
              >
                <span className="block transition-transform duration-200 ease-in-out 2xl:group-hover/login:translate-y-8">
                  Iniciar Sesión
                </span>
                <span className="absolute hidden transition-transform duration-200 ease-in-out 2xl:block 2xl:-translate-y-8 2xl:group-hover/login:translate-y-0">
                  Iniciar Sesión
                </span>
              </Link>
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem className="h-full flex items-center">
            <Button
              asChild
              className="group/signup relative px-4 2xl:px-1.5 py-1.5 text-primary-foreground text-base 2xl:text-sm font-semibold hover:bg-primary 2xl:!w-29.5 h-full"
            >
              <Link
                to="/signup"
                className="h-full w-full flex items-center justify-start overflow-hidden"
              >
                <span className="flex items-center transition-transform duration-200 ease-in-out translate-x-0 2xl:-translate-x-[84px] 2xl:group-hover/signup:translate-x-0">
                  <span className="whitespace-nowrap 2xl:mr-1.5">
                    Registrarse
                  </span>
                  <span className="w-6 h-6 bg-background text-primary rounded-md shrink-0 hidden items-center justify-center 2xl:flex">
                    <ArrowRight className="size-4" strokeWidth={3} />
                  </span>
                  <span className="whitespace-nowrap ml-1.5 hidden 2xl:inline">
                    Registrarse
                  </span>
                </span>
              </Link>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
