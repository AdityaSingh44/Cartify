import React from 'react'

export default function AdminDashboard() {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded shadow">Total Products: --</div>
                <div className="bg-white p-4 rounded shadow">Total Orders: --</div>
                <div className="bg-white p-4 rounded shadow">Total Users: --</div>
            </div>
        </div>
    )
}
