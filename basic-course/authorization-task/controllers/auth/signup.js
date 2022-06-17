const bcrypt = require('bcryptjs')
const { Conflict } = require('http-errors')

const singup = async (req, res, next) => {
  const { email, password } = req.body
  const users = req.app.locals.collection
  const user = await users.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const result = await users.insertOne({
    password: hashPassword,
    email,
  })
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Registration successful',
  })
  return result
}

module.exports = singup
