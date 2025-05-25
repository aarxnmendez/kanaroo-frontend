import { validateEmail } from "@/lib/auth/registerValidators";

export { validateEmail };

export const validateLoginPassword = (passwordValue) => {
  if (!passwordValue) {
    return "La contraseña es requerida.";
  }
  return null;
};
