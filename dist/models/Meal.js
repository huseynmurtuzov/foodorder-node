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
exports.Meal = void 0;
const typeorm_1 = require("typeorm");
const Restaurant_1 = require("./Restaurant");
const Order_1 = require("./Order");
let Meal = class Meal {
};
exports.Meal = Meal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Meal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Meal.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Meal.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Meal.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Meal.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Meal.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Meal.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 5 }),
    __metadata("design:type", Number)
], Meal.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Restaurant_1.Restaurant, (restaurant) => restaurant.meals),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Restaurant_1.Restaurant)
], Meal.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Order_1.Order, order => order.meals),
    __metadata("design:type", Array)
], Meal.prototype, "orders", void 0);
exports.Meal = Meal = __decorate([
    (0, typeorm_1.Entity)({ name: "Meal" })
], Meal);
