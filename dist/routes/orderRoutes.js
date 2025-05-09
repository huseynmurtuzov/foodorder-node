"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const OrdersController_1 = require("../controllers/OrdersController");
router.route('/').get(OrdersController_1.GetAllOrders).post(OrdersController_1.AddOrder);
router.route('/:id').get(OrdersController_1.GetOrderById);
router.route('/:id/setAsPrepared').get(OrdersController_1.SetAsPrepared);
router.route('/:id/setAsDelivered').get(OrdersController_1.SetAsDelivered);
router.route('/:id/cancelOrder').get(OrdersController_1.CancelOrder);
router.route('/getOrdersByCustomer/:customerId').get(OrdersController_1.GetOrdersByCustomer);
router.route('/getOrdersByDeliveryPersonnel/:deliveryPersonnelId').get(OrdersController_1.GetOrdersByDeliveryPersonnel);
router.route('/getOrdersByRestaurant/:restaurantId').get(OrdersController_1.GetOrdersByRestaurant);
exports.default = router;
