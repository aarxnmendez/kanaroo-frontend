import { useState, useEffect, useCallback } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
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
import { Eye, EyeOff } from "lucide-react";
import {
  validateEmail,
  validatePasswordComplexity,
  validateConfirmPassword,
} from "@/lib/auth/registerValidators";
import { apiClient } from "@/lib/apiClient";
import { API_MESSAGES } from "@/lib/constants/apiMessages";

const EyeIconWrapper = (props) => (
  <Eye size={16} className="text-muted-foreground" {...props} />
);
const EyeOffIconWrapper = (props) => (
  <EyeOff size={16} className="text-muted-foreground" {...props} />
);

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const { token: tokenFromParams } = useParams();

  const [formData, setFormData] = useState({
    token: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    let newErrors = {};

    if (!tokenFromParams || !emailFromQuery) {
      newErrors.email = API_MESSAGES.RESET_PASSWORD_INVALID_TOKEN;
      setFormData((prev) => ({ ...prev, token: "", email: "" }));
    } else {
      setFormData((prev) => ({
        ...prev,
        token: tokenFromParams,
        email: emailFromQuery,
      }));
    }
    setErrors(newErrors);
    setSuccessMessage(null);
  }, [searchParams, tokenFromParams]);

  const validateField = useCallback(
    (fieldName, value) => {
      let error = null;
      switch (fieldName) {
        case "password":
          error = validatePasswordComplexity(value);
          break;
        case "password_confirmation":
          error = validateConfirmPassword(formData.password, value);
          break;
        default:
          break;
      }
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    },
    [formData.password]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
    if (name === "password") {
      validateField("password_confirmation", formData.password_confirmation);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage(null);
    let currentErrors = {};

    const passwordError = validatePasswordComplexity(formData.password);
    if (passwordError) currentErrors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.password_confirmation
    );
    if (confirmPasswordError)
      currentErrors.password_confirmation = confirmPasswordError;

    if (!formData.token || !formData.email) {
      currentErrors.email = API_MESSAGES.RESET_PASSWORD_INVALID_TOKEN;
      setErrors(currentErrors);
      return;
    }

    if (
      Object.keys(currentErrors).length > 0 &&
      (currentErrors.password || currentErrors.password_confirmation)
    ) {
      setErrors(currentErrors);
      return;
    }

    setErrors((prevErrors) => ({ email: prevErrors.email }));

    setIsLoading(true);

    try {
      await apiClient.post("/reset-password", formData);
      setSuccessMessage(API_MESSAGES.RESET_PASSWORD_SUCCESS);
      setErrors({});
      setFormData({
        token: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      const newErrors = {};
      if (error.data && error.status === 422 && error.data.errors) {
        const backendErrors = error.data.errors;
        if (backendErrors.token) {
          newErrors.email = API_MESSAGES.RESET_PASSWORD_INVALID_TOKEN;
        } else if (backendErrors.email) {
          newErrors.email = backendErrors.email[0];
        }
        if (backendErrors.password) {
          newErrors.password = backendErrors.password[0];
        }
        if (backendErrors.password_confirmation) {
          newErrors.password_confirmation =
            backendErrors.password_confirmation[0];
        }
        if (
          Object.keys(newErrors).length === 0 &&
          error.data.message &&
          !backendErrors.token
        ) {
          // No mostramos este error general para mantener limpia la UI bajo el botón
          // console.warn("Mensaje general de validación no mostrado:", error.data.message);
        }
      } else if (error.isNetworkError) {
        newErrors.email = API_MESSAGES.NETWORK_ERROR;
      } else {
        newErrors.email = API_MESSAGES.GENERIC_ERROR;
      }
      setErrors(newErrors);
    }
    setIsLoading(false);
  };

  const hasActiveFieldErrors = () => {
    return !!errors.password || !!errors.password_confirmation;
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-6 w-full px-4">
        <Card className="max-w-sm md:min-w-[24rem] w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Restablecer Contraseña</CardTitle>
            <CardDescription>
              Ingresa tu nueva contraseña. Asegúrate de que sea segura.
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
                    value={formData.email}
                    required
                    className="placeholder:text-muted-foreground"
                    readOnly
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Nueva Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="pr-10 placeholder:text-muted-foreground"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIconWrapper />
                      ) : (
                        <EyeIconWrapper />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password_confirmation">
                    Confirmar Nueva Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password_confirmation"
                      name="password_confirmation"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      required
                      className="pr-10 placeholder:text-muted-foreground"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOffIconWrapper />
                      ) : (
                        <EyeIconWrapper />
                      )}
                    </Button>
                  </div>
                  {errors.password_confirmation && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.password_confirmation}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isLoading ||
                    !formData.token ||
                    !formData.email ||
                    hasActiveFieldErrors()
                  }
                >
                  {isLoading ? "Restableciendo..." : "Restablecer Contraseña"}
                </Button>

                {!successMessage && (
                  <div className="text-center mt-3">
                    <p className="text-xs text-muted-foreground">
                      Si tu enlace ha caducado o tienes problemas, puedes{" "}
                      <Link
                        to="/forgot-password"
                        className="underline underline-offset-4 hover:text-primary"
                      >
                        solicitar uno nuevo aquí
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </div>
            </form>

            {successMessage && (
              <div className="mt-6 text-center">
                <p className="text-sm text-success">{successMessage}</p>
                <Link
                  to="/login"
                  className="inline-block mt-3 text-sm underline underline-offset-4 hover:text-primary"
                >
                  Ir a Iniciar sesión
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
