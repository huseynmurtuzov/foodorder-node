import { Request,Response } from "express"
import dataSource from "../dataSource/dataSource";
import { StatusCodes } from "http-status-codes";
import { Meal } from "../models/Meal";
import { NotFoundError } from "../errors/not-found";
import { Restaurant } from "../models/Restaurant";
import { BadRequestError } from "../errors/bad-request";
import { ServerError } from "../errors/server";
import { ILike } from "typeorm";
const mealsRepo = dataSource.getRepository(Meal)
const restaurantRepo = dataSource.getRepository(Restaurant)

const GetAllMeals = async(req:Request,res:Response):Promise<void> => {
    const meals = await mealsRepo.find();
    res.status(StatusCodes.OK).json({meals})
}

const GetMealById = async(req:Request,res:Response):Promise<void> => {
    const meal = await mealsRepo.findOne({where:{id:Number(req.params.id)}})
    if(!meal){
        throw new NotFoundError("There is no meal with given id!")
    }
    res.status(StatusCodes.OK).json({meal})
}

const AddMeals = async(req:Request,res:Response):Promise<void> => {
    const {name,price,description,isAvailable,image,quantity,restaurantId} = req.body;
    if (!name || !price || !restaurantId || !description || !isAvailable || !image ||!quantity){
        throw new BadRequestError("Please provide all the values");
    }
    const restaurant = await restaurantRepo.findOne({where:{id:Number(restaurantId)}});
    if(!restaurant){
        throw new NotFoundError("There is no restaurant with given id!")
    }

    let newMeal = new Meal();
    newMeal.name = name;
    newMeal.price = price;
    newMeal.description = description;
    newMeal.isAvailable = isAvailable;
    newMeal.image = image;
    newMeal.quantity = quantity;
    newMeal.rating = 0;
    newMeal.restaurant = restaurant
    try {
        const savedmeal = await mealsRepo.save(newMeal);
        res.status(StatusCodes.CREATED).json({savedmeal})
    } catch (error) {
        throw new ServerError("There is some problem!")   
    }
}

const UpdateMeal = async(req:Request,res:Response):Promise<void> => {
    const {name, price,description,isAvailable,image} = req.body;
    const {id} = req.params;
    if(!id || !name || !price || !description || !isAvailable || !image){
        throw new BadRequestError("Please provide all the values")
    }
    let meal = await mealsRepo.findOne({where:{id:Number(id)}});
    if(!meal){
        throw new NotFoundError("There is no meal with given id!")
    }
    meal.name = name;
    meal.price = price;
    meal.description = description;
    meal.isAvailable = isAvailable;
    meal.image = image
    try {
        await mealsRepo.save(meal);
        res.status(StatusCodes.OK).json({meal})
    } catch (error) {
        throw new ServerError("There is some problem!")
    }
}

const DeleteMeal = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    let meal = await mealsRepo.findOne({where:{id:Number(id)}});
    if(!meal){
        throw new NotFoundError("There is no meal with given id!")
    }
    try {
        await mealsRepo.delete(id);
        res.status(StatusCodes.OK).json({msg:"Meal deleted successfully"})
    } catch (error) {
        throw new ServerError("There is some problem!")
    }
}

const SearchMeals = async(req:Request,res:Response):Promise<void> => {
    const {meal} = req.query;

    if (!meal || typeof meal !== "string") {
        throw new BadRequestError("Name query param is required");
    }

    const meals = await mealsRepo.find({
        where: { name: ILike(`%${meal}%`) } 
    });

    res.status(StatusCodes.OK).json({ meals });
}

const getMealsOfRestaurant = async(req:Request,res:Response):Promise<void> => {
     const {restaurantId} = req.params
    if(!restaurantId){
        throw new BadRequestError("Id is null")
    }
    try {
        let restaurant = await restaurantRepo.findOne({where:{id:Number(restaurantId)}})
        if(!restaurant){
            throw new NotFoundError("There is no restaurant with given id!")
        }
        let meals = await mealsRepo.find({where:{restaurant:restaurant}})
        res.status(StatusCodes.OK).json({meals})
    } catch (error) {
        throw new ServerError("There was some problem durong fetching restaurant meals")
    }
}

export default {
    GetAllMeals,
    GetMealById,
    AddMeals,
    UpdateMeal,
    DeleteMeal,
    SearchMeals,
    getMealsOfRestaurant
}