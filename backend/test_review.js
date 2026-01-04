const axios = require('axios')

const token = '' // put a valid user token if testing protected route

axios.get('http://localhost:5000/api/products')
    .then(async res => {
        const prod = res.data[0]
        if (!prod) return console.error('No products')
        try {
            const r = await axios.post(`http://localhost:5000/api/products/${prod._id}/reviews`, { rating: 5, comment: 'Great!' }, { headers: { Authorization: `Bearer ${token}` } })
            console.log('Review response:', r.data)
        } catch (err) {
            console.error('Review error:', err.response ? err.response.data : err.message)
        }
    }).catch(console.error)
