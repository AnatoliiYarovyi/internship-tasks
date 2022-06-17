import express from 'express';
const router = express.Router();

import main from '../../controllers/telegram/main';
import controllerWrapper from '../../middlewares/';

router.post('/', controllerWrapper(main));

export default router;
