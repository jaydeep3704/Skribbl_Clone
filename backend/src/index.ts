import express from "express"
import dotenv from "dotenv"
import { createServer } from "http";
import cors from 'cors'
import { Server } from "socket.io";
dotenv.config();
const app=express();

const httpServer=createServer(app)

const cors_options={
    origin:"http://localhost:3000",
    credentials:true,
    methods:["GET","POST"]
}



const io=new Server(httpServer,{
    cors:cors_options
})

const PORT=process.env.PORT || 8000

httpServer.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);
  socket.on("message",(data)=>{
    console.log(data)
  })

});