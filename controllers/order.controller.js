/* =====*** IMPORTS ***===== */
import asyncHandler from 'express-async-handler'
import {
  createOrder as createOrderService,
  getMyOrders as getMyOrdersService,
  getOrderById as getOrderByIdService,
} from '../services/order.service.js'

/* ================= CREATE ORDER =================
   Flow:
   1. Get user cart
   2. Validate cart
   3. Convert cart → order items (snapshot)
   4. Calculate total
   5. Save order
   6. Clear cart
*/
const createOrder = asyncHandler(async (req, res) => {
  const response = await createOrderService({
    userId: req.user.userId,
    shippingAddress: req.body.shippingAddress,
  })
  res.status(201).json(response)
})

/* ================= GET MY ORDERS ================= */
const getMyOrders = asyncHandler(async (req, res) => {
  const response = await getMyOrdersService(req.user.userId)
  res.status(200).json(response)
})

/* ================= GET SINGLE ORDER ================= */
const getOrderById = asyncHandler(async (req, res) => {
  const response = await getOrderByIdService({
    orderId: req.params.id,
    userId: req.user.userId,
    role: req.user.role,
  })
  res.status(200).json(response)
})

/* ===== EXPORT CONTROLLER ===== */
export default {
  createOrder,
  getMyOrders,
  getOrderById,
}
