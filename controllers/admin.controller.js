import asyncHandler from 'express-async-handler'
import {
  createAdmin as createAdminService,
  getAllUsers as getAllUsersService,
  changeUserRole as changeUserRoleService,
  deactivateUser as deactivateUserService,
} from '../services/admin.service.js'

/* ================= CREATE ADMIN ================= */
const createAdmin = asyncHandler(async (req, res) => {
  const response = await createAdminService(req.body)
  res.status(201).json(response)
})

/* ================= GET ALL USERS ================= */
const getAllUsers = asyncHandler(async (req, res) => {
  const response = await getAllUsersService()
  res.status(200).json(response)
})

/* ================= CHANGE USER ROLE ================= */
const changeUserRole = asyncHandler(async (req, res) => {
  const response = await changeUserRoleService({
    actorUserId: req.user.userId,
    targetUserId: req.params.id,
    role: req.body.role,
  })
  res.status(200).json(response)
})

/* ================= DEACTIVATE USER ================= */
const deactivateUser = asyncHandler(async (req, res) => {
  const response = await deactivateUserService(req.params.id)
  res.status(200).json(response)
})

export default {
  createAdmin,
  getAllUsers,
  changeUserRole,
  deactivateUser,
}
