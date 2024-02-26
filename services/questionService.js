const mongoose = require('mongoose');
const Question = require('../models/db/questionModel');
const crudRepository = require('../database/crudRepository');
const externalRepository = require('../database/externalRepository');

module.exports.create = async function(dataFromController) {
    const responseObj = { status: false };
    try {
        const question = new Question(dataFromController);
        const responseFromDatabase = await crudRepository.save(question);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-questionService-create: ', error);
    }
    return responseObj;
}

module.exports.findById = async function(questionId) {
    const responseObj = { status: false };
    try {
        const data = {
            _id: mongoose.Types.ObjectId(questionId),
            model: Question,
            projection: {
                __v: false
            }
        };
        const responseFromRepository = await crudRepository.findById(data);
        if (responseFromRepository.status) {
            responseObj.status = true;
            responseObj.result = responseFromRepository.result;
        }
    } catch (error){
        console.log('ERROR-questionService-findById: ', error);
    }
    return responseObj;
}

module.exports.findAll = async function(dataFromController) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {},
            model: Question,
            projection: {
                __v: false
            }
        };

        if (dataFromController.category) data.findQuery.category = dataFromController.category;
        if (dataFromController.type) data.findQuery.type = dataFromController.type;
        if (dataFromController.difficulty) data.findQuery.difficulty = dataFromController.difficulty;
        if (dataFromController.skip) data.findQuery.skip = dataFromController.skip;
        if (dataFromController.limit) data.findQuery.limit = dataFromController.limit;

        const responseFromDatabase = await crudRepository.find(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-questionService-findAll: ', error);
    }
    return responseObj;
}

module.exports.update = async function(question) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(question.id)
            },
            model: Question,
            projection: {
                __v: false
            },
            updateQuery: {}
        };
        if (question.category) data.updateQuery.category = question.category;
        if (question.type) data.updateQuery.type = question.type;
        if (question.difficulty) data.updateQuery.difficulty = question.difficulty;
        if (question.question) data.updateQuery.question = question.question;
        if (question.correct_answer) data.updateQuery.correct_answer = question.correct_answer;
        if (question.incorrect_answers) data.updateQuery.incorrect_answers = question.incorrect_answers;

        const responseFromDatabase = await crudRepository.findOneAndUpdate(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-questionService-update: ', error);
    }
    return responseObj;
}

module.exports.delete = async function(questionId) {
    const responseObj = { status: false };
    try {
        const data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(questionId)
            },
            model: Question,
            projection: {
                __v: false
            }
        };

        const responseFromDatabase = await crudRepository.findOneAndDelete(data);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-questionService-delete: ', error);
    }
    return responseObj;
}

module.exports.getQuestionListFromExternalApi = async function(result) {
    const responseObj = { status: false };
    try {
                
        const data = {
            findQuery: {
                amount: result.amount,
            },
            model: Question,
            projection: {
                __v: false
            }
        };
        
        const responseFromApi = await externalRepository.find(data);

        if (responseFromApi.status) {
            responseObj.status = responseFromApi.status;
            responseObj.body = responseFromApi.result;
        }
    } catch (error){
        console.log('ERROR-Service-getQuestionListFromExternalApi: ', error);
    }
    return responseObj;
}