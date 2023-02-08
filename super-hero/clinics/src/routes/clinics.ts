import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import { CtrlClinics } from '../controllers/CtrlClinics';
const ctrl = new CtrlClinics();

router.get('/byCity', controllerWrapper(ctrl.getClinicsByCity));
router.get('/byName', controllerWrapper(ctrl.getClinicsByName));
router.get('/byPostcode', controllerWrapper(ctrl.getClinicsByPostcode));
router.get('/byState', controllerWrapper(ctrl.getClinicsByState));
router.get('/bySuburb', controllerWrapper(ctrl.getClinicsBySuburb));
router.get('/searchName', controllerWrapper(ctrl.getClinicNames));

export default router;
