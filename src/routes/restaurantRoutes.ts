import express from 'express';
const router = express.Router();
import {GetAllRestaurants,GetRestaurantById,UpdateRestaurant,DeleteRestaurant,SearchRestaurants,GetAverageMealPrice,GetTotalAmount} from '../controllers/RestaurantsController'
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import { userRole } from '../utils/enums/userRole';

router.route('/').get(GetAllRestaurants);
router.route('/:id').get(GetRestaurantById).patch([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.RESTAURANT)],UpdateRestaurant).delete([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.RESTAURANT)],DeleteRestaurant);
router.route('/searchRestaurants/:restaurant').get(SearchRestaurants);
router.route('/getAverageMealPrice/:id').get([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.RESTAURANT)],GetAverageMealPrice)
router.route('/getTotalAmount/:id').get([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.RESTAURANT)],GetTotalAmount)

export default router