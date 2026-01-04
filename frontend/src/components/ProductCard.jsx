import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
    const discount = product.discountPercentage || 0
    const discountedPrice = (product.price || 0) * (1 - discount / 100)
    return (
        <div className="bg-white rounded shadow-sm overflow-hidden hover:shadow-md transition">
            <Link to={`/product/${product._id}`}>
                <img src={product.images && product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
                <Link to={`/product/${product._id}`} className="font-semibold text-lg text-gray-800">{product.name}</Link>
                <div className="text-sm text-gray-500">{product.category}</div>
                <div className="mt-2">
                    {discount > 0 ? (
                        <div>
                            <span className="text-indigo-600 font-bold mr-2">${discountedPrice.toFixed(2)}</span>
                            <span className="line-through text-gray-400">${product.price}</span>
                            <span className="ml-2 text-sm text-green-600">-{discount}%</span>
                        </div>
                    ) : (
                        <div className="text-indigo-600 font-bold">${product.price}</div>
                    )}
                </div>
            </div>
        </div>
    )
}
