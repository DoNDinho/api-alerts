'use strict'
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
global.logger = require('./business/utils/configs/log4js.config')
const healthRoute = require('./client/routes/health')
const alertsRoutes = require('./client/routes/alerts.routes')
const Socket = require('./business/utils/socket/socket')
const { errorHandler } = require('./client/middlewares/error-handler/error-handler')
const port = process.env.PORT

const app = express()
const { Server: WebSocketServer } = require('socket.io')
const http = require('http')

// Configurando middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurando rutas
app.use(healthRoute)
app.use(alertsRoutes)

app.use(async (err, req, res, next) => {
  await errorHandler(err, res)
})

// Iniciando servidor
const server = http.createServer(app)
const httpServer = server.listen(port, () => {
  console.log('Servidor en puerto', port)
})
const io = new WebSocketServer(httpServer, {
  cors: { origin: '*' }
})
Socket.getInstance(io)
