import express from 'express';
const router = express.Router();
import {Login,Register,RegisterAsDeliveryPersonnel,RegisterAsRestaurant,AdminLogin,Logout} from '../controllers/AccountController';


router.route('/Login').post(Login);
router.route('/Register').post(Register)
router.route('/RegisterAsRestaurant').post(RegisterAsRestaurant);
router.route('/RegisterAsDeliveryPersonnel').post(RegisterAsDeliveryPersonnel);
router.route('/Logout').get(Logout)
router.route('/AdminLogin').post(AdminLogin);

export default router