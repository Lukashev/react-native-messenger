import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  regDate: { type: Date, default: Date.now },
  isActivated: { type: Boolean, default: false },
  activationCode: { type: String, default: null },
  recoveryHash: { type: String, default: null }
});

const User = mongoose.model('User', userSchema);

export default User;
