const axios = require('axios')

module.exports.find = async (data) => {
    let responseObj = { status: false };
    try {
        
        const docs = await axios.get('https://opentdb.com/api.php',{
            params: data.findQuery
        });
        
        responseObj = {
            result: docs.data,
            status: true
        };

    } catch (error) {
        responseObj.error = error;
        console.log('ERROR-crudRepository-find: ', error);
    }
    return responseObj;
};