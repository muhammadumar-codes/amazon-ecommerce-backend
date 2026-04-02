import redis from '../config/redis.config.js'

export const getCartCacheKey = (userId) => `cart:${userId}`

export const clearCartCache = async (userId) => {
  if (!redis) return
  await redis.del(getCartCacheKey(userId))
}

export const clearProductCache = async () => {
  if (!redis) return
  const keys = await redis.keys('products:*')

  if (keys.length > 0) {
    await redis.del(...keys)
  }
}

export const getCachedValue = async (key) => {
  if (!redis) return null
  return redis.get(key)
}

export const setCachedValue = async (key, value, options) => {
  if (!redis) return null
  return redis.set(key, value, options)
}
