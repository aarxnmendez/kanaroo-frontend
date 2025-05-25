"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/store/user.store";
import { apiClient } from "@/lib/apiClient";

// Función para generar iniciales
const getInitials = (name) => {
  if (!name || typeof name !== "string") return "NN"; // NN por No Name o Not Available
  const words = name.split(" ").filter(Boolean); // Dividir por espacio y filtrar vacíos
  if (words.length === 0) return "NN";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  // Tomar la primera letra de la primera palabra y la primera de la segunda
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};

export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const { clearUser } = useUserStore();

  // Generar iniciales si el usuario existe y tiene nombre
  const initials = user && user.name ? getInitials(user.name) : "NN";

  // Asumimos que user.avatar puede ser undefined o una cadena vacía si no hay avatar
  const avatarSrc = user && user.avatar ? user.avatar : undefined;

  const handleLogout = async () => {
    try {
      // Opcional: Llamar al endpoint de logout del backend
      // Asegúrate de que tu backend tiene un endpoint POST /logout
      // y que apiClient está configurado para manejarlo (ej. enviar token CSRF si es necesario para Sanctum web)
      await apiClient.post("/logout");
      console.log("Logout successful on server");
    } catch (error) {
      console.error(
        "Error during server logout:",
        error.response || error.message || error
      );
      // Continuar con el logout del frontend incluso si el del servidor falla
    }

    clearUser(); // Limpiar datos del usuario en el store de Zustand
    localStorage.removeItem("authToken"); // Eliminar token de localStorage
    navigate("/"); // Redirigir a la landing page
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={avatarSrc}
                  alt={user && user.name ? user.name : "User avatar"}
                />
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user && user.name}
                </span>
                <span className="truncate text-xs">{user && user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={avatarSrc}
                    alt={user && user.name ? user.name : "User avatar"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user && user.name}
                  </span>
                  <span className="truncate text-xs">{user && user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={handleLogout}
              className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
