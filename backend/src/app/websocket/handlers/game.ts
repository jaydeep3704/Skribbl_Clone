import type { Socket } from "socket.io";

interface Player{
    socket:string,
    username:string
}

interface Room{
    players:Player[],
    host:string
}






class Game{
     GameState:Map<string,Room>=new Map();
     
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
        socket.to(roomId).emit("room_joined",`User ${username} joined the room`)
     }

     joinRoom(socket:Socket,roomId:string,username:string){
         const room=this.GameState.get(roomId)
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
         socket.to(roomId).emit("room_joined",`User ${username} joined the room`,room?.players)
     }

     leaveRoom(socket:Socket,roomId:string){
         
     }

     printRoomState(roomId:string){
         const room=this.GameState.get(roomId)
         console.log("players",room?.players)
         console.log("host",room?.host)
     }
}

const game=new Game();

export {game}