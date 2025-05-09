"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const CustomersController_1 = require("../controllers/CustomersController");
router.route("/").get(CustomersController_1.GetAllCustomers);
router.route("/:id").get(CustomersController_1.GetCustomerById).patch(CustomersController_1.EditCustomer).delete(CustomersController_1.DeleteCustomer);
exports.default = router;
