const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//Create router for user
const router = express.Router();

//Routes of users as customer
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
	'/updateMyPassword',
	authController.protect,
	authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

//Routes of users as assistant/admin ( completed)
router
	.route('/')
	.get(
		authController.protect,
		authController.restrictTo('admin', 'assistant'),
		userController.getAllUsers
	)
	.post(userController.createUser);
router
	.route('/:id')
	.get(
		authController.protect,
		authController.restrictTo('admin', 'assistant'),
		userController.getUser
	)
	.patch(
		authController.protect,
		authController.restrictTo('admin', 'assistant'),
		userController.updateUser
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		userController.deleteUser
	);

//export for using in app
module.exports = router;
