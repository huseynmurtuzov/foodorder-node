import express from 'express';
const router = express.Router();
import { GetAllPayments,GetPaymentById } from '../controllers/PaymentsController';
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import { userRole } from '../utils/enums/userRole';
router.route('/').get([authenticateUser,authorizePermissions(userRole.ADMIN)],GetAllPayments)
router.route('/:id').get([authenticateUser],GetPaymentById)

export default router