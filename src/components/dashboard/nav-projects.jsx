import {
  MoreHorizontal,
  Edit3,
  Settings,
  Trash2,
  Copy,
  Users,
  Eye,
  FolderPlus,
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils/utils";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const MAX_PROJECTS_VISIBLE = 8;

export function NavProjects({ projects }) {
  const isMobile = useIsMobile();
  const [openProjectMenuId, setOpenProjectMenuId] = useState(null);
  const location = useLocation();

  const handleProjectAction = (action, projectId) => {
    console.log(`Acción: ${action}, Proyecto ID: ${projectId}`);
    setOpenProjectMenuId(null);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="flex items-center justify-between w-full">
          <span>Proyectos</span>
          <div
            className="h-6 w-6 p-0 rounded-sm flex items-center justify-center cursor-pointer hover:text-foreground transition-colors"
            onClick={() => console.log("Solicitud para añadir nuevo proyecto")}
            aria-label="Añadir nuevo proyecto"
          >
            <FolderPlus className="h-4 w-4" />
          </div>
        </div>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {projects.slice(0, MAX_PROJECTS_VISIBLE).map((project) => {
            const isMenuOpen = openProjectMenuId === project.id;
            const projectUrl = `/dashboard/projects/${project.id}`;
            const isLinkActive = location.pathname === projectUrl;

            return (
              <SidebarMenuItem
                key={project.id}
                asChild
                className={`group/item rounded-md`}
              >
                <Link
                  to={`/dashboard/projects/${project.id}`}
                  onClick={() => {
                    if (isMenuOpen) setOpenProjectMenuId(null);
                  }}
                  className={cn(
                    "flex items-center justify-between px-2 h-8 rounded-md cursor-pointer text-sm w-full",
                    isLinkActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <span className={`truncate`}>{project.name}</span>

                  <div
                    className={`flex-shrink-0 flex items-center transition-opacity z-10 ${
                      isMobile
                        ? "opacity-100"
                        : isMenuOpen
                        ? "opacity-100"
                        : "opacity-0 group-hover/item:opacity-100"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <DropdownMenu
                      open={isMenuOpen}
                      onOpenChange={(isOpen) => {
                        if (isOpen) {
                          setOpenProjectMenuId(project.id);
                        } else {
                          if (openProjectMenuId === project.id) {
                            setOpenProjectMenuId(null);
                          }
                        }
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-6 w-6 p-0 rounded-sm cursor-pointer",
                            isLinkActive
                              ? isMenuOpen
                                ? "bg-foreground/20 text-primary-foreground"
                                : "!text-primary-foreground hover:!text-primary-foreground hover:!bg-transparent"
                              : isMenuOpen
                              ? "text-accent-foreground bg-accent"
                              : "text-foreground group-hover/item:text-accent-foreground hover:bg-accent"
                          )}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">
                            Abrir menú del proyecto
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align={!isMobile ? "start" : "end"}
                        side={!isMobile ? "right" : "bottom"}
                        sideOffset={5}
                        className="w-48"
                      >
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectAction("rename", project.id);
                          }}
                        >
                          <Edit3 className="mr-2 h-4 w-4" />
                          <span>Renombrar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectAction("properties", project.id);
                          }}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Propiedades</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectAction("duplicate", project.id);
                          }}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicar Proyecto</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectAction("share", project.id);
                          }}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          <span>Compartir Proyecto</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectAction("delete", project.id);
                          }}
                          className="text-destructive hover:!bg-destructive/10 hover:!text-destructive focus:!bg-destructive/10 focus:!text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Eliminar Proyecto</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Link>
              </SidebarMenuItem>
            );
          })}
          {projects.length > MAX_PROJECTS_VISIBLE && (
            <SidebarMenuItem asChild>
              <Link
                to="/dashboard/projects"
                className="group/showall flex items-center justify-between text-sm px-2 h-8 rounded-md cursor-pointer hover:bg-accent"
              >
                <span className="text-sidebar-foreground/70 group-hover/showall:text-accent-foreground group-hover/showall:opacity-100 transition-opacity duration-150">
                  Ver todos
                </span>
                <div className="h-6 w-6 flex items-center justify-center">
                  <Eye className="h-4 w-4 text-foreground/70 opacity-70 group-hover/showall:text-accent-foreground group-hover/showall:opacity-100 transition-opacity duration-150" />
                </div>
              </Link>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
