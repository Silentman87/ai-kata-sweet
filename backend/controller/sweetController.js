const Sweet = require('../models/Sweet');

exports.addSweet = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  try {
    const sweet = await Sweet.create({ name, category, price, quantity });
    res.status(201).json(sweet);
  } catch(err) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
}

exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const query = {};
  if(name) query.name = { $regex: name, $options: 'i' };
  if(category) query.category = { $regex: category, $options: 'i' };
  if(minPrice || maxPrice) query.price = {};
  if(minPrice) query.price.$gte = parseFloat(minPrice);
  if(maxPrice) query.price.$lte = parseFloat(maxPrice);

  const sweets = await Sweet.find(query);
  res.json(sweets);
}

exports.updateSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if(!sweet) return res.status(404).json({ message: 'Sweet not found' });

  const { name, category, price, quantity } = req.body;
  sweet.name = name || sweet.name;
  sweet.category = category || sweet.category;
  sweet.price = price || sweet.price;
  sweet.quantity = quantity !== undefined ? quantity : sweet.quantity;

  await sweet.save();
  res.json(sweet);
}

exports.deleteSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if(!sweet) return res.status(404).json({ message: 'Sweet not found' });
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: 'Sweet removed' });
}

exports.purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if(!sweet) return res.status(404).json({ message: 'Sweet not found' });
  if(sweet.quantity <= 0) return res.status(400).json({ message: 'Out of stock' });

  sweet.quantity -= 1;
  await sweet.save();
  res.json({ message: 'Purchase successful', sweet });
}

exports.restockSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if(!sweet) return res.status(404).json({ message: 'Sweet not found' });

  const { quantity } = req.body;
  sweet.quantity += quantity;
  await sweet.save();
  res.json({ message: 'Restocked successfully', sweet });
}
