import 'dotenv/config'

const { DB_URI, JWT_SECRET } = process.env

export default {
  DB_URI,
  JWT_SECRET
}