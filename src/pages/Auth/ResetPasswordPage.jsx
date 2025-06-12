import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
useLocation;
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

function ResetPasswordPage() {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, error, clearError, authError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    token: token,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromQuery = queryParams.get("email");
    if (emailFromQuery) {
      setFormData((prev) => ({ ...prev, email: emailFromQuery }));
    }
    return () => clearError();
  }, [token, location.search, clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (authError) clearError();

    if (message) setMessage("");

    if (name === "confirmPassword" || name === "password") {
      const password = name === "password" ? value : formData.password;
      const confirmPassword =
        name === "confirmPassword" ? value : formData.confirmPassword;

      if (confirmPassword && password !== confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Las contraseñas no coinciden",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
    }
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un email válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!token) {
      setErrors((prev) => ({
        ...prev,
        general: "Token de recuperación inválido.",
      }));
      return;
    }

    setErrors({});
    setMessage("");

    try {
      const resetData = {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        token: token,
      };

      await authService.resetPassword(resetData);

      setMessage(
        "Contraseña restablecida exitosamente. Redirigiendo al dashboard..."
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (errorCapturado) {
      console.error(
        "Error capturado durante el intento de restablecer contraseña:",
        errorCapturado
      );

      if (!authError) {
        setErrors((prev) => ({
          ...prev,
          general:
            "Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.",
        }));
      }
    }
  };

  return (
    <section className="flex flex-col flex-grow min-h-[100dvh] items-center justify-center px-4 md:px-16 lg:px-10 2xl:px-16 bg-gradient-to-tl from-primary via-primary-dark to-background">
      <div className="w-full max-w-7xl mx-auto pt-24 lg:pt-32 pb-24 lg:pb-32 flex flex-col items-center">
        <div className="bg-background text-card-foreground p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Restablecer Contraseña
            </h1>
            <p className="text-muted-foreground mt-2">
              Ingresa tu nueva contraseña para restablecer el acceso a tu
              cuenta.
            </p>
          </div>

          {message && (
            <div className="mb-6 bg-success-50 border border-success-200 text-success px-4 py-3 rounded-md">
              <span className="block text-sm">{message}</span>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
              <span className="block text-sm">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Correo electrónico
              </Label>{" "}
              <Input
                label="Correo electrónico"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                disabled={isLoading || !!formData.email}
                readOnly
              />
              {formData.email && (
                <p className="mt-1 text-xs text-gray-500">
                  Este correo electrónico se obtuvo del enlace de recuperación.
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Nueva contraseña
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Confirmar nueva contraseña
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading || !token}
              >
                {isLoading ? "Restableciendo..." : "Restablecer contraseña"}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-foreground hover:underline"
            >
              ← Volver al inicio de sesión
            </Link>
          </div>

          <hr className="my-6 border-border" />

          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:underline"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ResetPasswordPage;
