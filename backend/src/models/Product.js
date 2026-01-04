const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
}, { timestamps: true });

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        images: [{ type: String }],
        description: { type: String },
        longDescription: { type: String },
        price: { type: Number, required: true, default: 0 },
        discountPercentage: { type: Number, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        category: { type: String },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        reviews: [reviewSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
