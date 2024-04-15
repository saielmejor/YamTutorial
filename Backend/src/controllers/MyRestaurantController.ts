import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary"
const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.find({ user: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });

        // data uri 
    }

    const image=req.file as Express.Multer.File // request file from multer 

    //convert the image to base64 

    const base64Image=Buffer.from(image.buffer).toString("base64") 
    const dataURI= `dat:${image.mimetype};base64, ${base64Image}` // data uri image 
    const uploadResponse=await cloudinary.v2.uploader.upload(dataURI)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
