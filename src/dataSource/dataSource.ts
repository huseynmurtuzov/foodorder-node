import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { Customer } from "../models/Customer";
import { DeliveryPersonnel } from "../models/DeliveryPersonnel";
import { Meal } from "../models/Meal";
import { Notification } from "../models/Notification";
import { Order } from "../models/Order";
import { Payment } from "../models/Payment";
import { Restaurant } from "../models/Restaurant";
import { RestaurantReview } from "../models/RestaurantReview";
import { User } from "../models/BaseUser";
dotenv.config()
const dataSource = new DataSource({
    type:'mssql',
    host:process.env.DATABASE_HOST,
    port:Number(process.env.DATABASE_PORT),
    synchronize:true,
    database:"OrderFood",
    username:process.env.DATABASE_USERNAME,
    password:process.env.DATABASE_PASSWORD,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    entities:[
        Customer,
        DeliveryPersonnel,
        Meal,
        Notification,
        Order,
        Payment,
        Restaurant,
        RestaurantReview,
        User
    ]

})

export default dataSource