const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()


app.use(bodyParser.json())

const corsOptions = {
    origin: process.env.FRONT_URL,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

morgan.token('requestBody', (request) => JSON.stringify(request.body))
app.use(morgan(' :method :url :response-time :requestBody'))
app.use('/api', require('./routes/routes'))

module.exports = app
