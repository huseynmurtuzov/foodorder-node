"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const RestaurantsController_1 = require("../controllers/RestaurantsController");
router.route('/').get(RestaurantsController_1.GetAllRestaurants);
router.route('/:id').get(RestaurantsController_1.GetRestaurantById).patch(RestaurantsController_1.UpdateRestaurant).delete(RestaurantsController_1.DeleteRestaurant);
router.route('/searchRestaurants/:restaurant').get(RestaurantsController_1.SearchRestaurants);
router.route('/getAverageMealPrice/:id').get(RestaurantsController_1.GetAverageMealPrice);
router.route('/getTotalAmount/:id').get(RestaurantsController_1.GetTotalAmount);
exports.default = router;
