import express from 'express';
const router = express.Router();
import { GetAllCustomers,GetCustomerById,EditCustomer,DeleteCustomer } from '../controllers/CustomersController';
import { authenticateUser, authorizePermissions } from '../middleware/authentication';
import { userRole } from '../utils/enums/userRole';

router.route("/").get([authenticateUser,authorizePermissions(userRole.ADMIN)],GetAllCustomers);
router.route("/:id").get([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.CUSTOMER)],GetCustomerById).patch([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.CUSTOMER)],EditCustomer).delete([authenticateUser,authorizePermissions(userRole.ADMIN,userRole.CUSTOMER)],DeleteCustomer);

export default router
