import express from 'express';
const router = express.Router();
import {GetAllRestaurantReviews,GetRestaurantReviewById,UpdateRestaurantReviews,DeleteRestaurantReviews,AddRestaurantReviews,GetRestaurantReviewsByRestaurant,GetCustomerReviews} from '../controllers/RestaurantReviewsController'
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import { userRole } from '../utils/enums/userRole';

router.route('/').get([authenticateUser,authorizePermissions(userRole.ADMIN)],GetAllRestaurantReviews).post([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.CUSTOMER)],AddRestaurantReviews);
router.route('/:id').get(GetRestaurantReviewById).patch([authenticateUser,authorizePermissions(userRole.CUSTOMER)],UpdateRestaurantReviews).delete([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.CUSTOMER)],DeleteRestaurantReviews);
router.route("/getRestaurantReviewsByRestaurant/:restaurantId").get(GetRestaurantReviewsByRestaurant);
router.route("/getRestaurantReviewsByCustomer/:customerId").get([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.CUSTOMER)],GetCustomerReviews);

export default router