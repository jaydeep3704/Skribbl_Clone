import type { Socket } from "socket.io";
import { type Player} from "./handlers/game.ts";
import { game } from "../../index.ts";
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

      //leave room 

socket.on("disconnect", () => {
  console.log("User disconnected", socket.id);
  
  game.GameState.forEach((room, roomId) => {
    const isInRoom = room.players.some(
      (p) => p.socket === socket.id
    );

    if (isInRoom) {
      game.leaveRoom(socket, roomId);
      socket.to(roomId).emit("user_left", socket.id);
    }
    
    game.printRoomState(roomId)
  });
  
});
      socket.on("leave_room",({roomId})=>{
         const rooms=socket.rooms
         if(rooms.has(roomId)){
           socket.leave(roomId)
           game.leaveRoom(socket,roomId)
         }
         game.printRoomState(roomId)
      })

}

export {handleConnection}