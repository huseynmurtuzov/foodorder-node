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
exports.getMealsOfRestaurant = exports.SearchMeals = exports.DeleteMeal = exports.UpdateMeal = exports.AddMeal = exports.GetMealById = exports.GetAllMeals = void 0;
const dataSource_1 = __importDefault(require("../dataSource/dataSource"));
const http_status_codes_1 = require("http-status-codes");
const Meal_1 = require("../models/Meal");
const not_found_1 = require("../errors/not-found");
const Restaurant_1 = require("../models/Restaurant");
const bad_request_1 = require("../errors/bad-request");
const server_1 = require("../errors/server");
const typeorm_1 = require("typeorm");
const mealsRepo = dataSource_1.default.getRepository(Meal_1.Meal);
const restaurantRepo = dataSource_1.default.getRepository(Restaurant_1.Restaurant);
const GetAllMeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const meals = yield mealsRepo.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ meals });
});
exports.GetAllMeals = GetAllMeals;
const GetMealById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const meal = yield mealsRepo.findOne({ where: { id: Number(req.params.id) } });
    if (!meal) {
        throw new not_found_1.NotFoundError("There is no meal with given id!");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ meal });
});
exports.GetMealById = GetMealById;
const AddMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, isAvailable, image, quantity, restaurantId } = req.body;
    if (!name || !price || !restaurantId || !description || !isAvailable || !image || !quantity) {
        throw new bad_request_1.BadRequestError("Please provide all the values");
    }
    const restaurant = yield restaurantRepo.findOne({ where: { id: Number(restaurantId) } });
    if (!restaurant) {
        throw new not_found_1.NotFoundError("There is no restaurant with given id!");
    }
    let newMeal = new Meal_1.Meal();
    newMeal.name = name;
    newMeal.price = price;
    newMeal.description = description;
    newMeal.isAvailable = isAvailable;
    newMeal.image = image;
    newMeal.quantity = quantity;
    newMeal.rating = 0;
    newMeal.restaurant = restaurant;
    try {
        const savedmeal = yield mealsRepo.save(newMeal);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ savedmeal });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
exports.AddMeal = AddMeal;
const UpdateMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, isAvailable, image } = req.body;
    const { id } = req.params;
    if (!id || !name || !price || !description || !isAvailable || !image) {
        throw new bad_request_1.BadRequestError("Please provide all the values");
    }
    let meal = yield mealsRepo.findOne({ where: { id: Number(id) } });
    if (!meal) {
        throw new not_found_1.NotFoundError("There is no meal with given id!");
    }
    meal.name = name;
    meal.price = price;
    meal.description = description;
    meal.isAvailable = isAvailable;
    meal.image = image;
    try {
        yield mealsRepo.save(meal);
        res.status(http_status_codes_1.StatusCodes.OK).json({ meal });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
exports.UpdateMeal = UpdateMeal;
const DeleteMeal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let meal = yield mealsRepo.findOne({ where: { id: Number(id) } });
    if (!meal) {
        throw new not_found_1.NotFoundError("There is no meal with given id!");
    }
    try {
        yield mealsRepo.delete(id);
        res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Meal deleted successfully" });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
exports.DeleteMeal = DeleteMeal;
const SearchMeals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meal } = req.params;
    if (!meal || typeof meal !== "string") {
        throw new bad_request_1.BadRequestError("Name query param is required");
    }
    const meals = yield mealsRepo.find({
        where: { name: (0, typeorm_1.ILike)(`%${meal}%`) }
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ meals });
});
exports.SearchMeals = SearchMeals;
const getMealsOfRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = req.params;
    if (!restaurantId) {
        throw new bad_request_1.BadRequestError("Id is null");
    }
    try {
        let restaurant = yield restaurantRepo.findOne({ where: { id: Number(restaurantId) } });
        if (!restaurant) {
            throw new not_found_1.NotFoundError("There is no restaurant with given id!");
        }
        let meals = yield mealsRepo.find({ where: { restaurant: restaurant } });
        res.status(http_status_codes_1.StatusCodes.OK).json({ meals });
    }
    catch (error) {
        throw new server_1.ServerError("There was some problem durong fetching restaurant meals");
    }
});
exports.getMealsOfRestaurant = getMealsOfRestaurant;
