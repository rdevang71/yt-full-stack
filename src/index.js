//  require('dotenv').config({path:'./env'})
import connectDB from "./db/index.js";
import { app } from "./app.js";

import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})


connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log(`Error in connectiong databae ERROR:`,error);
        throw error;
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at PORT:${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("Mongodb connection ERROR :",error)
})



// import mongoose from "mongoose"; 
// import { DB_NAME } from "./constants";


// import express from "express";
// const app = express();
// ( async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`)
//        app.on("error",(error)=>{
//               console.log("ERROR:",error);
//               throw error;
//        })
//        app.listen(process.env.PORT,()=>{
//               console.log(`App is listening on PORT ${process.env.PORT}`)
//        })
//     } catch (error) {
//         console.error("ERROR: ",error)
//         throw error
//     }
// } )()