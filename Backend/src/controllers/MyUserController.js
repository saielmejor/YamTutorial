"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const createCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user exists
    // create the user if it doesn't exist
    // return the user object to the calling client
    try {
        //obtain the auth0id
        const { auth0id } = req.body;
        const existingUser = yield user_1.default.findOne({ auth0id });
        //check existing user
        if (existingUser) {
            return res.status(200).send(); //return 200 status
        }
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        res.status(201).json(newUser.toObject());
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating the user " });
    }
});
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // need to obtain the userId
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = yield user_1.default.findById(req.userId); // finds the user from the database
        if (!user) {
            return res.status(404).json({ message: "user not found " });
        }
        //variables that will be updated
        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;
        yield user.save();
        res.send(user); // sends back the user back to the front end
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user " });
    }
});
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.default.findOne({ _id: req.userId });
        if (!currentUser) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json(currentUser); // pass currentUser
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser,
};
