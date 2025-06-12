import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  registrationSchema,
  validateField,
  validateForm,
} from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";

function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleValidation = (name, value) => {
    const error = validateField(
      name,
      value,
      formData.password,
      registrationSchema
    );
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "password" && formData.confirmPassword) {
      const confirmPasswordError = validateField(
        "confirmPassword",
        formData.confirmPassword,
        value,
        registrationSchema
      );
      setErrors((prev) => ({ ...prev, confirmPassword: confirmPasswordError }));
    } else if (name === "confirmPassword" && formData.password) {
      const passwordError = validateField(
        "password",
        formData.password,
        formData.password,
        registrationSchema
      );
      setErrors((prev) => ({ ...prev, password: passwordError }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    handleValidation(name, value);

    if (error) {
      clearError();
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    handleValidation(name, value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: formErrors } = validateForm(
      formData,
      registrationSchema
    );
    setErrors(formErrors);
    if (isValid) {
      try {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        };

        await register(userData);
        navigate("/dashboard");
      } catch (err) {
        console.error("Error en registro:", err);
      }
    }
  };

  return (
    <section className="flex flex-col flex-grow min-h-[100dvh] items-center justify-center px-4 md:px-16 lg:px-10 2xl:px-16 bg-gradient-to-br from-primary via-primary-dark to-background">
      <div className="w-full max-w-7xl mx-auto pt-24 lg:pt-32 pb-24 lg:pb-32 flex flex-col items-center">
        <div className="bg-background text-card-foreground p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md">
          {" "}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Crear una cuenta
            </h1>
            <p className="text-muted-foreground mt-2">
              Únete a Kanaroo para empezar a organizar tu vida.
            </p>
          </div>
          {error && (
            <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
              <span className="block text-sm">{error}</span>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Nombre completo
              </Label>{" "}
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Tu Nombre Completo"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Correo electrónico
              </Label>{" "}
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="tu@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
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
              </Label>{" "}
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
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
                Confirmar contraseña
              </Label>{" "}
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>{" "}
            <div>
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </Button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
