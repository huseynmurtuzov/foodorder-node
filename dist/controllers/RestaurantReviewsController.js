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
const RestaurantReview_1 = require("../models/RestaurantReview");
const http_status_codes_1 = require("http-status-codes");
const not_found_1 = require("../errors/not-found");
const bad_request_1 = require("../errors/bad-request");
const server_1 = require("../errors/server");
const Restaurant_1 = require("../models/Restaurant");
const Customer_1 = require("../models/Customer");
const reviewRepo = dataSource_1.default.getRepository(RestaurantReview_1.RestaurantReview);
const restaurantRepo = dataSource_1.default.getRepository(Restaurant_1.Restaurant);
const customerRepo = dataSource_1.default.getRepository(Customer_1.Customer);
const GetAllRestaurantReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield reviewRepo.find();
    res.status(http_status_codes_1.StatusCodes.OK).json({ reviews });
});
const GetRestaurantReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield reviewRepo.findOne({ where: { id: Number(req.params.id) } });
    if (!review) {
        throw new not_found_1.NotFoundError("There is no review with given id!");
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ review });
});
const AddRestaurantReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, comment, customerId, restaurantId } = req.body;
    if (!rating || !comment || !customerId || !restaurantId) {
        throw new bad_request_1.BadRequestError("Please provide all the values");
    }
    const restaurant = yield restaurantRepo.findOne({ where: { id: Number(restaurantId) } });
    const customer = yield customerRepo.findOne({ where: { id: Number(customerId) } });
    if (!restaurant) {
        throw new not_found_1.NotFoundError("There is no restaurant with given id!");
    }
    if (!customer) {
        throw new not_found_1.NotFoundError("There is no customer with given id!");
    }
    let newComment = new RestaurantReview_1.RestaurantReview();
    newComment.comment = comment;
    newComment.customer = customer;
    newComment.rating = rating;
    newComment.restaurant = restaurant;
    newComment.reviewDate = new Date();
    try {
        const savedReview = yield reviewRepo.save(newComment);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ savedReview });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
const UpdateRestaurantReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, comment } = req.body;
    const { id } = req.params;
    if (!id || !rating || !comment) {
        throw new bad_request_1.BadRequestError("Please provide all the values");
    }
    let review = yield reviewRepo.findOne({ where: { id: Number(id) } });
    if (!review) {
        throw new not_found_1.NotFoundError("There is no review with given id!");
    }
    review.rating = rating;
    review.comment = comment;
    try {
        yield reviewRepo.save(review);
        res.status(http_status_codes_1.StatusCodes.OK).json({ review });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
const DeleteRestaurantReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let review = yield reviewRepo.findOne({ where: { id: Number(id) } });
    if (!review) {
        throw new not_found_1.NotFoundError("There is no review with given id!");
    }
    try {
        yield reviewRepo.delete(id);
        res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Review deleted successfully" });
    }
    catch (error) {
        throw new server_1.ServerError("There is some problem!");
    }
});
const GetRestaurantReviewsByRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId } = req.params;
    if (!restaurantId) {
        throw new bad_request_1.BadRequestError("Id is null");
    }
    try {
        let restaurant = yield restaurantRepo.findOne({ where: { id: Number(restaurantId) } });
        if (!restaurant) {
            throw new not_found_1.NotFoundError("There is no restaurant with given id!");
        }
        let reviews = yield reviewRepo.find({ where: { restaurant: restaurant } });
        res.status(http_status_codes_1.StatusCodes.OK).json({ reviews });
    }
    catch (error) {
        throw new server_1.ServerError("There was some problem durong fetching restaurant reviews");
    }
});
const GetCustomerReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    if (!customerId) {
        throw new bad_request_1.BadRequestError("Id is null");
    }
    try {
        let customer = yield customerRepo.findOne({ where: { id: Number(customerId) } });
        if (!customer) {
            throw new not_found_1.NotFoundError("There is no customer with given id!");
        }
        let reviews = yield reviewRepo.find({ where: { customer: customer } });
        res.status(http_status_codes_1.StatusCodes.OK).json({ reviews });
    }
    catch (error) {
        throw new server_1.ServerError("There was some problem durong fetching customer reviews");
    }
});
exports.default = {
    GetAllRestaurantReviews,
    GetRestaurantReviewById,
    UpdateRestaurantReviews,
    DeleteRestaurantReviews,
    AddRestaurantReviews,
    GetRestaurantReviewsByRestaurant,
    GetCustomerReviews
};
