const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const foodPartnerController = require('../controllers/foodpartner.controller');



const router = express.Router();


// get / api/food/food-partner/:id
router.get('/:id',
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById
    )

module.exports = router;