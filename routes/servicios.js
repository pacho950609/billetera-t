var express = require('express');
var controladores= require('.././controladores');
var router = express.Router();
var passport = require('passport');
var middleware = require('../middleware/middleware');


router.get('/billetera',middleware.isLogged , controladores.billetera.obtener);
router.put('/billetera',middleware.isLogged,controladores.billetera.modificar);
router.put('/enviar',middleware.isLogged,controladores.billetera.enviar);

router.get('/user',controladores.autenticacion.user);
router.get('/fail',controladores.autenticacion.fail);
router.get('/cerrar',middleware.isLogged,controladores.autenticacion.cerrar);


router.post('/log',passport.authenticate('local',{  successRedirect: '/api/user', failureRedirect:'/api/fail',}));  

module.exports = router ; 