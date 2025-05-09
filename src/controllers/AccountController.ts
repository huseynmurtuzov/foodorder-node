import { Request,Response } from "express"
import { BadRequestError } from "../errors/bad-request";
import { User } from "../models/BaseUser";
import { userRole } from "../utils/enums/userRole";
import { Customer } from "../models/Customer";
import dataSource from "../dataSource/dataSource";
import { DeliveryPersonnel } from "../models/DeliveryPersonnel";
import { Restaurant } from "../models/Restaurant";
import { StatusCodes } from "http-status-codes";
import { ServerError } from "../errors/server";
import { veichleType } from "../utils/enums/veichleType";
import { createTokenUser } from "../utils/functions/createTokenUser";
import {attachCookieToResponse} from '../utils/functions/jwtFunctions'
import { UnauthenticatedError } from "../errors/unauthenticated";
const userRepo = dataSource.getRepository(User);
const customerRepo = dataSource.getRepository(Customer);
const deliveryPersonnelRepo = dataSource.getRepository(DeliveryPersonnel);
const restaurantRepo = dataSource.getRepository(Restaurant);

const Login = async(req:Request,res:Response):Promise<void> => {
    const {email,password} = req.body;
    if(!email || !password){
        throw new BadRequestError("Please provide email and password!")
    }
    const user = await userRepo.findOne({where:{email}})
    if(!user){
        throw new UnauthenticatedError("Invalid Credentials")
    }
    const isPasswordCorrect = user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Wrong password")
    }
    const userToken = createTokenUser(user);
    attachCookieToResponse(res,userToken);
    res.status(StatusCodes.OK).json({msg:"User logged in successfully"})
}

const AdminLogin = async(req:Request,res:Response):Promise<void> => {

}

const Register = async(req:Request,res:Response):Promise<void> => {
    const {email,password,name,phoneNumber,address} = req.body;
    if(!email || !password || !name || !phoneNumber || !address){
        throw new BadRequestError("Please provide all the values")
    }
    const emailAlreadyExists = await userRepo.findOne({where:{email}});
    if(emailAlreadyExists){
        throw new BadRequestError("Email already exists")
    }

    

    const isFirstAccount = await userRepo.count() == 0
    const role = isFirstAccount ? userRole.ADMIN : userRole.CUSTOMER
    let newUser = new User();
    newUser.role = role;
    newUser.email = email;
    newUser.password = password;
    newUser.notifications = [];

    let newCustomer = new Customer();
    newCustomer.address=address;
    newCustomer.email=email;
    newCustomer.name=name;
    newCustomer.notifications = [];
    newCustomer.orders = [];
    newCustomer.password = password;
    newCustomer.phoneNumber = phoneNumber;
    newCustomer.restaurantReviews = [];
    newCustomer.role = role;



    try {
        const createdUser = await userRepo.save(newUser);
        const createdCustomer = await customerRepo.save(newCustomer);
        const userToken = createTokenUser(newUser);
        attachCookieToResponse(res,userToken);
        res.status(StatusCodes.CREATED).json({msg:"Customer created",createdCustomer})
    } catch (error) {
        throw new ServerError("Something went wrong while creating a customer")
    }
}

const RegisterAsRestaurant = async(req:Request,res:Response):Promise<void> => {
const {email,password,name,phoneNumber,address,workingHours,image} = req.body;
    if(!email || !password || !name || !phoneNumber || !address || !workingHours || !image){
        throw new BadRequestError("Please provide all the values")
    }

    const emailAlreadyExists = await userRepo.findOne({where:{email}});
    if(emailAlreadyExists){
        throw new BadRequestError("Email already exists")
    }
    
    let newUser = new User();
    newUser.role = userRole.RESTAURANT;
    newUser.email = email;
    newUser.password = password;
    newUser.notifications = [];

    let newRestaurant = new Restaurant();
    newRestaurant.address=address;
    newRestaurant.email=email;
    newRestaurant.name=name;
    newRestaurant.notifications = [];
    newRestaurant.orders = [];
    newRestaurant.password = password;
    newRestaurant.phoneNumber = phoneNumber;
    newRestaurant.restaurantReview = [];
    newRestaurant.role = userRole.RESTAURANT;
    newRestaurant.workingHours = workingHours;
    newRestaurant.image = image;

    try {
        const createdUser = await userRepo.save(newUser);
        const createdRestaurant = await restaurantRepo.create(newRestaurant);
        const userToken = createTokenUser(newUser);
        attachCookieToResponse(res,userToken);
        res.status(StatusCodes.CREATED).json({msg:"Restaurant created",createdRestaurant})
    } catch (error) {
        throw new ServerError("Something went wrong while creating a restaurant")
    }
}

const RegisterAsDeliveryPersonnel = async(req:Request,res:Response):Promise<void> => {
const {email,password,name,phoneNumber,veichle} = req.body;
    if(!email || !password || !name || !phoneNumber){
        throw new BadRequestError("Please provide all the values")
    }

    const emailAlreadyExists = await userRepo.findOne({where:{email}});
    if(emailAlreadyExists){
        throw new BadRequestError("Email already exists")
    }

    let newUser = new User();
    newUser.role = userRole.DELIVERYPERSONNEL;
    newUser.email = email;
    newUser.password = password;
    newUser.notifications = [];

    if (!Object.values(veichleType).includes(veichle)) {
    throw new Error("Invalid vehicle type");
    }
    let newDeliveryPersonnel = new DeliveryPersonnel();
    newDeliveryPersonnel.email=email;
    newDeliveryPersonnel.name=name;
    newDeliveryPersonnel.notifications = [];
    newDeliveryPersonnel.orders = [];
    newDeliveryPersonnel.password = password;
    newDeliveryPersonnel.phoneNumber = phoneNumber;
    newDeliveryPersonnel.role = userRole.DELIVERYPERSONNEL;
    newDeliveryPersonnel.veichleType = veichle as veichleType
    try {
        const createdUser = await userRepo.save(newUser);
        const createdDeliveryPersonnel = await deliveryPersonnelRepo.create(newDeliveryPersonnel);
        const userToken = createTokenUser(newUser);
        attachCookieToResponse(res,userToken);
        res.status(StatusCodes.CREATED).json({msg:"Delivery Personnel created",createdDeliveryPersonnel})
    } catch (error) {
        throw new ServerError("Something went wrong while creating a delivery personnel")
    }
}

const Logout = async(req:Request,res:Response):Promise<void> => {
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now()+5*1000)
    });
    res.status(StatusCodes.OK).json({msg:'user logged out!'})
}

// const ConfirmEmail = async(req:Request,res:Response):Promise<void> => {

// }

// const ForgotPassword = async(req:Request,res:Response):Promise<void> => {

// }

// const ForgotPasswordConfirm = async(req:Request,res:Response):Promise<void> => {

// }

//GENERATE JWT ADD

export {
    Login,
    AdminLogin,
    RegisterAsRestaurant,
    RegisterAsDeliveryPersonnel,
    Register,
    Logout
}