import type { Socket } from "socket.io";
import {game} from "./handlers/game.ts";
function handleConnection(socket:Socket){

      //user connected to the server
       console.log("User connected",socket.id)

      //broadcast the message to all the connected clients  
       socket.broadcast.emit("user_joined",`User ${socket.id} joined the server`)
       
      //join room 
      socket.on("join_room",({roomId,username})=>{
           if(!game.roomExists(roomId)){
             game.createRoom(socket,roomId,username)
           }
           else{
             game.joinRoom(socket,roomId,username)
           }
           game.printRoomState(roomId)
      })
}

export {handleConnection}