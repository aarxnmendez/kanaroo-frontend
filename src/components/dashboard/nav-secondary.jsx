import * as React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, MonitorSmartphone } from "lucide-react";
import { useThemeStore } from "@/store/theme.store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function NavSecondary({ items, className, ...props }) {
  const { theme, resolvedTheme, setTheme } = useThemeStore();

  const themeOptions = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Oscuro", icon: Moon },
    { value: "system", label: "Sistema", icon: MonitorSmartphone },
  ];

  let CurrentThemeIcon = MonitorSmartphone;
  if (resolvedTheme === "light") CurrentThemeIcon = Sun;
  if (resolvedTheme === "dark") CurrentThemeIcon = Moon;

  return (
    <SidebarGroup className={className} {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="mt-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start px-2"
                >
                  <CurrentThemeIcon className="mr-2 size-4" />
                  <span className="text-xs">Tema</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={4}
                className="w-[var(--radix-dropdown-menu-trigger-width)]"
              >
                {themeOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={theme === option.value ? "bg-accent" : ""}
                  >
                    <option.icon className="mr-2 size-4" />
                    <span className="text-xs">{option.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          {items &&
            items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="sm">
                  <Link to={item.url}>
                    {item.icon && <item.icon className="mr-2 size-4" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
