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
const Customer_1 = require("../models/Customer");
const dataSource_1 = __importDefault(require("../dataSource/dataSource"));
const http_status_codes_1 = require("http-status-codes");
const not_found_1 = require("../errors/not-found");
const CustomerResponseDTO_1 = require("../dto/CustomerResponseDTO");
const server_1 = require("../errors/server");
const bad_request_1 = require("../errors/bad-request");
const customerRepo = dataSource_1.default.getRepository(Customer_1.Customer);
const GetAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customers = yield customerRepo.find();
    let returnCustomers = [];
    customers.forEach((customer) => {
        let dto = new CustomerResponseDTO_1.CustomerResponseDTO(customer.id, customer.role, customer.name, customer.email, customer.phoneNumber, customer.address);
        returnCustomers.push(dto);
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ returnCustomers });
});
const GetCustomerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customer = yield customerRepo.findOne({ where: { id: Number(req.params.id) } });
    if (!customer) {
        throw new not_found_1.NotFoundError("The customer with given id hasnt been found!");
    }
    let dto = new CustomerResponseDTO_1.CustomerResponseDTO(customer.id, customer.role, customer.name, customer.email, customer.phoneNumber, customer.address);
    res.status(http_status_codes_1.StatusCodes.OK).json({ dto });
});
const EditCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, address } = req.body;
    let id = req.params;
    if (!id || !name || !phoneNumber || !address) {
        throw new bad_request_1.BadRequestError("Please provide all the values");
    }
    let customer = yield customerRepo.findOne({ where: { id: Number(id) } });
    if (!customer) {
        throw new not_found_1.NotFoundError("The customer with given id hasnt been found!");
    }
    customer.address = address;
    customer.name = name;
    customer.phoneNumber = phoneNumber;
    try {
        yield customerRepo.save(customer);
        res.status(http_status_codes_1.StatusCodes.OK).json({ customer });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
const DeleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new bad_request_1.BadRequestError("The id parametr is null or not present!");
    }
    let customer = yield customerRepo.findOne({ where: { id: Number(id) } });
    if (!customer) {
        throw new not_found_1.NotFoundError("The customer with given id hasnt been found!");
    }
    try {
        yield customerRepo.delete(id);
        res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Customer deleted successfully" });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem while deleting the data!");
    }
});
exports.default = {
    GetAllCustomers,
    GetCustomerById,
    EditCustomer,
    DeleteCustomer
};
