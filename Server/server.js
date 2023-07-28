const app = require("./app");
const dotenv=require("dotenv");
const connectdb = require("./database");
const cloudnary = require("cloudinary");


// handeling uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err}`);
    console.log("Shutting down the server due to uncaught exception");
    server.close(()=>{
        process.exit(1);
    })

})


// config
dotenv.config({ path: "/.env" });


connectdb();
cloudnary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

let port=  process.env.PORT ||3000 ;
const server=app.listen(port,()=>{
    console.log(`server is Working on ${port}`);
})

// console.log(hi);

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled error");
    server.close(()=>{
        process.exit(1);
    })
})