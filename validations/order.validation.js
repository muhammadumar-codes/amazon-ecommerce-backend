import * as yup from 'yup'

export const createOrderSchema = yup.object({
  shippingAddress: yup
    .object({
      address: yup.string().trim().required(),
      city: yup.string().trim().required(),
      postalCode: yup.string().trim().required(),
      country: yup.string().trim().required(),
    })
    .required(),
})
