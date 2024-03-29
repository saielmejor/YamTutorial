import express, {Request,Response} from "express" 
import cors from "cors" 
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute"

mongoose.connect(process.env.MONGODB_URI as string).then(()=>{ console.log("Connected to database")})

const app=express() 
app.use(express.json()) 
app.use(cors()) 

//define an endpoint 
app.use("/api/my/user",myUserRoute)

app.listen(8000, ()=>{ 
    console.log("Server started on localhost:8000 ")
    console.log('You are connected to the  world ')
})