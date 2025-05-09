import express from 'express';
const router = express.Router();
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import { userRole } from '../utils/enums/userRole';

import { GetAllDeliveryPersonnels,GetDeliveryPersonnelById,UpdateDeliveryPersonnel,DeleteDeliveryPersonnel,GetDeliveryPersonnelPerformanceById } from '../controllers/DeliveryPersonnelsController';

router.route('/').get([authenticateUser,authorizePermissions(userRole.ADMIN)],GetAllDeliveryPersonnels);
router.route('/:id').get(GetDeliveryPersonnelById).patch([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.DELIVERYPERSONNEL)],UpdateDeliveryPersonnel).delete([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.DELIVERYPERSONNEL)],DeleteDeliveryPersonnel);
router.route('/performance/:id').get([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.DELIVERYPERSONNEL)],GetDeliveryPersonnelPerformanceById)

export default router