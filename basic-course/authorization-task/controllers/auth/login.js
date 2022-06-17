const bcrypt = require('bcryptjs')
const { BadRequest, Unauthorized } = require('http-errors') // BadRequest=400, Unauthorized=401

const TokenService = require('../../service/token-service')

const login = async (req, res) => {
  const { email, password } = req.body
  const users = req.app.locals.collection
  const collectionToken = req.app.locals.collectionToken

  const user = await users.findOne({ email })
  if (!user) {
    throw new BadRequest('Bad Request')
  }
  const hashPassword = user.password
  const compareResult = bcrypt.compareSync(password, hashPassword)
  if (!compareResult) {
    throw new Unauthorized('Email or password is wrong')
  }
  // --------------
  const payload = {
    id: user._id,
  }
  const { accessToken, refreshToken } = TokenService.generateTokens(payload)
  await TokenService.saveToken(collectionToken, user._id, refreshToken)
  await users.findOneAndUpdate({ _id: user._id }, { $set: { accessToken } })
  res.cookie('refreshToken', refreshToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  })
  res.json({
    accessToken,
    refreshToken,
  })
}

module.exports = login
