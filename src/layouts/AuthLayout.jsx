import { Outlet } from "react-router-dom";
import AuthNavbar from "@/components/auth/AuthNavbar";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-full min-w-full bg-background text-foreground">
      <AuthNavbar />
      <main className="flex flex-col flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
