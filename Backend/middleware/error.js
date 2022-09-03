const ErrorHandler = require("../Utils/errorhandler");


module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    // Mongodb Wrong/Invalid ID Error
    if(err.name == "CastError"){
        const message = `Resource not found. Invalid: ${err.path} `;
        err = new ErrorHandler(message,404);
    }



    // Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,404);
    }


    //  Wrong JWT Error
    if(err.name == "JsonWebTokenError"){
        const message = `Json web Token is Invalid, try again.`;
        err = new ErrorHandler(message,404);
    }


    //  JWT Expire Error
    if(err.name == "TokenExpireError"){
        const message = `Json web Token is Expire, try again.`;
        err = new ErrorHandler(message,404);
    }


    res.status(err.statusCode).json({
        success:false,
        error:err.message
    });
};