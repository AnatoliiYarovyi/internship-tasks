import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import { CtrlSuburbs } from '../controllers/CtrlSuburbs';
const ctrl = new CtrlSuburbs();

router.get('/searchSuburbs', controllerWrapper(ctrl.getSuburbs));
router.get('/searchPostcode', controllerWrapper(ctrl.getPostcode));

export default router;
