import express from 'express';
const router = express.Router();
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import { userRole } from '../utils/enums/userRole';
import { GetAllMeals,GetMealById,AddMeal,UpdateMeal,DeleteMeal,SearchMeals,getMealsOfRestaurant } from '../controllers/MealsController';

router.route('/').get(GetAllMeals).post([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.RESTAURANT)],AddMeal);
router.route('/:id').get(GetMealById).patch([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.RESTAURANT)],UpdateMeal).delete([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.RESTAURANT)],DeleteMeal);
router.route('/getRestaurantMeals/:restaurantId').get(getMealsOfRestaurant);
router.route('/searchMeal/:meal').get(SearchMeals);

export default router
