const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const arraySchema = Joi.array().items(Joi.string())

module.exports = {
    createQuestionSchema: Joi.object({
        category: Joi.string(),
        type: Joi.string(),
        difficulty: Joi.string(),
        question: Joi.string(),
        correct_answer: Joi.string(),
        incorrect_answers: Joi.alternatives().try(arraySchema)
    }),

    questionIdSchema: Joi.object({
        id: Joi.objectId().required()
    }),

    getQuestionListSchema: Joi.object({
        skip: Joi.number().integer().optional(),
        limit: Joi.number().integer().optional()
    }).and('skip', 'limit'),

    getQuestionListFromApiSchema: Joi.object({
        amount: Joi.number().integer().required(),
    }),

    getQuestionAdvancedListSchema: Joi.object({
        category: Joi.string().optional(),
        type: Joi.string().optional(),
        difficulty: Joi.string().optional(),
    }),

    updateQuestionSchema: Joi.object({
        category: Joi.string().optional(),
        type: Joi.string().optional(),
        difficulty: Joi.string().optional(),
        question: Joi.string().optional(),
        correct_answer: Joi.string().optional(),
        incorrect_answers: Joi.alternatives().try(arraySchema).optional()
    })
}