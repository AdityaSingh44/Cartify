const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// GET /api/products?keyword=&category=&sort=&minPrice=&maxPrice=
router.get('/', async (req, res) => {
    const { keyword = '', category, sort } = req.query;
    const filter = { name: { $regex: keyword, $options: 'i' } };
    if (category) filter.category = category;
    try {
        let q = Product.find(filter);
        if (sort === 'price_asc') q = q.sort({ price: 1 });
        if (sort === 'price_desc') q = q.sort({ price: -1 });
        const products = await q.exec();
        res.json(products);
    } catch (err) {
        console.error('Review error:', err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
});

// GET distinct categories
router.get('/categories/list', async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories.filter(Boolean));
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, images, description, longDescription, price, discountPercentage, countInStock, category } = req.body
        const p = new Product({ name, images, description, longDescription, price, discountPercentage, countInStock, category })
        const prod = await p.save();
        res.status(201).json(prod);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET admin product list with pagination
router.get('/admin/list', protect, admin, async (req, res) => {
    try {
        const pageSize = Number(req.query.pageSize) || 20
        const page = Number(req.query.page) || 1
        const count = await Product.countDocuments()
        const products = await Product.find().skip(pageSize * (page - 1)).limit(pageSize)
        res.json({ products, page, pages: Math.ceil(count / pageSize) })
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { name, images, description, longDescription, price, discountPercentage, countInStock, category } = req.body
        const prod = await Product.findById(req.params.id)
        if (!prod) return res.status(404).json({ message: 'Product not found' })
        prod.name = name ?? prod.name
        prod.images = images ?? prod.images
        prod.description = description ?? prod.description
        prod.longDescription = longDescription ?? prod.longDescription
        prod.price = typeof price !== 'undefined' ? price : prod.price
        prod.discountPercentage = typeof discountPercentage !== 'undefined' ? discountPercentage : prod.discountPercentage
        prod.countInStock = typeof countInStock !== 'undefined' ? countInStock : prod.countInStock
        prod.category = category ?? prod.category
        await prod.save()
        res.json(prod)
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', protect, admin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add review
router.post('/:id/reviews', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) return res.status(400).json({ message: 'Product already reviewed' });
        const review = { user: req.user._id, name: req.user.name, rating: Number(req.body.rating), comment: req.body.comment };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
