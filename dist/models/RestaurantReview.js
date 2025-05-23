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
exports.RestaurantReview = void 0;
const typeorm_1 = require("typeorm");
const Customer_1 = require("./Customer");
const Restaurant_1 = require("./Restaurant");
let RestaurantReview = class RestaurantReview {
    constructor() {
        this.reviewDate = new Date();
    }
};
exports.RestaurantReview = RestaurantReview;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RestaurantReview.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], RestaurantReview.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], RestaurantReview.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], RestaurantReview.prototype, "reviewDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, (customer) => customer.orders),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Customer_1.Customer)
], RestaurantReview.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Restaurant_1.Restaurant, (restaurant) => restaurant.restaurantReview),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Restaurant_1.Restaurant)
], RestaurantReview.prototype, "restaurant", void 0);
exports.RestaurantReview = RestaurantReview = __decorate([
    (0, typeorm_1.Entity)({ name: "RestaurantReview" })
], RestaurantReview);
