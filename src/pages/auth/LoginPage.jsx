import MainLayout from "@/layouts/MainLayout";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <MainLayout>
      <LoginForm />
    </MainLayout>
  );
}
