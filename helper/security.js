import rateLimit from 'express-rate-limit'

/**
 * @function
 * @name limiter
 * @description
 * This function is used to limit the number of requests from the same IP address.
 */
const limiter = rateLimit({
  windowMs: 60 * 1000, // per minute
  max: 60, // Limit each IP to 60 requests per `window` (here, per minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after an hour',
})

export { limiter }
