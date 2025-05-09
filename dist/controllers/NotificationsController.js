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
const http_status_codes_1 = require("http-status-codes");
const dataSource_1 = __importDefault(require("../dataSource/dataSource"));
const Notification_1 = require("../models/Notification");
const bad_request_1 = require("../errors/bad-request");
const BaseUser_1 = require("../models/BaseUser");
const not_found_1 = require("../errors/not-found");
const notificationRepo = dataSource_1.default.getRepository(Notification_1.Notification);
const userRepo = dataSource_1.default.getRepository(BaseUser_1.User);
const GetUserNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        throw new bad_request_1.BadRequestError("Please provide an id!");
    }
    let user = yield userRepo.findOne({ where: { id: Number(userId) } });
    if (!user) {
        throw new not_found_1.NotFoundError("The user is not found with given id!");
    }
    let notifications = yield notificationRepo.find({ where: { user: user } });
    res.status(http_status_codes_1.StatusCodes.OK).json({ notifications });
});
const SetAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new bad_request_1.BadRequestError("The id property u should give in query does not exist!");
    }
    const exactNotification = yield notificationRepo.findOne({ where: { id: Number(id) } });
    if (!exactNotification) {
        throw new not_found_1.NotFoundError("There is no notification with that id!");
    }
    exactNotification.isRead = true;
    try {
        let savedNotification = yield notificationRepo.save(exactNotification);
        res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Notification set as read successfully", exactNotification });
    }
    catch (error) {
        throw new Error("There is a problem while issuing your request!");
    }
});
const AnyUnreadNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield userRepo.findOne({ where: { id: Number(userId) } });
    if (!user) {
        throw new not_found_1.NotFoundError("No user found with that id!");
    }
    let notifications = yield notificationRepo.find({ where: { user: user } });
    const hasUnread = notifications.some(n => !n.isRead);
    res.json({ hasUnread });
});
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
exports.default = {
    GetUserNotifications,
    SetAsRead,
    AnyUnreadNotification
};
