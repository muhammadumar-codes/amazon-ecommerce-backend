// ============================* VALIDATION MIDDLEWARE *=============================
const validate = (schema) => async (req, res, next) => {
  try {
    // =====*** Validate request body against Yup schema ***=====
    await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    next()
  } catch (err) {
    console.error('=====*** VALIDATION ERROR ***=====', err.errors)

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors,
    })
  }
}

export default validate
