import express from 'express'
import http from 'http'
import SocketIO from 'socket.io'

const app = express()
const httpServer = http.createServer(app)
const io = SocketIO(httpServer)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => { 
  console.log('User connected...')
})

httpServer.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000')
})

