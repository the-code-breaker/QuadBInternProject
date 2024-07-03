const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add new product
const addProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category
    });

    const product = await newProduct.save();
    res.status(201).json(product);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update product by ID
const updateProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Update product fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;

    await product.save();

    res.json({ msg: 'Product updated successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete product by ID
const deleteProduct = async (req, res) => {
    console.log(req)
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    await product.deleteOne();

    res.json({ msg: 'Product deleted successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
