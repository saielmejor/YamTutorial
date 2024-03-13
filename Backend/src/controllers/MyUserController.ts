import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  // check if the user exists
  // create the user if it doesn't exist
  // return the user object to the calling client

  try {
    //obtain the auth0id 
    const {auth0id}=req.body; 
    const existingUser=await User.findOne({auth0id}) 
    //check existing user 
    if ( existingUser){ 
        return res.status(200).send() //return 200 status
    } 
    const newUser=new User(req.body)
    await newUser.save()
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating the user " });
  }
};

export default {
  createCurrentUser,
};
