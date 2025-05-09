import express from 'express';
const router = express.Router();
import {GetAllOrders,GetOrderById,AddOrder,SetAsPrepared,SetAsDelivered,CancelOrder,GetOrdersByCustomer,GetOrdersByDeliveryPersonnel,
GetOrdersByRestaurant} from '../controllers/OrdersController';
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import { userRole } from '../utils/enums/userRole';

router.route('/').get([authenticateUser,authorizePermissions(userRole.ADMIN)],GetAllOrders).post([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.CUSTOMER)],AddOrder);

router.route('/:id').get([authenticateUser],GetOrderById);

router.route('/:id/setAsPrepared').get([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.RESTAURANT)],SetAsPrepared)

router.route('/:id/setAsDelivered').get([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.DELIVERYPERSONNEL)],SetAsDelivered)

router.route('/:id/cancelOrder').get([authenticateUser],CancelOrder)

router.route('/getOrdersByCustomer/:customerId').get([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.CUSTOMER)],GetOrdersByCustomer)

router.route('/getOrdersByDeliveryPersonnel/:deliveryPersonnelId').get([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.DELIVERYPERSONNEL)],GetOrdersByDeliveryPersonnel)

router.route('/getOrdersByRestaurant/:restaurantId').get([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.RESTAURANT)],GetOrdersByRestaurant)

export default router