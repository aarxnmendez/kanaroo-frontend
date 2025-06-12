export const registrationSchema = {
  name: {
    required: { value: true, message: "El nombre completo es obligatorio." },
    minLength: {
      value: 3,
      message: "El nombre debe tener al menos 3 caracteres.",
    },
  },
  email: {
    required: { value: true, message: "El correo electrónico es obligatorio." },
    pattern: {
      value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Por favor, introduce un correo electrónico válido.",
    },
  },
  password: {
    required: { value: true, message: "La contraseña es obligatoria." },
    minLength: {
      value: 8,
      message: "La contraseña debe tener al menos 8 caracteres.",
    },
  },
  confirmPassword: {
    required: { value: true, message: "Por favor, confirma tu contraseña." },
  },
};

export const loginSchema = {
  email: {
    required: { value: true, message: "El correo electrónico es obligatorio." },
    pattern: {
      value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Por favor, introduce un correo electrónico válido.",
    },
  },
  password: {
    required: { value: true, message: "La contraseña es obligatoria." },
  },
};

export const forgotPasswordSchema = {
  email: {
    required: { value: true, message: "El correo electrónico es obligatorio." },
    pattern: {
      value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: "Por favor, introduce un correo electrónico válido.",
    },
  },
};

export const resetPasswordSchema = {
  password: {
    required: { value: true, message: "La nueva contraseña es obligatoria." },
    minLength: {
      value: 8,
      message: "La contraseña debe tener al menos 8 caracteres.",
    },
  },
  confirmPassword: {
    required: {
      value: true,
      message: "Por favor, confirma tu nueva contraseña.",
    },
  },
};

export const validateField = (name, value, passwordValue, schema) => {
  const rules = schema[name];
  let error = "";

  if (rules?.required?.value && !value) {
    error = rules.required.message;
  } else if (rules?.minLength?.value && value.length < rules.minLength.value) {
    error = rules.minLength.message;
  } else if (rules?.pattern?.value && !rules.pattern.value.test(value)) {
    error = rules.pattern.message;
  } else if (name === "confirmPassword" && value !== passwordValue) {
    error = "Las contraseñas no coinciden.";
  }
  return error;
};

export const validateForm = (formData, schema) => {
  const newErrors = {};
  let isValid = true;

  for (const field in schema) {
    const error = validateField(
      field,
      formData[field] || "",
      formData.password,
      schema
    );
    if (error) {
      newErrors[field] = error;
      isValid = false;
    }
  }
  return { isValid, errors: newErrors };
};
