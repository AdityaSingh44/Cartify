const express = require('express')
const User = require('../models/User')
const { protect, admin } = require('../middleware/auth')

const router = express.Router()

// GET all users (admin)
router.get('/', protect, admin, async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// GET user by ID (admin)
router.get('/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) return res.status(404).json({ message: 'User not found' })
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Update user (admin)
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: 'User not found' })
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (typeof req.body.isAdmin !== 'undefined') user.isAdmin = req.body.isAdmin
        await user.save()
        res.json({ message: 'User updated' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// Delete user (admin)
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: 'User removed' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router
