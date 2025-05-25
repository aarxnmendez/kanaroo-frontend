import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { validateEmail } from "@/lib/auth/loginValidators";
import { apiClient } from "@/lib/apiClient";
import { API_MESSAGES } from "@/lib/constants/apiMessages";
import { extractLaravelErrorMessages } from "@/lib/utils/errorUtils";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [isApiError, setIsApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = useCallback((fieldName, value) => {
    let error = null;
    if (fieldName === "email") {
      error = validateEmail(value);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
      general: null,
    }));
    setApiMessage("");
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateField("email", value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiMessage("");
    setIsApiError(false);

    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }
    setErrors({});

    setIsLoading(true);
    try {
      await apiClient.post("/forgot-password", { email });
      setApiMessage(API_MESSAGES.FORGOT_PASSWORD_SUCCESS);
      setIsApiError(false);
      setEmail("");
    } catch (error) {
      if (error.isNetworkError) {
        setApiMessage(API_MESSAGES.NETWORK_ERROR);
      } else if (error.data) {
        const extractedMessage = extractLaravelErrorMessages(error.data, [
          "email",
        ]);
        if (error.data.errors && error.data.errors.email) {
          setErrors({ email: extractedMessage });
          setApiMessage("");
        } else {
          setApiMessage(
            extractedMessage || API_MESSAGES.FORGOT_PASSWORD_ERROR_DEFAULT
          );
        }
      } else {
        setApiMessage(
          error.message || API_MESSAGES.FORGOT_PASSWORD_ERROR_DEFAULT
        );
      }
      setIsApiError(true);
    }
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-6 w-full px-4">
        <Card className="max-w-sm md:min-w-[24rem] w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">¿Olvidaste tu contraseña?</CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico y te enviaremos un enlace para
              restablecerla.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="ejemplo@kanaroo.com"
                    value={email}
                    onChange={handleChange}
                    required
                    className="placeholder:text-muted-foreground"
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                  {apiMessage && (
                    <p
                      className={`text-xs mt-1 ${
                        isApiError ? "text-destructive" : "text-success"
                      }`}
                    >
                      {apiMessage}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? "Enviando..."
                    : "Enviar enlace de restablecimiento"}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              <Link to="/login" className="underline underline-offset-4">
                Volver a Iniciar sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
