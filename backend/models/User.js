import mongoose from 'mongoose'

const { Schema } = mongoose

const connection = mongoose.createConnection(config.DB_URI, { useNewUrlParser: true })

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  regDate: { type: Date, default: Date.now },
  isActivated: { type: Boolean, default: false },
  activationCode: { type: String, default: null },
  recoveryHash: { type: String, default: null }  
})

const User = connection.model('User', userSchema)

export default User