import express, {Request,Response} from "express" 
import cors from "cors" 
import "dotenv/config"
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute" 
import {v2 as cloudinary} from "cloudinary" // exports the version 2 of the cloudinary 

mongoose.connect(process.env.MONGODB_URI as string).then(()=>{ console.log("Connected to database")})

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
})
const app=express() 
app.use(express.json()) 
app.use(cors()) 

app.get("/health",async(req:Request,res:Response)=>{ 
    res.send({message:"health OK!"})
})
//define an endpoint 
app.use("/api/my/user",myUserRoute)

app.listen(8000, ()=>{ 
    console.log("Server started on localhost:8000 ")
    console.log('You are connected to the  world ')
})