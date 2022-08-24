const app = require("./app");
const dotenv = require("dotenv");

const connectDatabase = require("./Config/database");

// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shuting dwon the server due to UnCaught Exception`);
    process.exit(1);
});



// Configuring .Env file
dotenv.config({path:"Backend/Config/config.env"});


// Connecting to database
connectDatabase()
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT} `);
})


// Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });

});