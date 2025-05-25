export const validateEmail = (email) => {
  if (!email.trim()) {
    return "El correo electrónico es requerido.";
  }
  if (email.length > 255) {
    return "El correo no debe exceder los 255 caracteres.";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "El formato del correo electrónico no es válido.";
  }
  return null;
};

export const validateName = (name) => {
  if (!name.trim()) {
    return "El nombre es requerido.";
  }
  if (name.length > 255) {
    return "El nombre no debe exceder los 255 caracteres.";
  }
  return null;
};

export const validatePasswordComplexity = (passwordValue) => {
  if (!passwordValue) {
    return "La contraseña es requerida.";
  }
  const errors = [];
  if (passwordValue.length < 8) {
    errors.push("Debe tener al menos 8 caracteres.");
  }
  if (!/[a-z]/.test(passwordValue)) {
    errors.push("Debe incluir una minúscula.");
  }
  if (!/[A-Z]/.test(passwordValue)) {
    errors.push("Debe incluir una mayúscula.");
  }
  if (!/[0-9]/.test(passwordValue)) {
    errors.push("Debe incluir un número.");
  }
  if (!/[^a-zA-Z0-9]/.test(passwordValue)) {
    errors.push("Debe incluir un símbolo.");
  }
  return errors.length > 0 ? errors.join(" ") : null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword.trim()) {
    return "Confirmar la contraseña es requerido.";
  }
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden.";
  }
  return null;
};
