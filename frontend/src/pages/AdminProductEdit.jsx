import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api'

export default function AdminProductEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isNew = id === 'new'
    const [product, setProduct] = useState({ name: '', price: 0, description: '', longDescription: '', images: [''], category: '', countInStock: 0, discountPercentage: 0 })

    useEffect(() => { if (!isNew) API.get(`/products/${id}`).then(res => setProduct(res.data)).catch(console.error) }, [id])

    const submit = async (e) => {
        e.preventDefault()
        try {
            if (isNew) {
                await API.post('/products', product)
            } else {
                await API.put(`/products/${id}`, product)
            }
            navigate('/admin/products')
        } catch (err) { alert(err.response?.data?.message || 'Save failed') }
    }
    return (
        <div className="max-w-2xl bg-white p-6 rounded shadow">
            <h2 className="text-2xl mb-4">{isNew ? 'Create' : 'Edit'} Product</h2>
            <form onSubmit={submit} className="space-y-3">
                <div>
                    <label className="block text-sm">Name</label>
                    <input className="w-full border rounded px-3 py-2" value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm">Price</label>
                    <input type="number" className="w-full border rounded px-3 py-2" value={product.price} onChange={e => setProduct({ ...product, price: Number(e.target.value) })} />
                </div>
                <div>
                    <label className="block text-sm">Discount %</label>
                    <input type="number" className="w-full border rounded px-3 py-2" value={product.discountPercentage} onChange={e => setProduct({ ...product, discountPercentage: Number(e.target.value) })} />
                </div>
                <div>
                    <label className="block text-sm">Short Description</label>
                    <input className="w-full border rounded px-3 py-2" value={product.description} onChange={e => setProduct({ ...product, description: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm">Long Description</label>
                    <textarea className="w-full border rounded px-3 py-2" value={product.longDescription} onChange={e => setProduct({ ...product, longDescription: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm">Image URL</label>
                    <input className="w-full border rounded px-3 py-2" value={product.images[0]} onChange={e => setProduct({ ...product, images: [e.target.value] })} />
                </div>
                <div>
                    <label className="block text-sm">Category</label>
                    <input className="w-full border rounded px-3 py-2" value={product.category} onChange={e => setProduct({ ...product, category: e.target.value })} />
                </div>
                <div>
                    <label className="block text-sm">Count In Stock</label>
                    <input type="number" className="w-full border rounded px-3 py-2" value={product.countInStock} onChange={e => setProduct({ ...product, countInStock: Number(e.target.value) })} />
                </div>
                <div className="flex space-x-2">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded" type="submit">Save</button>
                    <button type="button" onClick={() => navigate('/admin/products')} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
                </div>
            </form>
        </div>
    )
}
