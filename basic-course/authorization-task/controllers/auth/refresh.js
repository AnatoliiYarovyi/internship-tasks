const { Unauthorized } = require('http-errors')

const TokenService = require('../../service/token-service')

const refresh = async (req, res) => {
  const users = req.app.locals.collection
  const collectionToken = req.app.locals.collectionToken
  const { refreshToken } = req.cookies
  if (!refreshToken) {
    throw new Unauthorized('refreshToken error')
  }
  const userData = await TokenService.validateRefreshToken(refreshToken)
  const tokenFromDb = await TokenService.findToken(
    collectionToken,
    refreshToken,
  )
  if (!userData || !tokenFromDb) {
    throw new Unauthorized('userData || tokenFromDb - error')
  }
  const user = await users.findOne({ _id: tokenFromDb.user })
  if (!user) {
    throw new BadRequest('Bad Request')
  }
  const payload = {
    id: user._id,
  }
  const tokens = TokenService.generateTokens(payload)
  await TokenService.saveToken(collectionToken, user._id, tokens.refreshToken)
  await users.findOneAndUpdate(
    { _id: user._id },
    { $set: { accessToken: tokens.accessToken } },
  )
  res.cookie('refreshToken', tokens.refreshToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  })
  res.json({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  })
}

module.exports = refresh
