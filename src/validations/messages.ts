import { alpha, alphaNum, email, helpers, maxLength, minLength, numeric, required, sameAs, url } from '@vuelidate/validators'

export const validationMessages = {
  required: (field: string) => helpers.withMessage(
    `El campo ${field} es obligatorio`,
    required
  ),
  email: helpers.withMessage(
    'Por favor, ingrese un email válido',
    email
  ),
  minLength: (min: number, field: string) => helpers.withMessage(
    `El campo ${field} debe tener al menos ${min} caracteres`,
    minLength(min)
  ),
  maxLength: (max: number, field: string) => helpers.withMessage(
    `El campo ${field} no puede tener más de ${max} caracteres`,
    maxLength(max)
  ),
  numeric: helpers.withMessage(
    'Este campo solo acepta números',
    numeric
  ),
  alpha: helpers.withMessage(
    'Este campo solo acepta letras',
    alpha
  ),
  alphaNum: helpers.withMessage(
    'Este campo solo acepta letras y números',
    alphaNum
  ),
  url: helpers.withMessage(
    'Por favor, ingrese una URL válida',
    url
  ),
  passwordMatch: (passwordRef: string) => helpers.withMessage(
    'Las contraseñas no coinciden',
    sameAs(passwordRef)
  ),
  
}
