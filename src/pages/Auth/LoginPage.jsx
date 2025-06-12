import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { loginSchema, validateField, validateForm } from "@/lib/validations";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleValidation = (name, value) => {
    const error = validateField(name, value, undefined, loginSchema);
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
    const { isValid, errors: formErrors } = validateForm(formData, loginSchema);
    setErrors(formErrors);

    if (isValid) {
      console.log("Formulario de login válido, enviando datos:", formData);
    }
  };

  return (
    <section className="flex flex-col flex-grow min-h-[100dvh] items-center justify-center px-4 md:px-16 lg:px-10 2xl:px-16 bg-gradient-to-tl from-primary via-primary-dark to-background">
      <div className="w-full max-w-7xl mx-auto pt-24 lg:pt-32 pb-24 lg:pb-32 flex flex-col items-center">
        <div className="bg-background text-card-foreground p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Iniciar Sesión
            </h1>
            <p className="text-muted-foreground mt-2">
              Bienvenido de nuevo. Ingresa tus credenciales.
            </p>
          </div>

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
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Contraseña
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <Button type="submit" className="w-full cursor-pointer">
                Iniciar Sesión
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-foreground hover:underline"
            >
              ¿Olvidaste tu contraseña?
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

export default LoginPage;
