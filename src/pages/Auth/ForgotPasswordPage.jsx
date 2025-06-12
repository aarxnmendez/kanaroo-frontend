import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  forgotPasswordSchema,
  validateField,
  validateForm,
} from "@/lib/validations";

function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleValidation = (name, value) => {
    const error = validateField(name, value, undefined, forgotPasswordSchema);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    handleValidation(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    handleValidation(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: formErrors } = validateForm(
      formData,
      forgotPasswordSchema
    );
    setErrors(formErrors);

    if (isValid) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="flex flex-col flex-grow min-h-[100dvh] items-center justify-center px-4 md:px-16 lg:px-10 2xl:px-16 bg-gradient-to-r from-primary via-primary-dark to-background">
      <div className="w-full max-w-7xl mx-auto pt-24 lg:pt-32 pb-24 lg:pb-32 flex flex-col items-center">
        <div className="bg-background text-card-foreground p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Recuperar Contraseña
            </h1>
            <p className="text-muted-foreground mt-2">
              Ingresa tu correo electrónico y te enviaremos un enlace para
              restablecer tu contraseña.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center">
              <p className="text-foreground mb-4">
                Si una cuenta con el correo electrónico{" "}
                <strong>{formData.email}</strong> existe, hemos enviado un
                enlace de recuperación. Por favor, revisa tu bandeja de entrada
                (y la carpeta de spam).
              </p>
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Volver a Iniciar Sesión
              </Link>
            </div>
          ) : (
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
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <Button type="submit" className="w-full cursor-pointer">
                  Enviar Enlace de Recuperación
                </Button>
              </div>
            </form>
          )}

          {!isSubmitted && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              ¿Recordaste tu contraseña?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Iniciar Sesión
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
