"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const DeliveryPersonnelsController_1 = require("../controllers/DeliveryPersonnelsController");
router.route('/').get(DeliveryPersonnelsController_1.GetAllDeliveryPersonnels);
router.route('/:id').get(DeliveryPersonnelsController_1.GetDeliveryPersonnelById).patch(DeliveryPersonnelsController_1.UpdateDeliveryPersonnel).delete(DeliveryPersonnelsController_1.DeleteDeliveryPersonnel);
router.route('/performance/:id').get(DeliveryPersonnelsController_1.GetDeliveryPersonnelPerformanceById);
exports.default = router;
