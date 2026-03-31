/* =====*** IMPORTS ***===== */
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Product from '../models/product.model.js'
import redis from '../config/redis.config.js'

/* ================================* HELPER: CLEAR PRODUCT CACHE *=============================== */
const clearProductCache = async () => {
  // Remove all cached product queries to ensure fresh data
  const keys = await redis.keys('products:*')
  if (keys.length > 0) {
    await redis.del(keys)
    console.log(`🗑 Cleared ${keys.length} product cache entries`)
  }
}

/* ================================* CREATE PRODUCT (ADMIN) *=============================== */
const createProduct = asyncHandler(async (req, res) => {
  // Map uploaded files (Cloudinary URLs) if any
  const images = req.files?.map((file) => file.path) || []

  // Create new product in MongoDB
  const product = await Product.create({
    ...req.body,
    images,
  })

  // Clear product cache after new creation
  await clearProductCache()

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product,
  })
})

/* ================================* GET ALL PRODUCTS WITH CACHE *=============================== */
const getProducts = asyncHandler(async (req, res) => {
  const cacheKey = `products:${JSON.stringify(req.query)}`

  // Check if cached response exists
  const cachedData = await redis.get(cacheKey)
  if (cachedData) {
    console.log('⚡ CACHE HIT')
    return res.json(cachedData)
  }
  console.log('🐢 CACHE MISS')

  // Extract query params for search, filter, sort, pagination
  const {
    search,
    category,
    minPrice,
    maxPrice,
    rating,
    sort,
    page = 1,
    limit = 10,
  } = req.query

  let query = {}

  // Multi-field search (name + description)
  if (search) {
    query.$or = [
      { name: { $regex: search.trim(), $options: 'i' } },
      { description: { $regex: search.trim(), $options: 'i' } },
    ]
  }

  // Category filter
  if (category) query.category = category

  // Price filter
  if (minPrice || maxPrice) {
    query.price = {}
    if (minPrice) query.price.$gte = Number(minPrice)
    if (maxPrice) query.price.$lte = Number(maxPrice)
  }

  // Ratings filter
  if (rating) query.ratings = { $gte: Number(rating) }

  // Pagination
  const pageNumber = Math.max(1, Number(page))
  const limitNumber = Math.max(1, Number(limit))
  const skip = (pageNumber - 1) * limitNumber

  // Sorting
  const allowedSortFields = ['price', 'createdAt', 'ratings']
  let sortOption = { createdAt: -1 } // default descending
  if (sort) {
    const field = sort.replace('-', '')
    if (allowedSortFields.includes(field)) {
      sortOption = { [field]: sort.startsWith('-') ? -1 : 1 }
    }
  }

  // Execute DB query in parallel
  const [products, total] = await Promise.all([
    Product.find(query).sort(sortOption).skip(skip).limit(limitNumber),
    Product.countDocuments(query),
  ])

  const response = {
    success: true,
    total,
    page: pageNumber,
    pages: Math.ceil(total / limitNumber),
    results: products.length,
    products,
  }

  // Save response in Redis cache for 60 seconds
  await redis.set(cacheKey, response, { ex: 60 })

  res.status(200).json(response)
})

/* ================================* GET SINGLE PRODUCT *=============================== */
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Invalid product ID')
  }

  const product = await Product.findById(id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  res.status(200).json({
    success: true,
    product,
  })
})

/* ================================* UPDATE PRODUCT (ADMIN) *=============================== */
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  // Handle Cloudinary images
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => file.path)
    product.images = newImages // Replace old images
  }

  // Update only allowed fields
  const allowedUpdates = ['name', 'description', 'price', 'category', 'stock']
  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) product[field] = req.body[field]
  })

  await product.save()

  // Clear cache after update
  await clearProductCache()

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product,
  })
})

/* ================================* DELETE PRODUCT (ADMIN) *=============================== */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  // Optional: remove images from Cloudinary here (advanced)
  await product.deleteOne()

  // Clear cache after deletion
  await clearProductCache()

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  })
})

/* =====*** EXPORT CONTROLLER ***===== */
export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
