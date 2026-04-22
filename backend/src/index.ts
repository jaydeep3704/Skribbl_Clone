import express from "express"
import dotenv from "dotenv"
import { createServer } from "http";
import cors from 'cors'
import { Server } from "socket.io";
import { handleConnection } from "./app/websocket/socket.ts";
import { Game } from "./app/websocket/handlers/game.ts";

dotenv.config();
const app=express();

const httpServer=createServer(app)

const cors_options={
    origin:"*",
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

io.on("connection",handleConnection)
const game=new Game(io);

export {game}
