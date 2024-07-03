const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

// Route to get user's shopping cart
router.get('/', authMiddleware, cartController.getCart);

// Route to add an item to the shopping cart
router.post('/', authMiddleware, cartController.addItemToCart);

// Route to remove an item from the shopping cart
router.delete('/:id', authMiddleware, cartController.removeItemFromCart);

module.exports = router;
