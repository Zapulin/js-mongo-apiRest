const questionService = require('../services/questionService');
const tokenValidation = require('../middlewares/tokenValidation')
const Question = require('../models/db/questionModel');


module.exports.create = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const data = req.body;
        const responseFromService = await questionService.create(data);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'Question created successfully';
            responseObj.status = 201;
        }
    } catch(error) {
        console.log('ERROR-questionController-create: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.findById = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const questionId = req.params.id;
        const responseFromService = await questionService.findById(questionId);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = 'Question fetched successfully';
                responseObj.status = 200;
            } else {
                responseObj.message = 'Question not found';
                responseObj.status = 404;
            }
        }
    } catch(error) {
        console.log('ERROR-questionController-findById: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.findAll = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const data = {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        };
        const responseFromService = await questionService.findAll(data);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = 'Questions fetched successfully';
                responseObj.status = 200;
            } else {
                responseObj.message = 'No questions found';
                responseObj.status = 404;
            }
        }
    } catch(error) {
        console.log('ERROR-questionController-findAll: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.update = async function(req, res) {
    let responseObj = { status: 500, message: 'Internal server error' };
    try {
        const question = req.body;
        question.id = req.params.id;
        const responseFromService = await questionService.update(question);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'Question updated successfully';
            responseObj.status = 200;
        }
    } catch(error) {
        console.log('ERROR-questionController-update: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.delete = async function(req, res) {
    let responseObj = { status: 500, message: 'Internal server error' };
    try {
        const questionId = req.params.id;
        const responseFromService = await questionService.delete(questionId);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'Question removed successfully';
            responseObj.status = 200;
        }
    } catch(error) {
        console.log('ERROR-questionController-delete: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}


module.exports.getAdvancedList = async function(req, res) {
    let responseObj = { status: 500, message: 'Internal server error' };
    try {
        const data = {
            category: req.query.category,
            type: req.query.type,
            difficulty: req.query.difficulty
        };

        const responseFromService = await questionService.findAll(data);
        
        if (responseFromService.status) {
            responseObj = responseFromService;
            responseObj.message = 'Questions fetched succefully from api';
            responseObj.status = 200;
        }else {
            responseObj.message = 'No questions found';
            responseObj.status = 404;
        }
    } catch(error) {
        console.log('ERROR-questionController-getListFromApi: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.getListFromApi = async function(req, res) {
    let responseObj = { status: 500, message: 'Internal server error' };
    try {
        const data = {
            amount: parseInt(req.query.amount)
        };

        const responseFromApi = await questionService.getQuestionListFromExternalApi(data);
        
        if (responseFromApi.status) {
            responseObj = responseFromApi;
            responseObj.message = 'Questions fetched succefully from api';
            responseObj.status = 200;

            if(tokenValidation.hasToken(req)){
                Question.create(responseFromApi.body.results)
                responseObj.message = 'Questions fetched succefully and saved';
                responseObj.status = 201;

            }else{
                responseObj.message = 'Questions fetched succefully from api but not saved';
            }

        } else {
            responseObj.message = 'No questions found';
            responseObj.status = 404;
        }
    } catch(error) {
        console.log('ERROR-questionController-getListFromApi: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}