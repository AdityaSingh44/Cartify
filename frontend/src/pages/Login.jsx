import React, { useState } from 'react'
import API from '../api'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            if (res.data.user.isAdmin) navigate('/admin/products')
            else navigate('/')
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed')
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm">Email</label>
                    <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm">Password</label>
                    <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded" type="submit">Login</button>
            </form>
            <div className="mt-4 text-sm">New? <Link to="/register" className="text-indigo-600">Register</Link></div>
        </div>
    )
}
