const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const logger = require('morgan')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const api = require('./api')

const app = express()
dotenv.config()
const { PORT = 3000, DB_HOST } = process.env

const client = new MongoClient(DB_HOST)
client.connect(async (err, client) => {
  if (err) return console.log(err)
  console.log('Соединение установлено')
  app.locals.collection = client.db().collection('users')
  app.locals.collectionToken = client.db().collection('tokens')
  app.listen(PORT, () => {
    console.log(`Server srart on port=${PORT} ...`)
  })
})

app.use(cors())
app.use(express.json())
app.use(cookieParser())
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

app.use('/api/auth', api.auth)

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})
app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

// прослушиваем прерывание работы программы (ctrl-c)
process.on('SIGINT', () => {
  dbClient.close()
  process.exit()
})
