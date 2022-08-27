const ErrorHandler = require("../Utils/errorhandler");


module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    // Mongodb Wrong/Invalid ID Error
    if(err.name == "CastError"){
        const message = `Resource not found. Invalid: ${err.path} `;
    }


    res.status(err.statusCode).json({
        success:false,
        error:err.message
    });
};