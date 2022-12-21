const Mensaje = require('../models/mensaje_model');

const obtenerChat = async (req, res) => {

  const miId = req.uid; // lo obtenemos de validarJWT
  const mensajesDe = req.params.de; // del argumento de la ruta

  const last30 = await Mensaje.find({
    $or: [{ de: miId, para: mensajesDe}, { de: mensajesDe, para: miId}]
  })
  .sort({ createdAt: 'desc' })
  .limit(30)

  res.json({
    ok: true,
    mensajes: last30
  })
}

module.exports = {
  obtenerChat
}