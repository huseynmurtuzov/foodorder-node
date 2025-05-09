"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Customer_1 = require("../models/Customer");
const DeliveryPersonnel_1 = require("../models/DeliveryPersonnel");
const Meal_1 = require("../models/Meal");
const Notification_1 = require("../models/Notification");
const Order_1 = require("../models/Order");
const Payment_1 = require("../models/Payment");
const Restaurant_1 = require("../models/Restaurant");
const RestaurantReview_1 = require("../models/RestaurantReview");
const BaseUser_1 = require("../models/BaseUser");
dotenv_1.default.config();
const dataSource = new typeorm_1.DataSource({
    type: 'mssql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    synchronize: true,
    database: "OrderFood",
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    entities: [
        Customer_1.Customer,
        DeliveryPersonnel_1.DeliveryPersonnel,
        Meal_1.Meal,
        Notification_1.Notification,
        Order_1.Order,
        Payment_1.Payment,
        Restaurant_1.Restaurant,
        RestaurantReview_1.RestaurantReview,
        BaseUser_1.User
    ]
});
exports.default = dataSource;
