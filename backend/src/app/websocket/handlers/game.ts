import type { Server, Socket } from "socket.io";

export interface Player{
    socket:string,
    username:string
}

interface Room{
    players:Player[],
    host:string
}

 class Game{
     private io:Server;
     GameState:Map<string,Room>=new Map();
     
    constructor(socketServer:Server){
        this.io=socketServer
    }


     roomExists(roomId:string):boolean{
        return this.GameState.has(roomId)
     }

     createRoom(socket:Socket,roomId:string,username:string){
        this.GameState.set(roomId,{
            host:socket.id,
            players:[]            
        })

        const room=this.GameState.get(roomId)
        room?.players.push({
            socket:socket.id,
            username
        })
        socket.join(roomId)
        this.io.to(roomId).emit("room_joined",`User ${username} joined the room`)
     }

     joinRoom(socket:Socket,roomId:string,username:string){
         const room=this.GameState.get(roomId)
         if(!room) console.log("This room doesn't exist")
         const alreadyJoined=room?.players.forEach((player)=>{
            if(player.socket===socket.id){
                return true;
            }
         })
         if(alreadyJoined) return
         room?.players.push({
            socket:socket.id,
            username
         })
         socket.join(roomId)
         this.io.to(roomId).emit("room_joined",`User ${username} joined the room`)
           this.io.to(roomId).emit("players",room?.players)
     }

     leaveRoom(socket:Socket,roomId:string){
         const room=this.GameState.get(roomId)!
         room.players=room?.players.filter((player)=>{
             if(player.socket!=socket.id){
                return player
             }
         })
         
         this.io.to(roomId).emit("players",room.players)
         if(room.players.length==0){
            this.GameState.delete(roomId)
            console.log("Room deleted")
         }
         else{
            room.host=room.players[0]?.socket as string
         }
     }

     printRoomState(roomId:string){
         const room=this.GameState.get(roomId)
         console.log("players",room?.players)
         console.log("host",room?.host)
     }
}

export {Game}