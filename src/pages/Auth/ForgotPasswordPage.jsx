import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (emailError) setEmailError("");
    if (error) setError("");
    if (message) setMessage("");

    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Ingresa un email válido");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("El email es requerido");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Ingresa un email válido");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      await authService.forgotPassword(email);
      setMessage(
        "Se ha enviado un enlace de recuperación a tu email. Revisa tu bandeja de entrada."
      );
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors?.email) {
        setError(err.response.data.errors.email[0]);
      } else {
        setError(
          "Error al enviar el email de recuperación. Inténtalo de nuevo."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col flex-grow min-h-[100dvh] items-center justify-center px-4 md:px-16 lg:px-10 2xl:px-16 bg-gradient-to-tl from-primary via-primary-dark to-background">
      <div className="w-full max-w-7xl mx-auto pt-24 lg:pt-32 pb-24 lg:pb-32 flex flex-col items-center">
        <div className="bg-background text-card-foreground p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Recuperar Contraseña
            </h1>
            <p className="text-muted-foreground mt-2">
              Ingresa tu email y te enviaremos un enlace para restablecer tu
              contraseña.
            </p>
          </div>

          {message && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
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
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                className={emailError ? "border-destructive" : ""}
              />
              {emailError && (
                <p className="text-sm text-destructive mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading || !!emailError || !email}
              >
                {isLoading ? "Enviando..." : "Enviar enlace de recuperación"}
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

export default ForgotPasswordPage;
