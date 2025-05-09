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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const Customer_1 = require("./Customer");
const Restaurant_1 = require("./Restaurant");
const DeliveryPersonnel_1 = require("./DeliveryPersonnel");
const Payment_1 = require("./Payment");
const Meal_1 = require("./Meal");
const orderStatus_1 = require("../utils/enums/orderStatus");
let Order = class Order {
    constructor() {
        this.orderDate = new Date();
    }
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Order.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: orderStatus_1.orderStatus.PENDING }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, (customer) => customer.orders),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Customer_1.Customer)
], Order.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Restaurant_1.Restaurant, (restaurant) => restaurant.orders),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Restaurant_1.Restaurant)
], Order.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DeliveryPersonnel_1.DeliveryPersonnel, (deliveryPersonnel) => deliveryPersonnel.orders),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", DeliveryPersonnel_1.DeliveryPersonnel)
], Order.prototype, "deliveryPersonnel", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Payment_1.Payment, (payment) => payment.order, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Payment_1.Payment)
], Order.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Meal_1.Meal, meal => meal.orders),
    (0, typeorm_1.JoinTable)() // 
    ,
    __metadata("design:type", Array)
], Order.prototype, "meals", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: "Order" })
], Order);
