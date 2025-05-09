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
const dataSource_1 = __importDefault(require("../dataSource/dataSource"));
const Order_1 = require("../models/Order");
const http_status_codes_1 = require("http-status-codes");
const not_found_1 = require("../errors/not-found");
const orderStatus_1 = require("../utils/enums/orderStatus");
const server_1 = require("../errors/server");
const bad_request_1 = require("../errors/bad-request");
const Restaurant_1 = require("../models/Restaurant");
const DeliveryPersonnel_1 = require("../models/DeliveryPersonnel");
const Customer_1 = require("../models/Customer");
const shuffleDeliveryPersonnels_1 = require("../utils/functions/shuffleDeliveryPersonnels");
const checkMeals_1 = require("../utils/functions/checkMeals");
const Meal_1 = require("../models/Meal");
const Payment_1 = require("../models/Payment");
const orderRepo = dataSource_1.default.getRepository(Order_1.Order);
const restaurantRepo = dataSource_1.default.getRepository(Restaurant_1.Restaurant);
const deliveryPersonnelRepo = dataSource_1.default.getRepository(DeliveryPersonnel_1.DeliveryPersonnel);
const customerRepo = dataSource_1.default.getRepository(Customer_1.Customer);
const GetAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderRepo.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ orders });
});
const GetOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderRepo.findOne({ where: { id: Number(req.params.id) } });
    if (!order) {
        throw new not_found_1.NotFoundError("There is no order with given id!");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ order });
});
const SetAsDelivered = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let order = yield orderRepo.findOne({ where: { id: Number(id) } });
    if (!order) {
        throw new not_found_1.NotFoundError("There is no order with given id");
    }
    order.status = orderStatus_1.orderStatus.DELIVERED;
    try {
        yield orderRepo.save(order);
        res.status(http_status_codes_1.StatusCodes.OK).json({ order });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
const SetAsPrepared = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let order = yield orderRepo.findOne({ where: { id: Number(id) } });
    if (!order) {
        throw new not_found_1.NotFoundError("There is no order with given id");
    }
    order.status = orderStatus_1.orderStatus.PREPARED;
    try {
        yield orderRepo.save(order);
        res.status(http_status_codes_1.StatusCodes.OK).json({ order });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
//u gotta come back to that
const AddOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, restaurantId, meals, paymentMethod } = req.body;
    if (!meals || !customerId || !restaurantId) {
        throw new bad_request_1.BadRequestError("Please provide all the values");
    }
    const restaurant = yield restaurantRepo.findOne({ where: { id: Number(restaurantId) } });
    const customer = yield customerRepo.findOne({ where: { id: Number(customerId) } });
    if (!restaurant) {
        throw new not_found_1.NotFoundError("There is no restaurant with given id!");
    }
    if (!customer) {
        throw new not_found_1.NotFoundError("There is no customer with given id!");
    }
    let checkMeal = yield (0, checkMeals_1.checkMeals)(meals);
    if (!checkMeal) {
        throw new bad_request_1.BadRequestError("There is a problem about meal you have entered!");
    }
    let realMeals = [];
    let totalAmount = 0;
    for (let meal of meals) {
        let newMeal = new Meal_1.Meal();
        newMeal.id = meal.id;
        newMeal.image = meal.image;
        newMeal.description = meal.description;
        newMeal.isAvailable = meal.isAvailable;
        newMeal.name = meal.name;
        newMeal.price = meal.price;
        newMeal.quantity = meal.quantity;
        newMeal.rating = meal.rating;
        newMeal.restaurant = restaurant;
        newMeal.orders = meal.orders;
        realMeals.push(newMeal);
        totalAmount += meal.price;
    }
    let newOrder = new Order_1.Order();
    let newPayment = new Payment_1.Payment();
    newPayment.amount = totalAmount;
    newPayment.date = new Date();
    newPayment.paymentMethod = paymentMethod;
    newPayment.order = newOrder;
    let deliveryPersonnelForOrder = yield (0, shuffleDeliveryPersonnels_1.shuffleDeliveryPersonnels)();
    newOrder.customer = customer;
    newOrder.deliveryPersonnel = deliveryPersonnelForOrder;
    newOrder.meals = realMeals;
    newOrder.orderDate = new Date();
    newOrder.payment = newPayment;
    newOrder.restaurant = restaurant;
    newOrder.status = orderStatus_1.orderStatus.PENDING;
    newOrder.totalAmount = totalAmount;
    try {
        const savedReview = yield orderRepo.save(newOrder);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ savedReview });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
const CancelOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let order = yield orderRepo.findOne({ where: { id: Number(id) } });
    if (!order) {
        throw new not_found_1.NotFoundError("There is no order with given id");
    }
    order.status = orderStatus_1.orderStatus.CANCELLED;
    try {
        yield orderRepo.save(order);
        res.status(http_status_codes_1.StatusCodes.OK).json({ order });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
const GetOrdersByRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = req.params;
    if (!restaurantId) {
        throw new bad_request_1.BadRequestError("Id is null");
    }
    try {
        let restaurant = yield restaurantRepo.findOne({ where: { id: Number(restaurantId) } });
        if (!restaurant) {
            throw new not_found_1.NotFoundError("There is no restaurant with given id!");
        }
        let orders = yield orderRepo.find({ where: { restaurant: restaurant } });
        res.status(http_status_codes_1.StatusCodes.OK).json({ orders });
    }
    catch (error) {
        throw new server_1.ServerError("There was some problem during fetching restaurant orders");
    }
});
const GetOrdersByCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    if (!customerId) {
        throw new bad_request_1.BadRequestError("Id is null");
    }
    try {
        let customer = yield customerRepo.findOne({ where: { id: Number(customerId) } });
        if (!customer) {
            throw new not_found_1.NotFoundError("There is no customer with given id!");
        }
        let orders = yield orderRepo.find({ where: { customer: customer } });
        res.status(http_status_codes_1.StatusCodes.OK).json({ orders });
    }
    catch (error) {
        throw new server_1.ServerError("There was some problem during fetching customer orders");
    }
});
const GetOrdersByDeliveryPersonnel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deliveryPersonnelId } = req.params;
    if (!deliveryPersonnelId) {
        throw new bad_request_1.BadRequestError("Id is null");
    }
    try {
        let deliveryPersonnel = yield deliveryPersonnelRepo.findOne({ where: { id: Number(deliveryPersonnelId) } });
        if (!deliveryPersonnel) {
            throw new not_found_1.NotFoundError("There is no delivery personnel with given id!");
        }
        let orders = yield orderRepo.find({ where: { deliveryPersonnel: deliveryPersonnel } });
        res.status(http_status_codes_1.StatusCodes.OK).json({ orders });
    }
    catch (error) {
        throw new server_1.ServerError("There was some problem during fetching delivery personnel orders");
    }
});
exports.default = {
    GetAllOrders,
    GetOrderById,
    AddOrder,
    SetAsPrepared,
    SetAsDelivered,
    CancelOrder,
    GetOrdersByCustomer,
    GetOrdersByDeliveryPersonnel,
    GetOrdersByRestaurant
};
