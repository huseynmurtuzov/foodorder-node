"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const AccountController_1 = require("../controllers/AccountController");
router.route('/Login').post(AccountController_1.Login);
router.route('/Register').post(AccountController_1.Register);
router.route('/RegisterAsRestaurant').post(AccountController_1.RegisterAsRestaurant);
router.route('/RegisterAsDeliveryPersonnel').post(AccountController_1.RegisterAsDeliveryPersonnel);
router.route('/Logout').get(AccountController_1.Logout);
router.route('/AdminLogin').post(AccountController_1.AdminLogin);
exports.default = router;
