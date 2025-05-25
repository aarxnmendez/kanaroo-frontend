import { useEffect, useState } from "react";
import { Outlet, useMatches } from "react-router-dom";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { NavActions } from "@/components/dashboard/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TaskEditModal } from "@/components/modals/TaskEditModal";
import { useTaskModalStore } from "@/store/taskModal.store";
import { useUserStore } from "@/store/user.store";

export function AppLayout() {
  const matches = useMatches();
  const { isTaskModalOpen } = useTaskModalStore();
  const {
    fetchCurrentUser,
    currentUser,
    isLoadingUser,
    errorUser,
    fetchUserProjects,
    isLoadingProjects,
    projects,
    errorProjects,
  } = useUserStore();

  useEffect(() => {
    if (!currentUser && !isLoadingUser) {
      fetchCurrentUser().then((userData) => {
        if (userData) {
          if (!isLoadingProjects) {
            fetchUserProjects();
          }
        }
      });
    } else if (
      currentUser &&
      !isLoadingProjects &&
      projects.length === 0 &&
      !errorProjects
    ) {
      fetchUserProjects();
    }
  }, [
    currentUser,
    isLoadingUser,
    fetchCurrentUser,
    projects,
    errorProjects,
    isLoadingProjects,
    fetchUserProjects,
  ]);

  const routeSpecificMatch = matches.findLast(
    (match) => match.handle && match.handle.title
  );
  const pageTitle = routeSpecificMatch
    ? routeSpecificMatch.handle.title
    : "Kanaroo";

  if ((isLoadingUser || isLoadingProjects) && !currentUser) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (errorUser && !currentUser) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p>Error al cargar datos del usuario: {errorUser}</p>
        <p>
          Por favor, intenta{" "}
          <a href="/login" onClick={() => localStorage.removeItem("authToken")}>
            iniciar sesión
          </a>{" "}
          de nuevo.
        </p>
      </div>
    );
  }

  if (!currentUser && !isLoadingUser && !errorUser) {
    // Esto podría indicar que el token ya no es válido o el usuario fue eliminado.
    // Redirigir a login o mostrar un mensaje. ProtectedRoute debería manejar esto,
    // pero una comprobación aquí puede ser útil.
    // console.warn("AppLayout: No hay currentUser, isLoadingUser es false y no hay errorUser. ProtectedRoute debería haber actuado.");
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3 bg-background z-10">
            <div className="flex flex-1 items-center gap-2">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1 text-base font-medium">
                      {pageTitle}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto">
              <NavActions />
            </div>
          </header>
          <main
            className={`flex-1 overflow-y-auto overflow-x-hidden p-4 transition-all duration-300 ease-in-out ${
              isTaskModalOpen ? "filter blur-sm pointer-events-none" : ""
            }`}
          >
            <Outlet />
          </main>
          <TaskEditModal />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
