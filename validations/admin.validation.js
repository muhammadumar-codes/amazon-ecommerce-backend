import * as yup from 'yup'

export const createAdminSchema = yup.object({
  name: yup.string().trim().min(3).max(50).required(),
  email: yup.string().trim().lowercase().email().required(),
  password: yup.string().trim().min(6).max(50).required(),
})

export const changeUserRoleSchema = yup.object({
  role: yup.string().oneOf(['USER', 'ADMIN']).required(),
})
