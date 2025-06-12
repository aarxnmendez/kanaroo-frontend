import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/theme.store";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const iconSize = "!h-5 !w-5";

  return (
    <div className="bg-foreground rounded-full px-2 py-1.5 flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full h-8 w-12 hover:bg-muted/80 cursor-pointer ${
          theme === "system"
            ? "bg-accent/20 text-background hover:text-background hover:!bg-accent/20"
            : "text-muted-foreground hover:bg-accent/10 hover:text-muted-foreground dark:hover:bg-accent/10"
        }`}
        onClick={() => setTheme("system")}
        aria-label="Usar tema del sistema"
      >
        <Laptop className={iconSize} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full h-8 w-12 hover:bg-muted/80 cursor-pointer ${
          theme === "light"
            ? "bg-accent/20 text-background hover:text-background hover:bg-accent/20"
            : "text-muted-foreground hover:bg-accent/10 hover:text-muted-foreground dark:hover:bg-accent/10"
        }`}
        onClick={() => setTheme("light")}
        aria-label="Cambiar a tema claro"
      >
        <Sun className={iconSize} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full h-8 w-12 hover:bg-muted/80 cursor-pointer ${
          theme === "dark"
            ? "bg-accent/20 text-background hover:text-background hover:bg-accent/20"
            : "text-muted-foreground hover:bg-accent/10 hover:text-muted-foreground dark:hover:bg-accent/10"
        }`}
        onClick={() => setTheme("dark")}
        aria-label="Cambiar a tema oscuro"
      >
        <Moon className={iconSize} />
      </Button>
    </div>
  );
}
