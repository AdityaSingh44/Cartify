import React, { useState } from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('/auth/register', { name, email, password })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            navigate('/')
        } catch (err) {
            alert(err.response?.data?.message || 'Register failed')
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl mb-4">Register</h2>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm">Name</label>
                    <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm">Email</label>
                    <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm">Password</label>
                    <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded" type="submit">Register</button>
            </form>
        </div>
    )
}
