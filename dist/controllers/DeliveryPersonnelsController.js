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
exports.GetDeliveryPersonnelPerformanceById = exports.DeleteDeliveryPersonnel = exports.UpdateDeliveryPersonnel = exports.GetDeliveryPersonnelById = exports.GetAllDeliveryPersonnels = void 0;
const dataSource_1 = __importDefault(require("../dataSource/dataSource"));
const DeliveryPersonnel_1 = require("../models/DeliveryPersonnel");
const http_status_codes_1 = require("http-status-codes");
const DeliveryPersonnelResponseDTO_1 = require("../dto/DeliveryPersonnelResponseDTO");
const bad_request_1 = require("../errors/bad-request");
const server_1 = require("../errors/server");
const not_found_1 = require("../errors/not-found");
const deliveryPersonnelRepo = dataSource_1.default.getRepository(DeliveryPersonnel_1.DeliveryPersonnel);
const GetAllDeliveryPersonnels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let deliveryPersonnels = yield deliveryPersonnelRepo.find();
    let returnDeliveryPersonnels = [];
    deliveryPersonnels.forEach((dp) => {
        let dto = new DeliveryPersonnelResponseDTO_1.DeliveryPersonnelResponseDTO(dp.id, dp.role, dp.name, dp.email, dp.phoneNumber, dp.veichleType);
        returnDeliveryPersonnels.push(dto);
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ returnDeliveryPersonnels });
});
exports.GetAllDeliveryPersonnels = GetAllDeliveryPersonnels;
const GetDeliveryPersonnelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dp = yield deliveryPersonnelRepo.findOne({ where: { id: Number(req.params.id) } });
    if (!dp) {
        throw new bad_request_1.BadRequestError("There is no deliveryPersonnel with that id!");
    }
    let dto = new DeliveryPersonnelResponseDTO_1.DeliveryPersonnelResponseDTO(dp.id, dp.role, dp.name, dp.email, dp.phoneNumber, dp.veichleType);
    res.status(http_status_codes_1.StatusCodes.OK).json({ dto });
});
exports.GetDeliveryPersonnelById = GetDeliveryPersonnelById;
const UpdateDeliveryPersonnel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, veichleType, workingHours } = req.body;
    const { id } = req.params;
    if (!id || !name || !phoneNumber || !veichleType || !workingHours) {
        throw new bad_request_1.BadRequestError("Please provide all the values");
    }
    let dp = yield deliveryPersonnelRepo.findOne({ where: { id: Number(id) } });
    if (!dp) {
        throw new bad_request_1.BadRequestError("There is no delivery personnel with given id!");
    }
    dp.name = name;
    dp.phoneNumber = phoneNumber;
    dp.veichleType = veichleType;
    try {
        yield deliveryPersonnelRepo.save(dp);
        res.status(http_status_codes_1.StatusCodes.OK).json({ dp });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
exports.UpdateDeliveryPersonnel = UpdateDeliveryPersonnel;
const DeleteDeliveryPersonnel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new bad_request_1.BadRequestError("There is no given id");
    }
    let dp = yield deliveryPersonnelRepo.findOne({ where: { id: Number(id) } });
    if (!dp) {
        throw new bad_request_1.BadRequestError("There is no delivery personnel with given id!");
    }
    try {
        yield deliveryPersonnelRepo.delete(dp.id);
        res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "DP deleted successfully" });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem while deleting the data!");
    }
});
exports.DeleteDeliveryPersonnel = DeleteDeliveryPersonnel;
const GetDeliveryPersonnelPerformanceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deliveryPersonnel = yield deliveryPersonnelRepo.findOne({ where: { id: Number(id) } });
    if (!deliveryPersonnel) {
        throw new not_found_1.NotFoundError("No delivery personnel found with given id!");
    }
    const result = yield dataSource_1.default.query(`SELECT 
        DeliveryPersonnelId, 
        DeliveryPersonnelName, 
        TotalDeliveredOrders
    FROM vw_DeliveryPersonnelPerformance
    WHERE DeliveryPersonnelId = ?`, [id]);
    res.status(http_status_codes_1.StatusCodes.OK).json({ result });
});
exports.GetDeliveryPersonnelPerformanceById = GetDeliveryPersonnelPerformanceById;
