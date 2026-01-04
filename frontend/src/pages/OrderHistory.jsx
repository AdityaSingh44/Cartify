import React, { useEffect, useState } from 'react'
import API from '../api'

export default function OrderHistory() {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        API.get('/orders').then(res => setOrders(res.data)).catch(console.error)
    }, [])
    return (
        <div>
            <h2 className="text-2xl mb-4">Your Orders</h2>
            <div className="space-y-4">
                {orders.map(o => (
                    <div key={o._id} className="bg-white p-4 rounded shadow">
                        <div className="flex justify-between">
                            <div>{o._id}</div>
                            <div>{new Date(o.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="mt-2">Total: ${o.totalPrice}</div>
                        <div className="text-sm mt-1">Status: {o.isDelivered ? 'Delivered' : 'Pending'}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
