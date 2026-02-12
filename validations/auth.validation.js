// =====*** IMPORT YUP ***=====
import * as yup from 'yup'

// ================================* REGISTER SCHEMA *============================

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),

  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
})

// ================================* LOGIN SCHEMA *============================
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),

  password: yup.string().required('Password is required'),
})
