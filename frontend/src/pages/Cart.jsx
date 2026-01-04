import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {
    const [cart, setCart] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
    }, [])
    const updateQty = (i, qty) => {
        const copy = [...cart]
        copy[i].qty = qty
        setCart(copy)
        localStorage.setItem('cart', JSON.stringify(copy))
    }
    const removeItem = (i) => {
        const copy = [...cart]
        copy.splice(i, 1)
        setCart(copy)
        localStorage.setItem('cart', JSON.stringify(copy))
    }
    const checkout = () => navigate('/checkout')
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <h2 className="text-2xl mb-4">Your Cart</h2>
                {cart.length === 0 ? <div>Cart empty. <Link to="/">Go shopping</Link></div> : (
                    <div className="space-y-4">
                        {cart.map((c, i) => (
                            <div key={i} className="flex items-center bg-white p-4 rounded shadow-sm">
                                <img src={c.image} alt="" className="w-20 h-20 object-cover rounded mr-4" />
                                <div className="flex-1">
                                    <div className="font-semibold">{c.name}</div>
                                    <div className="text-sm text-gray-600">${c.price}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input className="w-16 border rounded px-2 py-1" type="number" value={c.qty} min={1} onChange={e => updateQty(i, Number(e.target.value))} />
                                    <button className="text-red-500" onClick={() => removeItem(i)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-white p-4 rounded shadow">
                <div className="text-lg">Subtotal ({cart.length} items): <span className="font-bold text-indigo-600">${total.toFixed(2)}</span></div>
                <button onClick={checkout} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded">Proceed to Checkout</button>
            </div>
        </div>
    )
}
