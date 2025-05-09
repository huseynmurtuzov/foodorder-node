"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const PaymentsController_1 = require("../controllers/PaymentsController");
router.route('/').get(PaymentsController_1.GetAllPayments);
router.route('/:id').get(PaymentsController_1.GetPaymentById);
exports.default = router;
