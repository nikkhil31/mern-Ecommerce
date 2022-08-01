const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eCommerce'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

const IS_DEV = process.env.NODE_ENV === 'development'

const PORT = process.env.PORT || 8000

export default {
  MONGO_URI,
  JWT_SECRET,
  IS_DEV,
  PORT,
}
