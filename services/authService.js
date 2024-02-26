const crudRepository = require('../database/crudRepository');
const User = require('../models/db/userModel');

module.exports.login = async function(user) {
    const responseObj = {status: false};
    try {
        const data = {
            findQuery: {
                username: user.username,
                password: user.password
            },
            model: User,
        };
        const responseFromRepository = await crudRepository.findOne(data);

        if(responseFromRepository.status){
            responseObj.result = responseFromRepository.result;
            responseObj.status = true;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-userService-login: ${error}`);
    }
    return responseObj;
}

module.exports.register = async function(dataFromController) {
    const responseObj = { status: false };
    try {
        const user = new User(dataFromController);
        const responseFromDatabase = await crudRepository.save(user);
        if (responseFromDatabase.status) {
            responseObj.status = true;
            responseObj.result = responseFromDatabase.result;
        }
    } catch (error){
        console.log('ERROR-userService-register: ', error);
    }
    return responseObj;
}