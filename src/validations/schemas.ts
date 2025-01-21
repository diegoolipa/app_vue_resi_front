import * as yup from 'yup';

export const commonValidations = {
  required: yup.string().required('Este campo es requerido'),
  email: yup.string().email('Ingrese un correo válido').required('El correo es requerido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'Mínimo 6 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número'),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{8,15}$/, 'Ingrese un número de teléfono válido')
} as const;

export const schemas = {
  user: yup.object<any>({
    nombre: commonValidations.required.min(3, 'Mínimo 3 caracteres'),
    email: commonValidations.email,
    password: commonValidations.password,
    confirmPassword: yup
      .string()
      .required('Confirme su contraseña')
      .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
  }),

  profile: yup.object<any>({
    fullName: commonValidations.required,
    phone: commonValidations.phone,
    address: yup.string().nullable(),
    website: yup.string().url().nullable()
  }),

  product: yup.object<any>({
    name: commonValidations.required,
    price: yup.number().required('Ingrese un precio').positive('El precio debe ser positivo'),
    stock: yup.number().integer('Debe ser un número entero').min(0, 'No puede ser negativo')
  })
} as const;