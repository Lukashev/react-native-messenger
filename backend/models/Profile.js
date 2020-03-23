import mongoose from 'mongoose';

const { Schema } = mongoose;

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  age: Number,
  location: String,
  description: String,
  avatar: String
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
