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
exports.Logout = exports.Register = exports.RegisterAsDeliveryPersonnel = exports.RegisterAsRestaurant = exports.AdminLogin = exports.Login = void 0;
const bad_request_1 = require("../errors/bad-request");
const BaseUser_1 = require("../models/BaseUser");
const userRole_1 = require("../utils/enums/userRole");
const Customer_1 = require("../models/Customer");
const dataSource_1 = __importDefault(require("../dataSource/dataSource"));
const DeliveryPersonnel_1 = require("../models/DeliveryPersonnel");
const Restaurant_1 = require("../models/Restaurant");
const http_status_codes_1 = require("http-status-codes");
const server_1 = require("../errors/server");
const veichleType_1 = require("../utils/enums/veichleType");
const createTokenUser_1 = require("../utils/functions/createTokenUser");
const jwtFunctions_1 = require("../utils/functions/jwtFunctions");
const unauthenticated_1 = require("../errors/unauthenticated");
const userRepo = dataSource_1.default.getRepository(BaseUser_1.User);
const customerRepo = dataSource_1.default.getRepository(Customer_1.Customer);
const deliveryPersonnelRepo = dataSource_1.default.getRepository(DeliveryPersonnel_1.DeliveryPersonnel);
const restaurantRepo = dataSource_1.default.getRepository(Restaurant_1.Restaurant);
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new bad_request_1.BadRequestError("Please provide email and password!");
    }
    const user = yield userRepo.findOne({ where: { email } });
    if (!user) {
        throw new unauthenticated_1.UnauthenticatedError("Invalid Credentials");
    }
    const isPasswordCorrect = user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new unauthenticated_1.UnauthenticatedError("Wrong password");
    }
    const userToken = (0, createTokenUser_1.createTokenUser)(user);
    (0, jwtFunctions_1.attachCookieToResponse)(res, userToken);
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "User logged in successfully" });
});
exports.Login = Login;
const AdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.AdminLogin = AdminLogin;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, phoneNumber, address } = req.body;
    if (!email || !password || !name || !phoneNumber || !address) {
        throw new bad_request_1.BadRequestError("Please provide all the values");
    }
    const emailAlreadyExists = yield userRepo.findOne({ where: { email } });
    if (emailAlreadyExists) {
        throw new bad_request_1.BadRequestError("Email already exists");
    }
    const isFirstAccount = (yield userRepo.count()) == 0;
    const role = isFirstAccount ? userRole_1.userRole.ADMIN : userRole_1.userRole.CUSTOMER;
    let newUser = new BaseUser_1.User();
    newUser.role = role;
    newUser.email = email;
    newUser.password = password;
    newUser.notifications = [];
    let newCustomer = new Customer_1.Customer();
    newCustomer.address = address;
    newCustomer.email = email;
    newCustomer.name = name;
    newCustomer.notifications = [];
    newCustomer.orders = [];
    newCustomer.password = password;
    newCustomer.phoneNumber = phoneNumber;
    newCustomer.restaurantReviews = [];
    newCustomer.role = role;
    try {
        const createdUser = yield userRepo.save(newUser);
        const createdCustomer = yield customerRepo.save(newCustomer);
        const userToken = (0, createTokenUser_1.createTokenUser)(newUser);
        (0, jwtFunctions_1.attachCookieToResponse)(res, userToken);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "Customer created", createdCustomer });
    }
    catch (error) {
        throw new server_1.ServerError("Something went wrong while creating a customer");
    }
});
exports.Register = Register;
const RegisterAsRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, phoneNumber, address, workingHours, image } = req.body;
    if (!email || !password || !name || !phoneNumber || !address || !workingHours || !image) {
        throw new bad_request_1.BadRequestError("Please provide all the values");
    }
    const emailAlreadyExists = yield userRepo.findOne({ where: { email } });
    if (emailAlreadyExists) {
        throw new bad_request_1.BadRequestError("Email already exists");
    }
    let newUser = new BaseUser_1.User();
    newUser.role = userRole_1.userRole.RESTAURANT;
    newUser.email = email;
    newUser.password = password;
    newUser.notifications = [];
    let newRestaurant = new Restaurant_1.Restaurant();
    newRestaurant.address = address;
    newRestaurant.email = email;
    newRestaurant.name = name;
    newRestaurant.notifications = [];
    newRestaurant.orders = [];
    newRestaurant.password = password;
    newRestaurant.phoneNumber = phoneNumber;
    newRestaurant.restaurantReview = [];
    newRestaurant.role = userRole_1.userRole.RESTAURANT;
    newRestaurant.workingHours = workingHours;
    newRestaurant.image = image;
    try {
        const createdUser = yield userRepo.save(newUser);
        const createdRestaurant = yield restaurantRepo.create(newRestaurant);
        const userToken = (0, createTokenUser_1.createTokenUser)(newUser);
        (0, jwtFunctions_1.attachCookieToResponse)(res, userToken);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "Restaurant created", createdRestaurant });
    }
    catch (error) {
        throw new server_1.ServerError("Something went wrong while creating a restaurant");
    }
});
exports.RegisterAsRestaurant = RegisterAsRestaurant;
const RegisterAsDeliveryPersonnel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, phoneNumber, veichle } = req.body;
    if (!email || !password || !name || !phoneNumber) {
        throw new bad_request_1.BadRequestError("Please provide all the values");
    }
    const emailAlreadyExists = yield userRepo.findOne({ where: { email } });
    if (emailAlreadyExists) {
        throw new bad_request_1.BadRequestError("Email already exists");
    }
    let newUser = new BaseUser_1.User();
    newUser.role = userRole_1.userRole.DELIVERYPERSONNEL;
    newUser.email = email;
    newUser.password = password;
    newUser.notifications = [];
    if (!Object.values(veichleType_1.veichleType).includes(veichle)) {
        throw new Error("Invalid vehicle type");
    }
    let newDeliveryPersonnel = new DeliveryPersonnel_1.DeliveryPersonnel();
    newDeliveryPersonnel.email = email;
    newDeliveryPersonnel.name = name;
    newDeliveryPersonnel.notifications = [];
    newDeliveryPersonnel.orders = [];
    newDeliveryPersonnel.password = password;
    newDeliveryPersonnel.phoneNumber = phoneNumber;
    newDeliveryPersonnel.role = userRole_1.userRole.DELIVERYPERSONNEL;
    newDeliveryPersonnel.veichleType = veichle;
    try {
        const createdUser = yield userRepo.save(newUser);
        const createdDeliveryPersonnel = yield deliveryPersonnelRepo.create(newDeliveryPersonnel);
        const userToken = (0, createTokenUser_1.createTokenUser)(newUser);
        (0, jwtFunctions_1.attachCookieToResponse)(res, userToken);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ msg: "Delivery Personnel created", createdDeliveryPersonnel });
    }
    catch (error) {
        throw new server_1.ServerError("Something went wrong while creating a delivery personnel");
    }
});
exports.RegisterAsDeliveryPersonnel = RegisterAsDeliveryPersonnel;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 1000)
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'user logged out!' });
});
exports.Logout = Logout;
