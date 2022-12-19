/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/new', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email no es válido').isEmail(),
  check('password', 'Al menos 6 caracteres').not().isEmpty().isLength({ min: 6 }),
  validarCampos
] ,crearUsuario)

router.post('/', [
  check('email', 'El email no es válido').isEmail(),
  check('password', 'Al menos 6 caracteres').not().isEmpty().isLength({ min: 6 }),
], login)

// validarJWT,
router.get('/renew', validarJWT, renewToken)


module.exports = router;

