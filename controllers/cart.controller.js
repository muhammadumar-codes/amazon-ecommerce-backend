/* =====*** IMPORTS ***===== */
import asyncHandler from 'express-async-handler'
import {
  addToCart as addToCartService,
  getCart as getCartService,
  updateCartItem as updateCartItemService,
  removeFromCart as removeFromCartService,
  clearCart as clearCartService,
} from '../services/cart.service.js'

/* ================= ADD TO CART ================= */
const addToCart = asyncHandler(async (req, res) => {
  const response = await addToCartService({
    userId: req.user.userId,
    productId: req.body.productId,
    quantity: req.body.quantity,
  })
  res.status(200).json(response)
})

/* ================= GET CART (WITH REDIS CACHE) ================= */
const getCart = asyncHandler(async (req, res) => {
  const response = await getCartService(req.user.userId)
  res.status(200).json(response)
})

/* ================= UPDATE CART ITEM ================= */
const updateCartItem = asyncHandler(async (req, res) => {
  const response = await updateCartItemService({
    userId: req.user.userId,
    productId: req.params.productId,
    quantity: req.body.quantity,
  })
  res.status(200).json(response)
})

/* ================= REMOVE ITEM ================= */
const removeFromCart = asyncHandler(async (req, res) => {
  const response = await removeFromCartService({
    userId: req.user.userId,
    productId: req.params.productId,
  })
  res.status(200).json(response)
})

/* ================= CLEAR CART ================= */
const clearCart = asyncHandler(async (req, res) => {
  const response = await clearCartService(req.user.userId)
  res.status(200).json(response)
})

/* =====*** EXPORT CONTROLLER ***===== */
export default {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
}
