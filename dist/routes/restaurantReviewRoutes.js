"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const RestaurantReviewsController_1 = require("../controllers/RestaurantReviewsController");
router.route('/').get(RestaurantReviewsController_1.GetAllRestaurantReviews).post(RestaurantReviewsController_1.AddRestaurantReviews);
router.route('/:id').get(RestaurantReviewsController_1.GetRestaurantReviewById).patch(RestaurantReviewsController_1.UpdateRestaurantReviews).delete(RestaurantReviewsController_1.DeleteRestaurantReviews);
router.route("/getRestaurantReviewsByRestaurant/:restaurantId").get(RestaurantReviewsController_1.GetRestaurantReviewsByRestaurant);
router.route("/getRestaurantReviewsByCustomer/:customerId").get(RestaurantReviewsController_1.GetCustomerReviews);
exports.default = router;
