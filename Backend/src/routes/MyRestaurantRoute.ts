import express from "express"; 
import multer from "multer";

const router=express.Router() 

 
const storage=multer.memoryStorage() 

//validation for storage of file images  
const upload=multer({ 
    storage:storage, 
    limits:{ 
        fileSize:5*1024*1024 //5mb limit , 

    }
 })
//api/my/restaurant
//anytime we receive a post request, we will upload a imagefile  
router.post("/", upload.single("imageFile"), MyRestaurantController.createMyRestaurant )