import React, { useEffect, useState } from 'react'
import API from '../api'

export default function AdminProducts() {
    const [data, setData] = useState({ products: [] })
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchList()
    }, [])
    const fetchList = async () => {
        setLoading(true)
        try {
            const res = await API.get('/products/admin/list')
            setData(res.data)
        } catch (err) { console.error(err) }
        setLoading(false)
    }
    const handleDelete = async (id) => {
        if (!confirm('Delete product?')) return
        try {
            await API.delete(`/products/${id}`)
            fetchList()
        } catch (err) { alert(err.response?.data?.message || 'Delete failed') }
    }
    const handleCreate = async () => {
        // navigate to new product page
        window.location.href = '/admin/products/new'
    }
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl">Admin - Products</h2>
                <button onClick={handleCreate} className="bg-indigo-600 text-white px-3 py-1 rounded">Create Product</button>
            </div>
            {loading ? <div>Loading...</div> : (
                <div className="space-y-4">
                    {data.products.map(p => (
                        <div key={p._id} className="bg-white p-4 rounded shadow flex items-center justify-between">
                            <div>
                                <div className="font-semibold">{p.name}</div>
                                <div className="text-sm text-gray-600">{p.category} • ${p.price}</div>
                            </div>
                            <div className="space-x-2">
                                <button onClick={() => window.location.href = `/admin/products/${p._id}`} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                                <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
