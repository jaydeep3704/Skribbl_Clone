import server from "./app/app.ts"

const PORT=process.env.PORT || 8000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
