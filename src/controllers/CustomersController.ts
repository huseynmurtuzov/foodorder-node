import { Request,Response } from "express"
import { Customer } from "../models/Customer"
import dataSource from "../dataSource/dataSource"
import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../errors/not-found"
import { CustomerResponseDTO } from "../dto/CustomerResponseDTO"
import { custom } from "joi"
import { ServerError } from "../errors/server"
import { BadRequestError } from "../errors/bad-request"

const customerRepo = dataSource.getRepository(Customer)

const GetAllCustomers = async (req:Request,res:Response) : Promise<void> => {
    let customers = await customerRepo.find();
    let returnCustomers:CustomerResponseDTO[] = [];

    customers.forEach((customer) => {
        let dto = new CustomerResponseDTO(customer.id,customer.role,customer.name,customer.email,customer.phoneNumber,customer.address)
        returnCustomers.push(dto)
    })

    res.status(StatusCodes.OK).json({returnCustomers})
}

const GetCustomerById = async (req:Request,res:Response) : Promise<void> => {
    let customer = await customerRepo.findOne({where:{id:Number(req.params.id)}})
    if(!customer){
        throw new NotFoundError("The customer with given id hasnt been found!")
    }
    let dto = new CustomerResponseDTO(customer.id,customer.role,customer.name,customer.email,customer.phoneNumber,customer.address)
    res.status(StatusCodes.OK).json({dto})
}

const EditCustomer = async (req:Request,res:Response) : Promise<void> => {
    const {name,phoneNumber,address} = req.body
    let id = req.params
    if(!id || !name || !phoneNumber || !address){
        throw new BadRequestError("Please provide all the values")
    }
    let customer = await customerRepo.findOne({where:{id:Number(id)}});
    if(!customer){
        throw new NotFoundError("The customer with given id hasnt been found!")
    }
    customer.address = address;
    customer.name = name;
    customer.phoneNumber = phoneNumber
    try {
        await customerRepo.save(customer);
        res.status(StatusCodes.OK).json({customer})
    } catch (error) {
        throw new ServerError("There is some problem!")
    }
}

const DeleteCustomer = async (req:Request,res:Response) : Promise<void> => {
    const {id} = req.params;
    if(!id){
        throw new BadRequestError("The id parametr is null or not present!")
    }
    let customer = await customerRepo.findOne({where:{id:Number(id)}});
    if(!customer){
        throw new NotFoundError("The customer with given id hasnt been found!")
    }
    try {
        await customerRepo.delete(id);
        res.status(StatusCodes.OK).json({msg:"Customer deleted successfully"})
    } catch (error) {
        throw new ServerError("There is some problem while deleting the data!")
    }
}

export default {
    GetAllCustomers,
    GetCustomerById,
    EditCustomer,
    DeleteCustomer
}