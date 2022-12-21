const { response } = require('express');
const Usuario = require('../models/usuario_model');

const getUsuarios = async (req, res = response) => {

  try {

    // Paginación
    const desde = Number( req.query.desde ) || 0; 
    const usuarios = await Usuario
          .find({ _id: { $ne: req.uid } }) // retornamos los conectados menos el usuario actual
          .sort('-online')
          .skip(desde)
          .limit(20)

    if (usuarios){
      res.json({
        ok: true,
        usuarios
      })
    }
    
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
  getUsuarios
}