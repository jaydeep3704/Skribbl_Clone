import { io } from "../../index.ts";

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);
  io.emit("to_client","Hello from server")
  socket.on("message",(data)=>{
    console.log(data)
  })
});