import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import { CtrlProducts } from '../controllers/CtrlProducts';
const ctrl = new CtrlProducts();

router.get('/', controllerWrapper(ctrl.getAllProducts));
router.get('/rowCount', controllerWrapper(ctrl.getRowCount));
router.get(
  '/search',
    controllerWrapper(ctrl.getSearchProducts),
);
router.get('/:id', controllerWrapper(ctrl.getProductsById));

export default router;
