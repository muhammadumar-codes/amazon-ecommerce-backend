import { Redis } from '@upstash/redis'
import { env, isRedisConfigured } from './env.config.js'

const redis = isRedisConfigured()
  ? new Redis({
      url: env.upstashRedisRestUrl,
      token: env.upstashRedisRestToken,
    })
  : null

/* =====*** EXPORT ***===== */
export default redis
