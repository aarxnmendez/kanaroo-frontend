import { ChevronsUpDown, Settings, PlusCircle, HelpCircle } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavMenu() {
  const { isMobile } = useSidebar();

  const navMenuOptions = [
    {
      label: "Crear Nuevo Proyecto",
      icon: PlusCircle,
      action: () => console.log("Create New Project"),
    },
    {
      label: "Configuración",
      icon: Settings,
      action: () => console.log("Settings"),
    },
    {
      label: "Ayuda y Comentarios",
      icon: HelpCircle,
      action: () => console.log("Help & Feedback"),
    },
  ];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <img src="/blue.svg" alt="Logo de Kanaroo" className="h-6 w-6" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Kanaroo</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              {navMenuOptions.map((item) => (
                <DropdownMenuItem key={item.label} onClick={item.action}>
                  {item.icon && <item.icon className="mr-2 size-4" />}
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
