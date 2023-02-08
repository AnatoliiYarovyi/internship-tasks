import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import { CtrlSuppliers } from '../controllers/CtrlSuppliers';
const ctrl = new CtrlSuppliers();

router.get('/', controllerWrapper(ctrl.getAllSuppliers));
router.get('/rowCount', controllerWrapper(ctrl.getRowCount));
router.get('/:id', controllerWrapper(ctrl.getSupplierById));

export default router;
