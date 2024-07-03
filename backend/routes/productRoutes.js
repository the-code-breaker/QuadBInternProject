const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {authMiddleware, adminOnly} = require('../middleware/authMiddleware');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', authMiddleware, adminOnly, productController.addProduct);
router.put('/:id', authMiddleware, adminOnly, productController.updateProduct);
router.delete('/:id', authMiddleware, adminOnly, productController.deleteProduct);

module.exports = router;
