const express = require('express');
const router = express.Router();

const { telegram: ctrl } = require('../../controllers');
const { controllerWrapper } = require('../../middlewares');

router.post('/', controllerWrapper(ctrl.main));

module.exports = router;
