const { Unauthorized } = require('http-errors')

const TokenService = require('../../service/token-service')

const me = async (req, res) => {
  const { me } = req.params
  const mock = me.replace('me', '')
  const users = req.app.locals.collection
  const collectionToken = req.app.locals.collectionToken
  const { refreshToken } = req.cookies
  if (!refreshToken) {
    throw new Unauthorized('refreshToken error')
  }
  const userDataRefresh = await TokenService.validateRefreshToken(refreshToken)
  const tokenFromDb = await TokenService.findToken(
    collectionToken,
    refreshToken,
  )
  if (!userDataRefresh || !tokenFromDb) {
    throw new Unauthorized('userDataRefresh || tokenFromDb - error')
  }
  const user = await users.findOne({ _id: tokenFromDb.user })
  if (!user) {
    throw new Unauthorized('user - error')
  }
  const userDataAccess = await TokenService.validateAccessToken(
    user.accessToken,
  )
  if (!userDataAccess) {
    throw new Unauthorized('accessToken - error ')
  }

  if (mock === '') {
    return res.json({
      data: {
        userEmail: user.email,
      },
    })
  } else {
    res.json({
      request_num: mock,
      data: {
        userEmail: user.email,
      },
    })
  }
}

module.exports = me
