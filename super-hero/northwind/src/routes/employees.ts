import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import { CtrlEmployees } from '../controllers/CtrlEmployees';
const ctrl = new CtrlEmployees();

router.get('/', controllerWrapper(ctrl.getAllEmployees));
router.get('/rowCount', controllerWrapper(ctrl.getRowCount));
router.get('/:id', controllerWrapper(ctrl.getEmployeeById));

export default router;
