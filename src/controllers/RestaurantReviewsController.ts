import { Request,Response } from "express"
import dataSource from "../dataSource/dataSource"
import { RestaurantReview } from "../models/RestaurantReview"
import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../errors/not-found"
import { BadRequestError } from "../errors/bad-request"
import { ServerError } from "../errors/server"
import { Restaurant } from "../models/Restaurant"
import { Customer } from "../models/Customer"

const reviewRepo = dataSource.getRepository(RestaurantReview)
const restaurantRepo = dataSource.getRepository(Restaurant);
const customerRepo = dataSource.getRepository(Customer)

const GetAllRestaurantReviews = async(req:Request,res:Response):Promise<void> => {
    const reviews = await reviewRepo.find();
    res.status(StatusCodes.OK).json({reviews})
}

const GetRestaurantReviewById = async(req:Request,res:Response):Promise<void> => {
    const review = await reviewRepo.findOne({where:{id:Number(req.params.id)}})
    if(!review){
        throw new NotFoundError("There is no review with given id!")
    }
    res.status(StatusCodes.OK).json({review})
}

const AddRestaurantReviews = async(req:Request,res:Response):Promise<void> => {
    const {rating,comment,customerId,restaurantId} = req.body;
    if(!rating || !comment || !customerId || !restaurantId){
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
    let newComment = new RestaurantReview();
    newComment.comment = comment;
    newComment.customer = customer;
    newComment.rating = rating;
    newComment.restaurant = restaurant;
    newComment.reviewDate = new Date();
    try {
        const savedReview = await reviewRepo.save(newComment);
        res.status(StatusCodes.CREATED).json({savedReview})
    } catch (error) {
        throw new ServerError("There is some problem!")   
    }
}

const UpdateRestaurantReviews = async(req:Request,res:Response):Promise<void> => {
    const {rating, comment} = req.body;
    const {id} = req.params;
    if(!id || !rating || !comment){
        throw new BadRequestError("Please provide all the values")
    }
    let review = await reviewRepo.findOne({where:{id:Number(id)}});
    if(!review){
        throw new NotFoundError("There is no review with given id!")
    }
    review.rating = rating;
    review.comment = comment
    try {
        await reviewRepo.save(review);
        res.status(StatusCodes.OK).json({review})
    } catch (error) {
        throw new ServerError("There is some problem!")
    }
}

const DeleteRestaurantReviews = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    let review = await reviewRepo.findOne({where:{id:Number(id)}});
    if(!review){
        throw new NotFoundError("There is no review with given id!")
    }
    try {
        await reviewRepo.delete(id);
        res.status(StatusCodes.OK).json({msg:"Review deleted successfully"})
    } catch (error) {
        throw new ServerError("There is some problem!")
    }
}

const GetRestaurantReviewsByRestaurant = async(req:Request,res:Response):Promise<void> => {
    const {restaurantId} = req.params
    if(!restaurantId){
        throw new BadRequestError("Id is null")
    }
    try {
        let restaurant = await restaurantRepo.findOne({where:{id:Number(restaurantId)}})
        if(!restaurant){
            throw new NotFoundError("There is no restaurant with given id!")
        }
        let reviews = await reviewRepo.find({where:{restaurant:restaurant}})
        res.status(StatusCodes.OK).json({reviews})
    } catch (error) {
        throw new ServerError("There was some problem durong fetching restaurant reviews")
    }
}

const GetCustomerReviews = async(req:Request,res:Response):Promise<void> => {
    const {customerId} = req.params
    if(!customerId){
        throw new BadRequestError("Id is null")
    }
    try {
        let customer = await customerRepo.findOne({where:{id:Number(customerId)}})
        if(!customer){
            throw new NotFoundError("There is no customer with given id!")
        }
        let reviews = await reviewRepo.find({where:{customer:customer}})
        res.status(StatusCodes.OK).json({reviews})
    } catch (error) {
        throw new ServerError("There was some problem durong fetching customer reviews")
    }
}


export {
GetAllRestaurantReviews,
GetRestaurantReviewById,
UpdateRestaurantReviews,
DeleteRestaurantReviews,
AddRestaurantReviews,
GetRestaurantReviewsByRestaurant,
GetCustomerReviews
}