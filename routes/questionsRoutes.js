const express = require('express');
const questionController = require('../controllers/questionController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const questionSchemas = require('../models/joi/questionSchemas');
const tokenValidation = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/create', 
    tokenValidation.validate,
    joiSchemaValidation.validate(questionSchemas.createQuestionSchema, 'body'),
    questionController.create);

router.get('/details/:id',
    joiSchemaValidation.validate(questionSchemas.questionIdSchema, 'path'),
    questionController.findById);

router.get('/list',
    joiSchemaValidation.validate(questionSchemas.getQuestionListSchema, 'query'),
    questionController.findAll);

router.put('/update/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(questionSchemas.questionIdSchema, 'path'),
    joiSchemaValidation.validate(questionSchemas.updateQuestionSchema, 'body'),
    questionController.update);

router.delete('/delete/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(questionSchemas.questionIdSchema, 'path'),
    questionController.delete);

    router.get('/listFromExternalApi',
    joiSchemaValidation.validate(questionSchemas.getQuestionListFromApiSchema, 'query'),
    questionController.getListFromApi);
    
    router.get('/advancedList',
    joiSchemaValidation.validate(questionSchemas.getQuestionAdvancedListSchema, 'query'),
    questionController.getAdvancedList);  

module.exports = router;