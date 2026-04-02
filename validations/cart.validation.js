import * as yup from 'yup'

export const addToCartSchema = yup.object({
  productId: yup.string().trim().required(),
  quantity: yup.number().integer().min(1).default(1),
})

export const updateCartItemSchema = yup.object({
  quantity: yup.number().integer().min(1).required(),
})
