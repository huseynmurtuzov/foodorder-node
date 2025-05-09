import { Request,Response } from "express"
import { StatusCodes } from "http-status-codes"
import dataSource from "../dataSource/dataSource"
import { Notification } from "../models/Notification"
import { BadRequestError } from "../errors/bad-request"
import { User } from "../models/BaseUser"
import { NotFoundError } from "../errors/not-found"
const notificationRepo = dataSource.getRepository(Notification)
const userRepo = dataSource.getRepository(User)
const GetUserNotifications = async(req:Request,res:Response):Promise<void> => {
    const {userId} = req.params;
    if(!userId){
        throw new BadRequestError("Please provide an id!")
    }
    let user = await userRepo.findOne({where:{id:Number(userId)}})
    if(!user){
        throw new NotFoundError("The user is not found with given id!")
    }
    let notifications = await notificationRepo.find({where:{user:user}})
    res.status(StatusCodes.OK).json({notifications})
}

const SetAsRead = async(req:Request,res:Response):Promise<void> => {
    const {id} = req.params;
    if(!id){
        throw new BadRequestError("The id property u should give in query does not exist!")
    }
    const exactNotification = await notificationRepo.findOne({where:{id:Number(id)}});
    if(!exactNotification){
        throw new NotFoundError("There is no notification with that id!")
    }
    exactNotification.isRead = true;
    try {
        let savedNotification = await notificationRepo.save(exactNotification);
        res.status(StatusCodes.OK).json({msg:"Notification set as read successfully", exactNotification})
    } catch (error) {
        throw new Error("There is a problem while issuing your request!")
    }

}

const AnyUnreadNotification = async(req:Request,res:Response):Promise<void> => {
    const {userId} = req.params;
    const user = await userRepo.findOne({where:{id:Number(userId)}});
    if(!user){
        throw new NotFoundError("No user found with that id!")
    }
    let notifications = await notificationRepo.find({where:{user:user}})
    const hasUnread = notifications.some(n => !n.isRead);
    res.json({hasUnread})
}

//JWT ilave ettikten sonra acacagiz
// const SendNotification = async(req:Request,res:Response):Promise<void> => {
//     const { title, message } = req.body;
//     const userId = req.user.id; 

//     const user = await userRepo.findOne({ where: { id: userId } });
//     if (!user) throw new NotFoundError("User not found");

//     const notification = notificationRepo.create({
//         title,
//         message,
//         user, // Foreign key burada atanır
//         isRead: false
//     });

//     await notificationRepo.save(notification);

//     res.status(201).json({ message: "Notification sent" });
// }
export default {
    GetUserNotifications,
    SetAsRead,
    AnyUnreadNotification
}