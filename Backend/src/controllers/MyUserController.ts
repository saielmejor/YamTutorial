import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  // check if the user exists
  // create the user if it doesn't exist
  // return the user object to the calling client

  try {
    //obtain the auth0id
    const { auth0id } = req.body;
    const existingUser = await User.findOne({ auth0id });
    //check existing user
    if (existingUser) {
      return res.status(200).send(); //return 200 status
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating the user " });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  // need to obtain the userId
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId); // finds the user from the database

    if (!user) {
      return res.status(404).json({ message: "user not found " });
    }
    //variables that will be updated
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;
    await user.save();
    res.send(user); // sends back the user back to the front end
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user " });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(currentUser); // pass currentUser
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export default {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
};
