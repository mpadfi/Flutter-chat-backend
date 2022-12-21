const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket')

// Mensajes de Sockets
io.on('connection', client => {
  
  console.log('Cliente contectado')
  
  // revisar que venga el token en la conexión
  const token = client.handshake.headers['x-token'];
  const [ valido, uid ] = comprobarJWT(token);

  // Desconectar si no viene token
  if( !valido ) { return client.disconnect();}

  // Cliente autenticado
  usuarioConectado( uid );

  // Ingresar al usuario a una sala concreta
  client.join( uid )

  // Escucharl el mensaje personal
  client.on('mensaje-personal', async (payload) => {
    // GRABAR MENSAJE
    await grabarMensaje(payload)
    // emitimos el mensaje al uid del usuario al que enviamos el mensaje (para del payload)
    io.to(payload.para).emit('mensaje-personal', payload);
  });


  client.on('disconnect', () => { 
    usuarioDesconectado(uid);
    // console.log('Cliente desconectado')
  });

});