const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const authSchemas = require('../models/joi/authSchemas');

router.post('/register', 
    joiSchemaValidation.validate(authSchemas.registerSchema, 'body'),
    authController.register);

router.post('/login',
    joiSchemaValidation.validate(authSchemas.loginSchema, 'body'),
    authController.login);
  
module.exports = router;