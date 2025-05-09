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
exports.DeliveryPersonnel = void 0;
const typeorm_1 = require("typeorm");
const veichleType_1 = require("../utils/enums/veichleType");
const userRole_1 = require("../utils/enums/userRole");
const Order_1 = require("./Order");
const BaseUser_1 = require("./BaseUser");
let DeliveryPersonnel = class DeliveryPersonnel extends BaseUser_1.User {
    constructor() {
        super();
        this.role = userRole_1.userRole.DELIVERYPERSONNEL;
    }
};
exports.DeliveryPersonnel = DeliveryPersonnel;
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], DeliveryPersonnel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], DeliveryPersonnel.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], DeliveryPersonnel.prototype, "veichleType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.Order, (order) => order.deliveryPersonnel),
    __metadata("design:type", Array)
], DeliveryPersonnel.prototype, "orders", void 0);
exports.DeliveryPersonnel = DeliveryPersonnel = __decorate([
    (0, typeorm_1.Entity)({ name: "DeliveryPersonnel" }),
    __metadata("design:paramtypes", [])
], DeliveryPersonnel);
