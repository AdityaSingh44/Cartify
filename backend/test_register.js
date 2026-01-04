const axios = require('axios')

axios.post('http://localhost:5000/api/auth/register', { name: 'Test User', email: 'testuser@example.com', password: 'password123' })
    .then(res => console.log('Register response:', res.data))
    .catch(err => console.error('Register error:', err.response ? err.response.data : err.message))
