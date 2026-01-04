import React, { useEffect, useState } from 'react'
import API from '../api'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

export default function Home() {
    const [products, setProducts] = useState([])
    const [keyword, setKeyword] = useState('')
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    useEffect(() => {
        API.get('/products').then(res => setProducts(res.data)).catch(console.error)
        API.get('/products/categories/list').then(res => setCategories(res.data)).catch(console.error)
    }, [])
    const filtered = products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()) && (category ? p.category === category : true))
    return (
        <div>
            <div className="bg-indigo-600 text-white rounded p-8 mb-6">
                <div className="container mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Welcome to Cartify</h1>
                        <p className="mt-2 text-indigo-200">Shop top products at great prices.</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop" alt="hero" className="rounded shadow-lg" />
                </div>
            </div>
            <div className="flex gap-6">
                <aside className="w-64 bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">Categories</h3>
                    <ul>
                        <li className={`mb-1 ${category === '' ? 'font-bold' : ''}`}><button onClick={() => setCategory('')}>All</button></li>
                        {categories.map(c => <li key={c} className={`mb-1 ${category === c ? 'font-bold' : ''}`}><button onClick={() => setCategory(c)}>{c}</button></li>)}
                    </ul>
                </aside>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Products</h2>
                        <div className="flex space-x-2">
                            <input placeholder="Search products" value={keyword} onChange={e => setKeyword(e.target.value)} className="border rounded px-3 py-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map(p => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
