// import {io} from "../bin/www";
// const {io} = require('../bin/www')


const handleChat = io => {
  io.on('connection', (socket) => {
    console.log('Connected');
    // socket.on('message', (data) => {
    //   console.log('Your Message: ', data);
    //   console.log(io)
    //   // io.emit('message', data);
    // });
    socket.on('joinRoom', (room) => {

      console.log(`${socket.id} just joined room ${room}`);

      socket.join(room);

      io.to(room).emit('roomJoined', `${socket.id} just joined the room`);
  });
  });
}

module.exports = handleChat