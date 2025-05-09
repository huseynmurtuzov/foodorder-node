import express from 'express';
const router = express.Router();
import { GetUserNotifications,SetAsRead,AnyUnreadNotification } from '../controllers/NotificationsController';
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import { userRole } from '../utils/enums/userRole';

router.route('/getUserNotifications/:userId').get([authenticateUser],GetUserNotifications);
router.route('/setAsRead/:id').get([authenticateUser],SetAsRead);
router.route('/anyUnreadNotifications/:userId').get([authenticateUser],AnyUnreadNotification);

export default router