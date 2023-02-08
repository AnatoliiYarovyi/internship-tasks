import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import { CtrlCities } from '../controllers/CtrlCities';
const ctrl = new CtrlCities();

router.get('/searchName', controllerWrapper(ctrl.getCities));
router.get('/searchState', controllerWrapper(ctrl.getState));

export default router;
