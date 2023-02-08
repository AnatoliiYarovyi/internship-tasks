import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import { CtrlCustomers } from '../controllers/CtrlCustomers';
const ctrl = new CtrlCustomers();

router.get('/', controllerWrapper(ctrl.getAllCustomers));
router.get('/rowCount', controllerWrapper(ctrl.getRowCount));
router.get('/search', controllerWrapper(ctrl.getSearchCustomers));
router.get('/:id', controllerWrapper(ctrl.getCustomerById));

export default router;
