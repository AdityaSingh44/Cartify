import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api'

export default function Checkout() {
    const navigate = useNavigate()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0)
    const totalPrice = itemsPrice

    const submit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if (!token) return navigate('/login')
        try {
            const res = await API.post('/orders', { orderItems: cart, shippingAddress: { address, city, postalCode, country }, paymentMethod: 'Mock', itemsPrice, shippingPrice: 0, taxPrice: 0, totalPrice }, { headers: { Authorization: `Bearer ${token}` } })
            localStorage.removeItem('cart')
            navigate('/')
        } catch (err) {
            alert(err.response?.data?.message || 'Order failed')
        }
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded shadow">
                <h2 className="text-2xl mb-4">Shipping</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm">Address</label>
                        <input className="w-full border rounded px-3 py-2" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm">City</label>
                        <input className="w-full border rounded px-3 py-2" value={city} onChange={e => setCity(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm">Postal Code</label>
                        <input className="w-full border rounded px-3 py-2" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm">Country</label>
                        <input className="w-full border rounded px-3 py-2" value={country} onChange={e => setCountry(e.target.value)} />
                    </div>
                    <button className="w-full bg-indigo-600 text-white py-2 rounded" type="submit">Place Order</button>
                </form>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">Order Summary</h3>
                <div className="mt-2">Items: ${itemsPrice.toFixed(2)}</div>
                <div className="mt-2">Total: <span className="font-bold text-indigo-600">${totalPrice.toFixed(2)}</span></div>
            </div>
        </div>
    )
}
