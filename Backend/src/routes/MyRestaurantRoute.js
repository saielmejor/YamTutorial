"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const MyRestaurantController_1 = __importDefault(require("../controllers/MyRestaurantController"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
//validation for storage of file images  
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb limit , 
    }
});
// api to get restaurant page 
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, MyRestaurantController_1.default.getMyRestaurant);
//api/my/restaurant
//anytime we receive a post request, we will upload a imagefile   
router.post("/", upload.single("imageFile"), validation_1.validateMyRestaurantRequest, auth_1.jwtCheck, auth_1.jwtParse, MyRestaurantController_1.default.createMyRestaurant);
router.put("/", upload.single("imageFile"), validation_1.validateMyRestaurantRequest, auth_1.jwtCheck, auth_1.jwtParse, MyRestaurantController_1.default.updateMyRestaurant);
exports.default = router;
