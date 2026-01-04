const axios = require('axios')

axios.post('http://localhost:5000/api/auth/login', { email: 'admin@cartify.com', password: 'admin123' })
    .then(res => console.log('Login response:', res.data))
    .catch(err => console.error('Login error:', err.response ? err.response.data : err.message))
