import { Request,Response } from "express"
import dataSource from "../dataSource/dataSource";
import { Payment } from "../models/Payment";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/not-found";
const paymentRepo = dataSource.getRepository(Payment)

const GetAllPayments = async(req:Request,res:Response):Promise<void> => {
    const payments = await paymentRepo.find();
    res.status(StatusCodes.OK).json({payments})
}

const GetPaymentById = async(req:Request,res:Response):Promise<void> => {
    const payment = await paymentRepo.findOne({where:{id:Number(req.params.id)}})
    if(!payment){
        throw new NotFoundError("There is no order with given id!")
    }
    res.status(StatusCodes.OK).json({payment})
}


//u have to fill those controllers in production, now u are just simulate things up
const ProccesPayment = async(req:Request,res:Response):Promise<void> => {

}

const VerifyPayment = async(req:Request,res:Response):Promise<void> => {

}


export {
    GetAllPayments,
    GetPaymentById
}