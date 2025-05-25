export const API_MESSAGES = {
  NETWORK_ERROR:
    "Error de conexión. Verifica tu conexión o inténtalo de nuevo más tarde.",
  GENERIC_SUCCESS: "Operación realizada con éxito.",
  GENERIC_ERROR: "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
  SERVER_VALIDATION_ERROR:
    "Error en el servidor. Por favor, revisa los campos.",

  // Login specific
  LOGIN_SUCCESS: "Has iniciado sesión correctamente.",
  LOGIN_ERROR_DEFAULT: "Error al iniciar sesión.",

  // Registration specific
  REGISTRATION_SUCCESS:
    "Registro completado exitosamente. Ya puedes iniciar sesión.",
  REGISTRATION_ERROR_DEFAULT: "Error durante el registro.",

  // Password Reset specific
  FORGOT_PASSWORD_SUCCESS:
    "Si el correo existe, recibirás un enlace para restablecer tu contraseña.",
  FORGOT_PASSWORD_ERROR_DEFAULT:
    "Error al solicitar el restablecimiento de contraseña.",
  RESET_PASSWORD_SUCCESS:
    "Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión.",
  RESET_PASSWORD_ERROR_DEFAULT: "Error al restablecer la contraseña.",
  RESET_PASSWORD_INVALID_TOKEN:
    "El token de restablecimiento es inválido o ha expirado.",
};
