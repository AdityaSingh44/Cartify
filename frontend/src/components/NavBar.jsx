import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-indigo-600">Cartify</Link>
                <div className="space-x-4 flex items-center">
                    <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
                    <Link to="/cart" className="text-gray-700 hover:text-indigo-600">Cart</Link>
                    {user ? (
                        <>
                            <span className="text-gray-700">Hello, {user.name}</span>
                            <Link to="/orders" className="text-gray-700 hover:text-indigo-600">Orders</Link>
                            <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/' }} className="text-gray-700 hover:text-indigo-600">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
                    )}
                    {user?.isAdmin && (
                        <>
                            <Link to="/admin/products" className="text-gray-700 hover:text-indigo-600">Admin Products</Link>
                            <Link to="/admin/orders" className="text-gray-700 hover:text-indigo-600">Admin Orders</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
