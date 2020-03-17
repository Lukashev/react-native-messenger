import mongoose from 'mongoose'
import config from '../config'

const { Schema } = mongoose

const connection = mongoose.createConnection(config.DB_URI, { useNewUrlParser: true })

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  age: Number,
  location: {},
  description: String,
  avatar: String
})

const Profile = connection.model('Profile', profileSchema)

export default Profile