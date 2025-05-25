import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils/utils";
import {
  validateEmail,
  validateLoginPassword,
} from "@/lib/auth/loginValidators";
import { Eye, EyeOff } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { API_MESSAGES } from "@/lib/constants/apiMessages";
import { extractLaravelErrorMessages } from "@/lib/utils/errorUtils";
import { useUserStore } from "@/store/user.store";

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
import { PasswordInput } from "@/components/ui/PasswordInput";

export function LoginForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);

  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [isApiError, setIsApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (fieldName, value) => {
    let error = null;
    switch (fieldName) {
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validateLoginPassword(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
    setApiMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiMessage("");
    setIsApiError(false);

    const newErrors = {};
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validateLoginPassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setIsLoading(true);
      try {
        const responseData = await apiClient.post("/login", formData);

        if (responseData && responseData.token) {
          localStorage.setItem("authToken", responseData.token);
          await fetchCurrentUser();
          navigate("/dashboard");
        } else {
          setApiMessage(API_MESSAGES.LOGIN_ERROR_DEFAULT);
          setIsApiError(true);
        }
      } catch (error) {
        if (error.isNetworkError) {
          setApiMessage(API_MESSAGES.NETWORK_ERROR);
        } else if (error.data?.errors || error.data?.message) {
          setApiMessage(
            extractLaravelErrorMessages(error.data, ["email", "password"])
          );
        } else {
          setApiMessage(error.message || API_MESSAGES.LOGIN_ERROR_DEFAULT);
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
          <CardTitle className="text-xl">Bienvenido de vuelta</CardTitle>
          <CardDescription>
            Inicia sesión con tu correo y contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-6">
              <div className="grid gap-6">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link
                      to="/forgot-password"
                      className="hidden text-sm underline-offset-4 hover:underline md:inline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <PasswordInput
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-destructive text-xs">
                      {errors.password}
                    </p>
                  )}
                  <Link
                    to="/forgot-password"
                    className="block text-sm underline-offset-4 hover:underline md:hidden mt-1"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
                {apiMessage && isApiError && (
                  <p className="text-xs mt-2 text-center text-destructive">
                    {apiMessage}
                  </p>
                )}
              </div>
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Regístrate
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
