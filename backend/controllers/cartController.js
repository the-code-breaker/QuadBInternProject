const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's shopping cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add item to cart
const addItemToCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }

      cart.items.push({ product: productId });
    }

    await cart.save();
    res.json(cart);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    // Filter out the item to be removed
    cart.items = cart.items.filter(item => item._id.toString() !== id);

    await cart.save();
    res.json(cart);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart
};
