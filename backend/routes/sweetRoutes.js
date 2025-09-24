const express = require('express');
const router = express.Router();
const {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require('../controller/sweetController');

const { protect, admin } = require('../middleware/errorhandler');

router.post('/', protect, admin, addSweet);
router.get('/', protect, getSweets);
router.get('/search', protect, searchSweets);
router.put('/:id', protect, admin, updateSweet);
router.delete('/:id', protect, admin, deleteSweet);

router.post('/:id/purchase', protect, purchaseSweet);
router.post('/:id/restock', protect, admin, restockSweet);

module.exports = router;
