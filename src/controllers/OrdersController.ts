import { Request,Response } from "express"
import dataSource from "../dataSource/dataSource"
import { Order } from "../models/Order"
import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../errors/not-found"
import { orderStatus } from "../utils/enums/orderStatus"
import { ServerError } from "../errors/server"
import { BadRequestError } from "../errors/bad-request"
import { Restaurant } from "../models/Restaurant"
import { DeliveryPersonnel } from "../models/DeliveryPersonnel"
import { Customer } from "../models/Customer"
import { shuffleDeliveryPersonnels } from "../utils/functions/shuffleDeliveryPersonnels"
import { checkMeals } from "../utils/functions/checkMeals"
import { Meal } from "../models/Meal"
import { Payment } from "../models/Payment"
const orderRepo = dataSource.getRepository(Order)
const restaurantRepo = dataSource.getRepository(Restaurant)
const deliveryPersonnelRepo = dataSource.getRepository(DeliveryPersonnel)
const customerRepo = dataSource.getRepository(Customer)


const GetAllOrders = async(req:Request,res:Response):Promise<void> => {
    const orders = await orderRepo.find();
    res.status(StatusCodes.OK).json({orders})
}

const GetOrderById = async(req:Request,res:Response):Promise<void> => {
    const order = await orderRepo.findOne({where:{id:Number(req.params.id)}})
    if(!order){
        throw new NotFoundError("There is no order with given id!")
    }
    res.status(StatusCodes.OK).json({order})
}

const SetAsDelivered = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    let order = await orderRepo.findOne({where:{id:Number(id)}});
    if(!order){
        throw new NotFoundError("There is no order with given id")
    }
    order.status = orderStatus.DELIVERED;
    try {
        await orderRepo.save(order);
        res.status(StatusCodes.OK).json({order})
    } catch (error) {
        throw new ServerError("There is some problem!")   
    }
}

const SetAsPrepared = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    let order = await orderRepo.findOne({where:{id:Number(id)}});
    if(!order){
        throw new NotFoundError("There is no order with given id")
    }
    order.status = orderStatus.PREPARED;
    try {
        await orderRepo.save(order);
        res.status(StatusCodes.OK).json({order})
    } catch (error) {
        throw new ServerError("There is some problem!")   
    }
}


//u gotta come back to that
const AddOrder = async(req:Request,res:Response):Promise<void> => {
    const {customerId,restaurantId,meals,paymentMethod} = req.body;
    if(!meals || !customerId || !restaurantId){
        throw new BadRequestError("Please provide all the values");
    }
    const restaurant = await restaurantRepo.findOne({where:{id:Number(restaurantId)}});
    const customer = await customerRepo.findOne({where:{id:Number(customerId)}});
    if(!restaurant){
        throw new NotFoundError("There is no restaurant with given id!")
    }
    if(!customer){
        throw new NotFoundError("There is no customer with given id!")
    }
    let checkMeal = await checkMeals(meals);
    if(!checkMeal){
        throw new BadRequestError("There is a problem about meal you have entered!")
    }
    let realMeals = [];
    let totalAmount = 0
    for (let meal of meals) {
        let newMeal = new Meal();
        newMeal.id = meal.id;
        newMeal.image = meal.image;
        newMeal.description = meal.description;
        newMeal.isAvailable = meal.isAvailable;
        newMeal.name = meal.name;
        newMeal.price = meal.price;
        newMeal.quantity = meal.quantity;
        newMeal.rating = meal.rating;
        newMeal.restaurant = restaurant;
        newMeal.orders = meal.orders
        realMeals.push(newMeal)
        totalAmount+=meal.price
    }
    let newOrder = new Order();


    let newPayment = new Payment()
    newPayment.amount = totalAmount;
    newPayment.date = new Date();
    newPayment.paymentMethod = paymentMethod;
    newPayment.order = newOrder;
    
    let deliveryPersonnelForOrder = await shuffleDeliveryPersonnels();
    newOrder.customer=customer;
    newOrder.deliveryPersonnel = deliveryPersonnelForOrder;
    newOrder.meals=realMeals;
    newOrder.orderDate = new Date();
    newOrder.payment = newPayment;
    newOrder.restaurant = restaurant;
    newOrder.status = orderStatus.PENDING;
    newOrder.totalAmount = totalAmount
    try {
        const savedReview = await orderRepo.save(newOrder);
        res.status(StatusCodes.CREATED).json({savedReview})
    } catch (error) {
        throw new ServerError("There is some problem!")   
    }
}

const CancelOrder = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    let order = await orderRepo.findOne({where:{id:Number(id)}});
    if(!order){
        throw new NotFoundError("There is no order with given id")
    }
    order.status = orderStatus.CANCELLED;
    try {
        await orderRepo.save(order);
        res.status(StatusCodes.OK).json({order})
    } catch (error) {
        throw new ServerError("There is some problem!")   
    }
}

const GetOrdersByRestaurant = async(req:Request,res:Response):Promise<void> => {
    const {restaurantId} = req.params
    if(!restaurantId){
        throw new BadRequestError("Id is null")
    }
    try {
        let restaurant = await restaurantRepo.findOne({where:{id:Number(restaurantId)}})
        if(!restaurant){
            throw new NotFoundError("There is no restaurant with given id!")
        }
        let orders = await orderRepo.find({where:{restaurant:restaurant}})
        res.status(StatusCodes.OK).json({orders})
    } catch (error) {
        throw new ServerError("There was some problem during fetching restaurant orders")
    }
}

const GetOrdersByCustomer = async(req:Request,res:Response):Promise<void> => {
    const {customerId} = req.params
    if(!customerId){
        throw new BadRequestError("Id is null")
    }
    try {
        let customer = await customerRepo.findOne({where:{id:Number(customerId)}})
        if(!customer){
            throw new NotFoundError("There is no customer with given id!")
        }
        let orders = await orderRepo.find({where:{customer:customer}})
        res.status(StatusCodes.OK).json({orders})
    } catch (error) {
        throw new ServerError("There was some problem during fetching customer orders")
    }
}

const GetOrdersByDeliveryPersonnel = async(req:Request,res:Response):Promise<void> => {
    const {deliveryPersonnelId} = req.params
    if(!deliveryPersonnelId){
        throw new BadRequestError("Id is null")
    }
    try {
        let deliveryPersonnel = await deliveryPersonnelRepo.findOne({where:{id:Number(deliveryPersonnelId)}})
        if(!deliveryPersonnel){
            throw new NotFoundError("There is no delivery personnel with given id!")
        }
        let orders = await orderRepo.find({where:{deliveryPersonnel:deliveryPersonnel}})
        res.status(StatusCodes.OK).json({orders})
    } catch (error) {
        throw new ServerError("There was some problem during fetching delivery personnel orders")
    }
}

export default {
    GetAllOrders,
    GetOrderById,
    AddOrder,
    SetAsPrepared,
    SetAsDelivered,
    CancelOrder,
    GetOrdersByCustomer,
    GetOrdersByDeliveryPersonnel,
    GetOrdersByRestaurant
}