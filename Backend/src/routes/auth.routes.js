const express = require('express');
const authController = require('../controllers/auth.controller');

// const app = express();
const router = express.Router();

// User Routes auth apis
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);

router.get("/me", authController.getMe);
// Food Partner Routes auth apis
router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.get('/food-partner/logout', authController.logoutFoodPartner);

module.exports = router;

// Define your authentication routes here
// For example:
// router.post('/login', (req, res) => { ... });
// router.post('/register', (req, res) => { ... });