 import express from "express"; 
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router=express.Router() 

 
const storage=multer.memoryStorage() 

//validation for storage of file images  
const upload=multer({ 
    storage:storage, 
    limits:{ 
        fileSize:5*1024*1024 //5mb limit , 

    }
 })

 // api to get restaurant page 

 router.get("/", jwtCheck,jwtParse,MyRestaurantController.getMyRestaurant)
//api/my/restaurant
//anytime we receive a post request, we will upload a imagefile   
router.post("/", upload.single("imageFile"),validateMyRestaurantRequest,jwtCheck,jwtParse,MyRestaurantController.createMyRestaurant)

export default router