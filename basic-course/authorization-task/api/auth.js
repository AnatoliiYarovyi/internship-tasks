const express = require('express')
const router = express.Router()

const { auth: ctrl } = require('../controllers')
const { controllerWrapper } = require('../middlewares')

router.post('/signup', controllerWrapper(ctrl.signup))
router.post('/login', controllerWrapper(ctrl.login))
router.post('/refresh', controllerWrapper(ctrl.refresh))
// router.get('/me', controllerWrapper(ctrl.me))
// router.get('/me/:mock', controllerWrapper(ctrl.me))
router.get('/:me', controllerWrapper(ctrl.me))

module.exports = router
