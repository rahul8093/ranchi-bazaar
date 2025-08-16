'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailClient() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (email && token) {
            setStatus('loading');

            fetch('/api/auth/confirm-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.errors?.length > 0) {
                        setStatus('error');
                        setErrorMessage(data.errors[0].message);
                    } else {
                        setStatus('success');
                    }
                })
                .catch(err => {
                    console.error(err);
                    setStatus('error');
                    setErrorMessage('Something went wrong while confirming your account.');
                });
        }
    }, [email, token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow text-center">
                {status === 'loading' && <p className="text-gray-700">Verifying your email...</p>}

                {status === 'success' && (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Email Verified ✅</h1>
                        <p className="text-gray-700 mb-6">Your account has been successfully confirmed.</p>
                        <Link
                            href="/login"
                            className="inline-block bg-green-600 text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition"
                        >
                            Go to Login
                        </Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Failed ❌</h1>
                        <p className="text-gray-700 mb-6">{errorMessage}</p>
                        <Link
                            href="/register"
                            className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition"
                        >
                            Register Again
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
