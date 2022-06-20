const jwt = require('jsonwebtoken')

class TokenService {
  generateTokens(payload) {
    const { SEKRET_KEY, SEKRET_KEY_REFRESH } = process.env
    const getRandomArbitrary = (min = 30, max = 60) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    const accessToken = jwt.sign(payload, SEKRET_KEY, {
      expiresIn: getRandomArbitrary(),
    })
    const refreshToken = jwt.sign(payload, SEKRET_KEY_REFRESH, {
      expiresIn: '1d',
    })

    return {
      accessToken,
      refreshToken,
    }
  }
  validateAccessToken(token) {
    try {
      const { SEKRET_KEY } = process.env
      const userData = jwt.verify(token, SEKRET_KEY)
      return userData
    } catch (error) {
      return null
    }
  }
  async validateRefreshToken(token) {
    try {
      const { SEKRET_KEY_REFRESH } = process.env
      const userData = await jwt.verify(token, SEKRET_KEY_REFRESH)
      return userData
    } catch (error) {
      return null
    }
  }
  async saveToken(collectionToken, userId, refreshToken) {
    const tokenData = await collectionToken.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await collectionToken.findOneAndUpdate(
        { user: userId },
        { $set: { refreshToken } },
      )
    }
    const token = await collectionToken.insertOne({
      user: userId,
      refreshToken,
    })
    return token
  }
  async findToken(collectionToken, refreshToken) {
    const tokenData = await collectionToken.findOne({ refreshToken })
    return tokenData
  }
}

module.exports = new TokenService()
