import {
  Home,
  Inbox,
  ListChecks,
  LifeBuoy,
  Send,
  Briefcase,
} from "lucide-react";

import { NavMenu } from "@/components/dashboard/nav-menu";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavProjects } from "@/components/dashboard/nav-projects";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/store/user.store";

// TODO: Replace with actual data fetching or props in a real application.
// This is placeholder/mock data for demonstration purposes.
const placeholderData = {
  navMain: [
    {
      title: "Inicio",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Bandeja de entrada",
      url: "/dashboard/inbox",
      icon: Inbox,
      badge: "10",
    },
    {
      title: "Tareas",
      url: "/dashboard/my-tasks",
      icon: ListChecks,
    },
    {
      title: "Proyectos",
      url: "/dashboard/projects",
      icon: Briefcase,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const {
    currentUser,
    projects: storeProjects,
    isLoadingProjects,
    errorProjects,
  } = useUserStore();

  // Ensure projects is always an array for internal logic and for passing to NavProjects
  const projects = Array.isArray(storeProjects) ? storeProjects : [];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <NavMenu />
        <NavMain items={placeholderData.navMain} />
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        {isLoadingProjects ? (
          <div className="p-4 text-center text-xs text-muted-foreground">
            Cargando proyectos...
          </div>
        ) : errorProjects ? (
          <div className="p-4 text-center text-xs text-destructive">
            Error al cargar proyectos.
          </div>
        ) : (
          <NavProjects projects={projects} />
        )}
        {!isLoadingProjects && !errorProjects && projects.length === 0 && (
          <div className="px-4 pt-0 pb-4 text-center text-xs text-muted-foreground">
            No hay proyectos disponibles.
          </div>
        )}
      </SidebarContent>
      <SidebarFooter className="p-2 border-t">
        <NavSecondary items={placeholderData.navSecondary} className="p-0" />
        {currentUser && <NavUser user={currentUser} />}
      </SidebarFooter>
    </Sidebar>
  );
}
