import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    //check if there are any errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export const validateMyUserRequest = [
  //an array to include middleware for validation logic
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Countrymust be a string"), 
  handleValidationErrors,
];


export const validateMyRestaurantRequest=[  
  body("restaurantName").notEmpty().withMessage("Restaurant image is required ") ,
  body("city").notEmpty().withMessage("City is required ") ,
  body("country").notEmpty().withMessage("Country is required "), 
  body("deliveryPrice").isFloat({min:0}).withMessage("Delivery Price must be a positive number"),
  body("estimatedDeliveryTime").isInt({min:0}).withMessage("Estimated delivery time must be a positive number"), 
  body("cuisines").isArray().withMessage("Cuisine must be an array").not().isEmpty().withMessage("Cuisines array cannot be empty") , 
  body("menuItems").isArray().withMessage("Menu items must be an array"), 
  body("menuItems.*.name").notEmpty().withMessage("Menu item is required"),
  body("menuItems.*.price").isFloat().withMessage("Menu item price is required and must be a positive number ")


]