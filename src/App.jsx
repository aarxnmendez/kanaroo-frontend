import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStore } from "@/store/theme.store";

export function App() {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return <Outlet />;
}

export const routesConfig = [
  {
    path: "/",
    element: <App />,
  },
];
