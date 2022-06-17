const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  chatId: Number,
  user: String,
  coin: [String],
});

const User = model('user', userSchema);

module.exports = User;
