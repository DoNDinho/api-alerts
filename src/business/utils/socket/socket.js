class Socket {
  constructor(io) {
    this.io = io
    this.io.on('connection', (socket) => {
      console.log('nuevo usuario conectado ', socket.id)
      this.emit = function (event, data) {
        this.io.emit(event, data)
      }
      this.emit('pedidos', 'pediosss')
    })
  }

  static getInstance(io) {
    if (!Socket.instance) {
      if (!io) throw new Error('El IO es requerido')
      Socket.instance = new Socket(io)
      console.log('Socket instanciado')
    }
    return Socket.instance
  }
}

module.exports = Socket
