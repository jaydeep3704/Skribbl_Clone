import {Server} from "socket.io"
import {server} from "../app.ts"
import type {Server as ServerType} from "socket.io"

const io:ServerType=new Server(server)

io.on("connection",(socket)=>{
    console.log("A user connected");
})