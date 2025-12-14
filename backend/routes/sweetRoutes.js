const express = require('express');
const router = express.Router();
const {
    getSweets,
    searchSweets,
    createSweet,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet,
} = require('../controllers/sweetController');
const { protect, admin } = require('../middleware/authMiddleware');
const { check } = require('express-validator');

router.route('/').get(getSweets).post(
    protect,
    admin,
    [
        check('name', 'Name is required').not().isEmpty(),
        // Category made optional as frontend doesn't send it currently
        check('price', 'Price is required and should be a number').isNumeric(),
        check('quantity', 'Quantity is required and should be a number').isNumeric(),
    ],
    createSweet
);

router.route('/search').get(searchSweets);

router
    .route('/:id')
    .put(protect, admin, updateSweet)
    .delete(protect, admin, deleteSweet);

router.route('/:id/purchase').post(protect, purchaseSweet);
router.route('/:id/restock').post(protect, admin, restockSweet);

module.exports = router;
