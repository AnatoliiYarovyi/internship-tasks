import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import { CtrlOrders } from '../controllers/CtrlOrders';
const ctrl = new CtrlOrders();

router.get('/', controllerWrapper(ctrl.getAllOrders));
router.get('/rowCount', controllerWrapper(ctrl.getRowCount));
router.get('/:id', controllerWrapper(ctrl.getOrderById));

export default router;
