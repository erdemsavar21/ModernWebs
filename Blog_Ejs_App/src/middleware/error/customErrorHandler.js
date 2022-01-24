const CustomError = require('../../helpers/error/customError');

const customErrorHandler = (err, req, res, next) => {

    let customError = new CustomError(err.message,500);
    //res.json({ErrorName:customError.name,message:`Error: ${customError.message}` });
    res.render('errorPage',{status: customError.status, message: customError.message});

};

module.exports = customErrorHandler;