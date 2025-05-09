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
exports.checkMeals = void 0;
const Meal_1 = require("../../models/Meal");
const dataSource_1 = __importDefault(require("../../dataSource/dataSource"));
const mealRepo = dataSource_1.default.getRepository(Meal_1.Meal);
const checkMeals = (meals) => __awaiter(void 0, void 0, void 0, function* () {
    meals.forEach((meal) => __awaiter(void 0, void 0, void 0, function* () {
        let isRealMeal = yield mealRepo.findOne({ where: { id: meal.id } });
        if (!isRealMeal) {
            return false;
        }
    }));
    return true;
});
exports.checkMeals = checkMeals;
