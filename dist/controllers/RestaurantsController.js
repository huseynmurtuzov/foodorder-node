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
const dataSource_1 = __importDefault(require("../dataSource/dataSource"));
const Restaurant_1 = require("../models/Restaurant");
const RestaurantResponseDTO_1 = require("../dto/RestaurantResponseDTO");
const http_status_codes_1 = require("http-status-codes");
const bad_request_1 = require("../errors/bad-request");
const not_found_1 = require("../errors/not-found");
const server_1 = require("../errors/server");
const typeorm_1 = require("typeorm");
const restaurantRepository = dataSource_1.default.getRepository(Restaurant_1.Restaurant);
const GetAllRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurants = yield restaurantRepository.find();
    let returnRestaurants = [];
    restaurants.forEach((restaurant) => {
        let dto = new RestaurantResponseDTO_1.RestaurantResponseDTO(restaurant.id, restaurant.role, restaurant.name, restaurant.email, restaurant.phoneNumber, restaurant.address, restaurant.rating, restaurant.image);
        returnRestaurants.push(dto);
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ returnRestaurants });
});
const GetRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let restaurant = yield restaurantRepository.findOne({ where: { id: Number(req.params.id) } });
    if (!restaurant) {
        throw new bad_request_1.BadRequestError("There is no restaurant with given id!");
    }
    let dto = new RestaurantResponseDTO_1.RestaurantResponseDTO(restaurant.id, restaurant.role, restaurant.name, restaurant.email, restaurant.phoneNumber, restaurant.address, restaurant.rating, restaurant.image);
    res.status(http_status_codes_1.StatusCodes.OK).json({ dto });
});
const UpdateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, address, image } = req.body;
    const { id } = req.params;
    if (!id || !name || !phoneNumber || !address || !image) {
        throw new bad_request_1.BadRequestError("Please provide all the values!");
    }
    let restaurant = yield restaurantRepository.findOne({ where: { id: Number(id) } });
    if (!restaurant) {
        throw new not_found_1.NotFoundError("There is no restaurant with given id!");
    }
    restaurant.name = name;
    restaurant.phoneNumber = phoneNumber;
    restaurant.address = address;
    restaurant.image = image;
    try {
        yield restaurantRepository.save(restaurant);
        res.status(http_status_codes_1.StatusCodes.OK).json({ restaurant });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
const DeleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let restaurant = yield restaurantRepository.findOne({ where: { id: Number(id) } });
    if (!restaurant) {
        throw new not_found_1.NotFoundError("There is no restaurant with given id!");
    }
    try {
        yield restaurantRepository.delete(id);
        res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Restaurant deleted successfully" });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem while deleting the data!");
    }
});
const GetAverageMealPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const SearchRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurant } = req.query;
    if (!restaurant || typeof restaurant !== "string") {
        throw new bad_request_1.BadRequestError("Name query param is required");
    }
    const restaurants = yield restaurantRepository.find({
        where: { name: (0, typeorm_1.ILike)(`%${restaurant}%`) }
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ restaurants });
});
exports.default = {
    GetAllRestaurants,
    GetRestaurantById,
    UpdateRestaurant,
    DeleteRestaurant,
    SearchRestaurants
};
