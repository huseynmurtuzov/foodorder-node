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
exports.GetPaymentById = exports.GetAllPayments = void 0;
const dataSource_1 = __importDefault(require("../dataSource/dataSource"));
const Payment_1 = require("../models/Payment");
const http_status_codes_1 = require("http-status-codes");
const not_found_1 = require("../errors/not-found");
const paymentRepo = dataSource_1.default.getRepository(Payment_1.Payment);
const GetAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield paymentRepo.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ payments });
});
exports.GetAllPayments = GetAllPayments;
const GetPaymentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield paymentRepo.findOne({ where: { id: Number(req.params.id) } });
    if (!payment) {
        throw new not_found_1.NotFoundError("There is no order with given id!");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ payment });
});
exports.GetPaymentById = GetPaymentById;
//u have to fill those controllers in production, now u are just simulate things up
const ProccesPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const VerifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
