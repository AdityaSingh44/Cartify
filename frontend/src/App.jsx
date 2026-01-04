import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import NavBar from './components/NavBar'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'
import OrderHistory from './pages/OrderHistory'
import AdminUsers from './pages/AdminUsers'
import AdminProductEdit from './pages/AdminProductEdit'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
    return (
        <div>
            <NavBar />
            <main className="container mx-auto px-4 py-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                    <Route path="/admin/products/:id" element={<AdminProductEdit />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/orders" element={<OrderHistory />} />
                </Routes>
            </main>
        </div>
    )
}
