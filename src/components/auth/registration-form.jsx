import { useState, useCallback } from "react";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/ui/PasswordInput";
import {
  validateName,
  validateEmail,
  validatePasswordComplexity,
  validateConfirmPassword,
} from "@/lib/auth/registerValidators";
import { apiClient } from "@/lib/apiClient";
import { API_MESSAGES } from "@/lib/constants/apiMessages";
import { extractLaravelErrorMessages } from "@/lib/utils/errorUtils";

export function RegistrationForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [isApiError, setIsApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = useCallback(
    (fieldName, value) => {
      let error = null;
      switch (fieldName) {
        case "name":
          error = validateName(value);
          break;
        case "email":
          error = validateEmail(value);
          break;
        case "password":
          error = validatePasswordComplexity(value);
          break;
        case "confirmPassword":
          error = validateConfirmPassword(formData.password, value);
          break;
        default:
          break;
      }
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
      setApiMessage("");
    },
    [formData.password]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);

    // If password changes, re-validate confirmPassword against the NEW password value
    if (name === "password") {
      // 'value' is the new password.
      // formData.confirmPassword is the current value of the confirm password input from state.
      const confirmError = validateConfirmPassword(
        value,
        formData.confirmPassword
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiMessage("");
    setIsApiError(false);

    const newErrors = {};
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePasswordComplexity(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setIsLoading(true);
      const { confirmPassword, ...dataForApi } = formData;
      const payload = {
        ...dataForApi,
        password_confirmation: confirmPassword,
      };

      try {
        const responseData = await apiClient.post("/register", payload);

        if (responseData && responseData.token) {
          localStorage.setItem("authToken", responseData.token);
          navigate("/dashboard");
        } else {
          setApiMessage(API_MESSAGES.REGISTRATION_ERROR_DEFAULT);
          setIsApiError(true);
        }
      } catch (error) {
        if (error.isNetworkError) {
          setApiMessage(API_MESSAGES.NETWORK_ERROR);
        } else if (error.data?.errors || error.data?.message) {
          setApiMessage(
            extractLaravelErrorMessages(error.data, [
              "name",
              "email",
              "password",
            ])
          );
        } else {
          setApiMessage(
            error.message || API_MESSAGES.REGISTRATION_ERROR_DEFAULT
          );
        }
        setIsApiError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className={cn("flex flex-col items-center gap-6", className)}
      {...props}
    >
      <Card className="max-w-sm md:min-w-[24rem]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crear una cuenta</CardTitle>
          <CardDescription>Ingresa tus datos para registrarte</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={255}
                    className="placeholder:text-muted-foreground"
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs">{errors.name}</p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ejemplo@kanaroo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={255}
                    className="placeholder:text-muted-foreground"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs">{errors.email}</p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Contraseña</Label>
                  <PasswordInput
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    placeholder="Mínimo 8 caracteres"
                  />
                  {errors.password && (
                    <p className="text-destructive text-xs">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Repite tu contraseña"
                  />
                  {errors.confirmPassword && (
                    <p className="text-destructive text-xs">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Crear cuenta"}
                </Button>
                {apiMessage && (
                  <p
                    className={`text-xs mt-2 text-center ${
                      isApiError ? "text-destructive" : "text-success"
                    }`}
                  >
                    {apiMessage}
                  </p>
                )}
              </div>
              <div className="text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Inicia sesión
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="max-w-md md:max-w-xl text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <Link to="/terminos-de-servicio">Términos de servicio</Link> y{" "}
        <Link to="/politica-de-privacidad">Política de privacidad</Link>.
      </div>
    </div>
  );
}
