import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  chatId: Number,
  user: String,
  coin: [String],
});

const User = model('user', userSchema);

export default User;
