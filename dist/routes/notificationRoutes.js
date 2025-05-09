"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const NotificationsController_1 = require("../controllers/NotificationsController");
router.route('/getUserNotifications/:userId').get(NotificationsController_1.GetUserNotifications);
router.route('/setAsRead/:id').get(NotificationsController_1.SetAsRead);
router.route('/anyUnreadNotifications/:userId').get(NotificationsController_1.AnyUnreadNotification);
exports.default = router;
