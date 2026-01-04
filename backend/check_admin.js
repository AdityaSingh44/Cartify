const connectDB = require('./src/config/db')
const User = require('./src/models/User')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

dotenv.config()

const run = async () => {
    await connectDB()
    try {
        const user = await User.findOne({ email: 'admin@cartify.com' })
        if (!user) {
            console.log('Admin user not found (admin@cartify.com)')
            process.exit(0)
        }
        console.log('Found user:', { id: user._id.toString(), email: user.email, name: user.name, isAdmin: user.isAdmin })
        const match = await bcrypt.compare('admin123', user.password)
        console.log('Password matches admin123?:', match)
        process.exit(0)
    } catch (err) {
        console.error('Error checking admin:', err.message)
        process.exit(1)
    }
}

run()
