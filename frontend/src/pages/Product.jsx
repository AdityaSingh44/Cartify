import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api'
import Rating from '../components/Rating'

export default function Product() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        API.get(`/products/${id}`).then(res => setProduct(res.data)).catch(console.error)
    }, [id])
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const existing = cart.find(i => i.product === product._id)
        if (existing) existing.qty += 1
        else cart.push({ product: product._id, qty: 1, price: product.price, name: product.name, image: product.images && product.images[0] })
        localStorage.setItem('cart', JSON.stringify(cart))
        navigate('/cart')
    }
    if (!product) return <div>Loading...</div>
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <img src={product.images && product.images[0]} alt="" className="w-full h-96 object-cover rounded" />
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold">{product.name}</h2>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        <p className="mt-2 text-gray-700">{product.description}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <div className="text-lg">Price: <span className="font-bold text-indigo-600">${product.price}</span></div>
                    <div className="mt-2">Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                    <button onClick={addToCart} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded">Add to Cart</button>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-semibold">Reviews</h3>
                <div className="space-y-4 mt-4">
                    {product.reviews && product.reviews.map(r => (
                        <div key={r._id} className="bg-white p-3 rounded shadow">
                            <div className="font-semibold">{r.name}</div>
                            <div className="text-sm text-gray-600">Rating: {r.rating}</div>
                            <div className="mt-2">{r.comment}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 bg-white p-4 rounded shadow">
                    <h4 className="font-semibold">Write a Review</h4>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        const token = localStorage.getItem('token')
                        if (!token) return alert('Please login to write a review')
                        const rating = Number(e.target.rating.value)
                        const comment = e.target.comment.value
                        try {
                            await API.post(`/products/${product._id}/reviews`, { rating, comment })
                            alert('Review submitted — refresh to see it')
                        } catch (err) { alert(err.response?.data?.message || 'Failed') }
                    }} className="space-y-3 mt-3">
                        <div>
                            <label className="block text-sm">Rating</label>
                            <select name="rating" className="border rounded px-3 py-2 w-32">
                                <option value="5">5 - Excellent</option>
                                <option value="4">4 - Very good</option>
                                <option value="3">3 - Good</option>
                                <option value="2">2 - Fair</option>
                                <option value="1">1 - Poor</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm">Comment</label>
                            <textarea name="comment" className="w-full border rounded p-2" />
                        </div>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Submit Review</button>
                    </form>
                </div>
            </div>
        </>
    )
}
