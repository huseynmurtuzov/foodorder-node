import { Request,Response } from "express"
import dataSource from "../dataSource/dataSource";
import { DeliveryPersonnel } from "../models/DeliveryPersonnel";
import { StatusCodes } from "http-status-codes";
import { DeliveryPersonnelResponseDTO } from "../dto/DeliveryPersonnelResponseDTO";
import { BadRequestError } from "../errors/bad-request";
import { ServerError } from "../errors/server";
import { NotFoundError } from "../errors/not-found";

const deliveryPersonnelRepo = dataSource.getRepository(DeliveryPersonnel)

const GetAllDeliveryPersonnels = async(req:Request,res:Response):Promise<void> => {
    let deliveryPersonnels = await deliveryPersonnelRepo.find();
    let returnDeliveryPersonnels:DeliveryPersonnelResponseDTO[] = [];

    deliveryPersonnels.forEach((dp) => {
        let dto = new DeliveryPersonnelResponseDTO(dp.id,dp.role,dp.name,dp.email,dp.phoneNumber,dp.veichleType)
        returnDeliveryPersonnels.push(dto)
    }) 
    res.status(StatusCodes.OK).json({returnDeliveryPersonnels})
}

const GetDeliveryPersonnelById = async(req:Request,res:Response):Promise<void> => {
    let dp = await deliveryPersonnelRepo.findOne({where:{id:Number(req.params.id)}});
    if(!dp){
        throw new BadRequestError("There is no deliveryPersonnel with that id!")
    }
    let dto = new DeliveryPersonnelResponseDTO(dp.id,dp.role,dp.name,dp.email,dp.phoneNumber,dp.veichleType)
    res.status(StatusCodes.OK).json({dto})
}

const UpdateDeliveryPersonnel = async(req:Request,res:Response):Promise<void> => {
    const {name,phoneNumber,veichleType,workingHours} = req.body;
    const {id} = req.params;
    if(!id || !name ||!phoneNumber || !veichleType || !workingHours){
        throw new BadRequestError("Please provide all the values")
    }
    let dp = await deliveryPersonnelRepo.findOne({where:{id:Number(id)}})
    if(!dp){
        throw new BadRequestError("There is no delivery personnel with given id!");
    }
    dp.name = name;
    dp.phoneNumber = phoneNumber;
    dp.veichleType = veichleType;
    try {
        await deliveryPersonnelRepo.save(dp);
        res.status(StatusCodes.OK).json({dp})
    } catch (error) {
        throw new ServerError("There is some problem!")
    }
}

const DeleteDeliveryPersonnel = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    if(!id){
        throw new BadRequestError("There is no given id");
    }
    let dp = await deliveryPersonnelRepo.findOne({where:{id:Number(id)}})
    if(!dp){
        throw new BadRequestError("There is no delivery personnel with given id!");
    }
    try {
        await deliveryPersonnelRepo.delete(dp.id);
        res.status(StatusCodes.OK).json({msg:"DP deleted successfully"})
    } catch (error) {
        throw new ServerError("There is some problem while deleting the data!")
    }
}

const GetDeliveryPersonnelPerformanceById = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    const deliveryPersonnel = await deliveryPersonnelRepo.findOne({where:{id:Number(id)}});
    if(!deliveryPersonnel){
        throw new NotFoundError("No delivery personnel found with given id!")
    }
    const result = await dataSource.query(
    `SELECT 
        DeliveryPersonnelId, 
        DeliveryPersonnelName, 
        TotalDeliveredOrders
    FROM vw_DeliveryPersonnelPerformance
    WHERE DeliveryPersonnelId = ?`,
    [id]
    );
    res.status(StatusCodes.OK).json({result})
}

export {
    GetAllDeliveryPersonnels,
    GetDeliveryPersonnelById,
    UpdateDeliveryPersonnel,
    DeleteDeliveryPersonnel,
    GetDeliveryPersonnelPerformanceById
}