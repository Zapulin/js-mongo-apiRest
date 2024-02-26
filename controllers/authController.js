const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

module.exports.login = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const user = req.body;
        const responseFromService = await authService.login(user);
        if (responseFromService.status) {
            if(responseFromService.result) {
                const token = jwt.sign(
                    { userId: responseFromService.result._id },
                    process.env.SECRET_KEY,
                    { expiresIn: '8h' }
                )
                responseObj.body = { token: token };
                responseObj.message = 'User authenticated successfully';
                responseObj.status = 200;
            } else {
                responseObj.message = 'Invalid credentials';
                responseObj.status = 400;
            }
        }
    } catch(error) {
        console.log('ERROR-filmController-login: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.register = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const data = req.body;
        const responseFromService = await authService.register(data);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = 'User registered successfully';
            responseObj.status = 201;
        }
    } catch(error) {
        console.log('ERROR-authController-register: ', error);
    }
    return res.status(responseObj.status).send(responseObj);
}