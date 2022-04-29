const sockethandler = (socket)=>{
  socket.on('disconnect', () => {
      socket.disconnect();
      console.log('User disconnected!');
    });
    socket.on('BE-check-user', ({ roomId, userName }) => {
   let error = false;

   io.sockets.in(roomId).clients((err, clients) => {
     clients.forEach((client) => {
       if (socketList[client] == userName) {
         error = true;
       }
     });
     socket.emit('FE-error-user-exist', { error });
   });
 });

}
export default sockethandler
