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
} = require('../controllers/sweetController');

router.post('/', addSweet);
router.get('/',  getSweets);
router.get('/search', searchSweets);
router.put('/:id', updateSweet);
router.delete('/:id', deleteSweet);

router.post('/:id/purchase', purchaseSweet);
router.post('/:id/restock',  restockSweet);

module.exports = router;
