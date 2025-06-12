import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  resetPasswordSchema,
  validateField,
  validateForm,
} from "@/lib/validations";

function ResetPasswordPage() {
  const { token: urlToken } = useParams();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (urlToken && emailFromUrl) {
      setIsTokenValid(true);
      setStatusMessage("");
    } else {
      setIsTokenValid(false);
      setStatusMessage(
        "Token o email no proporcionado. El enlace puede ser incorrecto."
      );
    }
  }, [urlToken, emailFromUrl]);

  const handleValidation = (name, value) => {
    const error = validateField(
      name,
      value,
      formData.password,
      resetPasswordSchema
    );
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
    if (!isTokenValid) return;

    const { isValid, errors: formErrors } = validateForm(
      formData,
      resetPasswordSchema
    );
    setErrors(formErrors);

    if (isValid) {
      console.log(
        "Formulario de reseteo válido, actualizando contraseña para:",
        emailFromUrl,
        "con token:",
        urlToken,
        "Nueva contraseña:",
        formData.password
      );
      setIsPasswordReset(true);
    }
  };

  if (!isTokenValid && !statusMessage) {
    return (
      <div className="flex flex-col flex-grow min-h-[100dvh] items-center justify-center p-4 text-foreground">
        Verificando enlace...
      </div>
    );
  }

  if (!isTokenValid && statusMessage) {
    return (
      <section className="flex flex-col flex-grow min-h-[100dvh] items-center justify-center px-4 md:px-16 lg:px-10 2xl:px-16 bg-gradient-to-bl from-primary via-primary-dark to-background">
        <div className="w-full max-w-7xl mx-auto py-8 flex flex-col items-center">
          <div className="bg-background text-card-foreground p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">
              Enlace Inválido
            </h1>
            <p className="text-muted-foreground mb-6">
              {statusMessage ||
                "El enlace para restablecer la contraseña es inválido o ha expirado."}
            </p>
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Volver a Iniciar Sesión
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col flex-grow min-h-[100dvh] items-center justify-center px-4 md:px-16 lg:px-10 2xl:px-16 bg-gradient-to-bl from-primary via-primary-dark to-background">
      <div className="w-full max-w-7xl mx-auto pt-24 lg:pt-32 pb-24 lg:pb-32 flex flex-col items-center">
        <div className="bg-background text-card-foreground p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Restablecer Contraseña
            </h1>
            <p className="text-muted-foreground mt-2">
              Crea una nueva contraseña para tu cuenta asociada a{" "}
              <strong>{emailFromUrl}</strong>.
            </p>
          </div>

          {isPasswordReset ? (
            <div className="text-center">
              <p className="text-foreground mb-4">
                ¡Tu contraseña ha sido restablecida con éxito!
              </p>
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Iniciar Sesión
              </Link>
            </div>
          ) : (
            <>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Nueva Contraseña
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
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-foreground mb-1"
                  >
                    Confirmar Nueva Contraseña
                  </Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div>
                  <Button type="submit" className="w-full cursor-pointer">
                    Restablecer Contraseña
                  </Button>
                </div>
              </form>
              <p className="mt-8 text-center text-sm text-muted-foreground">
                ¿Recordaste tu contraseña?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Iniciar Sesión
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ResetPasswordPage;
