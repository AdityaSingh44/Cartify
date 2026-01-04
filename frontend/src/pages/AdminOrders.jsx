import React, { useEffect, useState } from 'react'
import API from '../api'

export default function AdminOrders() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        API.get('/orders').then(res => setOrders(res.data)).catch(console.error)
    }, [])
    const markDelivered = async (id) => {
        try {
            await API.put(`/orders/${id}/deliver`)
            setOrders(orders.map(o => o._id === id ? { ...o, isDelivered: true } : o))
        } catch (err) { alert('Failed') }
    }
    return (
        <div>
            <h2 className="text-2xl mb-4">Admin - Orders</h2>
            <div className="space-y-4">
                {orders.map(o => (
                    <div key={o._id} className="bg-white p-4 rounded shadow">
                        <div className="flex justify-between">
                            <div>{o._id}</div>
                            <div>{o.user?.name}</div>
                        </div>
                        <div className="mt-2">Total: ${o.totalPrice}</div>
                        <div className="text-sm mt-1">Status: {o.isDelivered ? 'Delivered' : 'Pending'}</div>
                        {!o.isDelivered && <button onClick={() => markDelivered(o._id)} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">Mark Delivered</button>}
                    </div>
                ))}
            </div>
        </div>
    )
}
