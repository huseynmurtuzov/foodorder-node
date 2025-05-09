"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const MealsController_1 = require("../controllers/MealsController");
router.route('/').get(MealsController_1.GetAllMeals).post(MealsController_1.AddMeal);
router.route('/:id').get(MealsController_1.GetMealById).patch(MealsController_1.UpdateMeal).delete(MealsController_1.DeleteMeal);
router.route('/getRestaurantMeals/:restaurantId').get(MealsController_1.getMealsOfRestaurant);
router.route('/searchMeal/:meal').get(MealsController_1.SearchMeals);
exports.default = router;
