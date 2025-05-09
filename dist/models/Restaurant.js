"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("./Order");
const RestaurantReview_1 = require("./RestaurantReview");
const Meal_1 = require("./Meal");
const userRole_1 = require("../utils/enums/userRole");
const BaseUser_1 = require("./BaseUser");
let Restaurant = class Restaurant extends BaseUser_1.User {
    constructor() {
        super();
        this.role = userRole_1.userRole.RESTAURANT;
    }
};
exports.Restaurant = Restaurant;
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Restaurant.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Restaurant.prototype, "workingHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Restaurant.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Restaurant.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.Order, (order) => order.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RestaurantReview_1.RestaurantReview, (restaurantReview) => restaurantReview.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "restaurantReview", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Meal_1.Meal, (meal) => meal.restaurant),
    __metadata("design:type", Array)
], Restaurant.prototype, "meals", void 0);
exports.Restaurant = Restaurant = __decorate([
    (0, typeorm_1.Entity)({ name: "Restaurant" }),
    __metadata("design:paramtypes", [])
], Restaurant);
