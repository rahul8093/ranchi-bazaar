// app/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaApple } from 'react-icons/fa';

export default function SignupPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        agree: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!form.agree) {
            alert('You must agree to the terms & policy.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.errors?.[0]?.message || 'Failed to register');
            } else {
                setSuccess(true);
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white">
            <div className="w-full text-black max-w-md border border-green-500 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Get Started Now</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-600 text-sm mb-4">Account created! Please check your email to verify.</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-medium mb-1">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus-visible:border-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block font-medium mb-1">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus-visible:border-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-medium mb-1">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus-visible:border-green-500"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            id="agree"
                            name="agree"
                            checked={form.agree}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <label htmlFor="agree" className="text-xs">
                            I agree to the <span className="font-semibold">terms & policy</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="my-6 flex items-center justify-center gap-2 text-gray-500">
                    <span className="h-px bg-gray-300 w-16" />
                    or
                    <span className="h-px bg-gray-300 w-16" />
                </div>

                <div className="flex flex-col gap-3">
                    <button className="flex items-center justify-center border rounded py-2 gap-2 hover:shadow">
                        <FaGoogle className="text-red-500" />
                        Sign in with Google
                    </button>
                    <button className="flex items-center justify-center border rounded py-2 gap-2 hover:shadow">
                        <FaApple className="text-black" />
                        Sign in with Apple
                    </button>
                </div>

                <p className="text-center text-sm mt-6">
                    Have an account?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
