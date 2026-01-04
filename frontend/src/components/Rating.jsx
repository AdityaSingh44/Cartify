import React from 'react'

export default function Rating({ value = 0, text }) {
    return (
        <div className="flex items-center">
            <div className="text-yellow-400 mr-2">{'★'.repeat(Math.round(value))}{'☆'.repeat(5 - Math.round(value))}</div>
            {text && <div className="text-sm text-gray-600">{text}</div>}
        </div>
    )
}
