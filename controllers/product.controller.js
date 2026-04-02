/* =====*** IMPORTS ***===== */
import asyncHandler from 'express-async-handler'
import {
  createProduct as createProductService,
  getProducts as getProductsService,
  getProductById as getProductByIdService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from '../services/product.service.js'

/* ================================* CREATE PRODUCT (ADMIN) *=============================== */
const createProduct = asyncHandler(async (req, res) => {
  const response = await createProductService({ body: req.body, files: req.files })
  res.status(201).json(response)
})

/* ================================* GET ALL PRODUCTS WITH CACHE *=============================== */
const getProducts = asyncHandler(async (req, res) => {
  const response = await getProductsService(req.query)
  res.status(200).json(response)
})

/* ================================* GET SINGLE PRODUCT *=============================== */
const getProductById = asyncHandler(async (req, res) => {
  const response = await getProductByIdService(req.params.id)
  res.status(200).json(response)
})

/* ================================* UPDATE PRODUCT (ADMIN) *=============================== */
const updateProduct = asyncHandler(async (req, res) => {
  const response = await updateProductService({
    productId: req.params.id,
    body: req.body,
    files: req.files,
  })
  res.status(200).json(response)
})

/* ================================* DELETE PRODUCT (ADMIN) *=============================== */
const deleteProduct = asyncHandler(async (req, res) => {
  const response = await deleteProductService(req.params.id)
  res.status(200).json(response)
})

/* =====*** EXPORT CONTROLLER ***===== */
export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
