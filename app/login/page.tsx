'use client';

import Link from 'next/link';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data?.error || 'Invalid credentials');
                toast.error(error);
                return;
            }

            router.push('/');
        } catch (err) {
            console.error("Login failed:", err);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full text-black max-w-md border border-green-500 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

                {error && <p className="text-red-500 text-center mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block font-medium mb-1">Email address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus-visible:border-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block font-medium mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus-visible:border-green-500"
                            required
                        />
                        <div className="text-right text-sm mt-1">
                            <Link href="/forgot-password" className="text-blue-600 hover:underline">
                                forgot password ?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
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
                    Don’t have an account?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
