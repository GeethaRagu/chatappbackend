import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/Config.js";
import authRoute from "./Routes/authRoute.js";
import messageRoute from "./Routes/messageRoute.js";
import userRoute from './Routes/userRoute.js';
import cookieParser from "cookie-parser";
//express
const app = express();

//config dotenv
dotenv.config();

//Middleware
app.use(express.json());
app.use(cors({
    origin:process.env.BASE,
    credentials:true
}));
app.use(cookieParser());
// DB connection
connectDB(); 

//Error handler

// custom routes
app.use('/api/auth',authRoute);
app.use('/api/message',messageRoute);
app.use('/api/user',userRoute);
//default route
app.get('/',(req,res)=>{
 res.send("Welcome to chat application")
});

//Listening to port
app.listen(process.env.PORT,()=>{
    console.log("Server is running successfully")
});

