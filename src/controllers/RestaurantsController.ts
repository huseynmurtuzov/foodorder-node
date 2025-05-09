import { Request,Response } from "express"
import dataSource from "../dataSource/dataSource"
import { Restaurant } from "../models/Restaurant"
import { RestaurantResponseDTO } from "../dto/RestaurantResponseDTO"
import { StatusCodes } from "http-status-codes"
import { BadRequestError } from "../errors/bad-request"
import { NotFoundError } from "../errors/not-found"
import { ServerError } from "../errors/server"
import { ILike } from "typeorm"

const restaurantRepository = dataSource.getRepository(Restaurant)

const GetAllRestaurants = async(req:Request,res:Response):Promise<void> => {
    const restaurants = await restaurantRepository.find();
    let returnRestaurants:RestaurantResponseDTO[] = []
    
    restaurants.forEach((restaurant) => {
        let dto = new RestaurantResponseDTO(restaurant.id,restaurant.role,restaurant.name,restaurant.email,restaurant.phoneNumber,restaurant.address,restaurant.rating,restaurant.image)
        returnRestaurants.push(dto)
    })
    res.status(StatusCodes.OK).json({returnRestaurants})
}

const GetRestaurantById = async(req:Request,res:Response):Promise<void> => {
    let restaurant = await restaurantRepository.findOne({where:{id:Number(req.params.id)}})
    if(!restaurant){
        throw new BadRequestError("There is no restaurant with given id!")
    }
    let dto = new RestaurantResponseDTO(restaurant.id,restaurant.role,restaurant.name,restaurant.email,restaurant.phoneNumber,restaurant.address,restaurant.rating,restaurant.image)
    res.status(StatusCodes.OK).json({dto})
}

const UpdateRestaurant = async(req:Request,res:Response):Promise<void> => {
    const {name,phoneNumber,address,image} = req.body;
    const {id} = req.params;
    if(!id || !name || !phoneNumber || !address || !image){
        throw new BadRequestError("Please provide all the values!")
    }
    let restaurant = await restaurantRepository.findOne({where:{id:Number(id)}});
    if(!restaurant){
        throw new NotFoundError("There is no restaurant with given id!");   
    }
    restaurant.name = name;
    restaurant.phoneNumber = phoneNumber;
    restaurant.address = address;
    restaurant.image = image;

    try {
        await restaurantRepository.save(restaurant);
        res.status(StatusCodes.OK).json({restaurant})
    } catch (error) {
        throw new ServerError("There is some problem!")
    }
}

const DeleteRestaurant = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    let restaurant = await restaurantRepository.findOne({where:{id:Number(id)}})
    if(!restaurant){
        throw new NotFoundError("There is no restaurant with given id!");
    }
    try {
        await restaurantRepository.delete(id);
        res.status(StatusCodes.OK).json({msg:"Restaurant deleted successfully"})
    } catch (error) {
        throw new ServerError("There is some problem while deleting the data!")
    }
}

const GetAverageMealPrice = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    let restaurant = await restaurantRepository.findOne({where:{id:Number(id)}})
    if(!restaurant){
        throw new BadRequestError("There is no restaurant with given id!")
    }
    const result = await dataSource.query("SELECT dbo.YiyecekFiyatOrtalamasiniAl(?) AS AvgPrice",[id]);
    const avgPrice = result[0].avgPrice;
    res.status(StatusCodes.OK).json({avgPrice})
}

const GetTotalAmount = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    let restaurant = await restaurantRepository.findOne({where:{id:Number(id)}})
    if(!restaurant){
        throw new BadRequestError("There is no restaurant with given id!")
    }
    const result = await dataSource.query("SELECT dbo.TotalCiroyuHesapla(?) AS AllPrice",[id]);
    const allPrice = result[0].allPrice;
    res.status(StatusCodes.OK).json({allPrice})
}

const SearchRestaurants = async(req:Request,res:Response):Promise<void> => {
    const {restaurant} = req.query;

    if (!restaurant || typeof restaurant !== "string") {
        throw new BadRequestError("Name query param is required");
    }

    const restaurants = await restaurantRepository.find({
        where: { name: ILike(`%${restaurant}%`) } 
    });

    res.status(StatusCodes.OK).json({ restaurants });
}

export default {
    GetAllRestaurants,
    GetRestaurantById,
    UpdateRestaurant,
    DeleteRestaurant,
    SearchRestaurants,
    GetAverageMealPrice,
    GetTotalAmount
}