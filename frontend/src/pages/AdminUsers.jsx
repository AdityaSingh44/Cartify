import React, { useEffect, useState } from 'react'
import API from '../api'

export default function AdminUsers() {
    const [users, setUsers] = useState([])
    useEffect(() => { API.get('/users').then(res => setUsers(res.data)).catch(console.error) }, [])
    const del = async (id) => {
        if (!confirm('Delete user?')) return
        try { await API.delete(`/users/${id}`); setUsers(users.filter(u => u._id !== id)) } catch (err) { alert('Delete failed') }
    }
    return (
        <div>
            <h2 className="text-2xl mb-4">Admin - Users</h2>
            <div className="space-y-2">
                {users.map(u => (
                    <div key={u._id} className="bg-white p-3 rounded shadow flex items-center justify-between">
                        <div>
                            <div className="font-semibold">{u.name}</div>
                            <div className="text-sm text-gray-600">{u.email}</div>
                        </div>
                        <div className="space-x-2">
                            <button className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                            <button onClick={() => del(u._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
