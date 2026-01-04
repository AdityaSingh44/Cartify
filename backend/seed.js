const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const connectDB = require('./src/config/db')
const User = require('./src/models/User')
const Product = require('./src/models/Product')

dotenv.config()
const seed = async () => {
    await connectDB()
    try {
        await User.deleteMany()
        await Product.deleteMany()
        const adminPass = await bcrypt.hash('admin123', 10)
        const admin = await User.create({ name: 'Admin', email: 'admin@cartify.com', password: adminPass, isAdmin: true })
        const sampleProducts = [
            { name: 'Wireless Headphones', images: ['https://placehold.co/600x400'], description: 'High quality headphones', price: 99.99, countInStock: 20, category: 'Electronics' },
            { name: 'Running Shoes', images: ['https://placehold.co/600x400'], description: 'Comfortable running shoes', price: 79.99, countInStock: 15, category: 'Footwear' },
            { name: 'Coffee Mug', images: ['https://placehold.co/600x400'], description: 'Ceramic mug', price: 9.99, countInStock: 100, category: 'Home' }
        ]
        await Product.insertMany(sampleProducts)
        console.log('Seeded admin and products')
        process.exit()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

seed()
