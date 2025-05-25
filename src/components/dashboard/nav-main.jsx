"use client";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils/utils";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const location = useLocation();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = location.pathname === item.url;

        return (
          <SidebarMenuItem key={item.title} asChild>
            <Link
              to={item.url}
              className={cn(
                "flex items-center gap-2 px-2 h-8 rounded-md cursor-pointer text-sm",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.title}</span>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
