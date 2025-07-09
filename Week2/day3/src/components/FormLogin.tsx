// src/components/RegisterForm.tsx
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline';


interface LoginFormValues {
    username: string;
    password: string;
}

const schema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .min(5, 'Min 5 characters')
        .test('is-email-or-phone', 'Must be a valid email or phone', value =>
            !!value &&
            (/^\d{10,15}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        ),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Min 8 characters')
        // .matches(/[a-zA-Z]/, 'At least 1 letter')
        .matches(/^\S*$/, 'No spaces allowed'),
});

export default function FormLogin() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormValues>({
        resolver: yupResolver(schema),
        mode: 'onTouched',
    });

    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        setApiError(null);
        setLoading(true);
        try {
            const res = await fetch('https://server.aptech.io/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || 'Login failed');
            alert('Login successful!');
        } catch (err: any) {
            setApiError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="hidden md:flex w-1/3 bg-gradient-to-b from-blue-500 to-blue-600 text-white flex-col items-center justify-center p-10">
                <div className=" items-center flex-row justify-center flex gap-3">
                    <img
                        src="https://videos.openai.com/vg-assets/assets%2Ftask_01jzmn7vfkek5rgbnvab19bz6f%2F1751966318_img_0.webp?st=2025-07-09T01%3A52%3A45Z&se=2025-07-15T02%3A52%3A45Z&sks=b&skt=2025-07-09T01%3A52%3A45Z&ske=2025-07-15T02%3A52%3A45Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=iPbe2D3mnwVqGXx7ei1vCZyB3n2J3ANebVJb2neAhpk%3D&az=oaivgprodscus"
                        alt="illustration"
                        className="h-10 w-10 rounded-full"
                    />
                    <h1 className="text-2xl font-semibold mb-4">
                        Lottery Display
                    </h1>

                </div>

                <p className="text-xl leading-relaxed">
                    A few clicks away from creating your
                    Lottery Display
                </p>

                <img
                    src="https://videos.openai.com/vg-assets/assets%2Ftask_01jzmn7vfkek5rgbnvab19bz6f%2F1751966318_img_0.webp?st=2025-07-09T01%3A52%3A45Z&se=2025-07-15T02%3A52%3A45Z&sks=b&skt=2025-07-09T01%3A52%3A45Z&ske=2025-07-15T02%3A52%3A45Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=iPbe2D3mnwVqGXx7ei1vCZyB3n2J3ANebVJb2neAhpk%3D&az=oaivgprodscus"
                    alt="illustration"
                    className="mt-10 w-72"
                />
            </aside>
            <main className="flex-1 bg-blue-200 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-md p-8 bg-white rounded shadow"
                >
                    <h2 className="text-2xl font-semibold mb-2">Login</h2>
                    <p className="text-sm text-gray-500 mb-8">
                        Enter your credentials to access your account
                    </p>
                    <div className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Email or Phone"
                                className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('username')}
                                autoComplete="username"
                            />
                            {errors.username && (
                                <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type={showPwd ? 'text' : 'password'}
                                placeholder="Password"
                                className="w-full px-4 py-2 pr-10 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('password')}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPwd(!showPwd)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                                tabIndex={-1}
                            >
                                {showPwd ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                            )}
                        </div>
                        {apiError && (
                            <p className="text-sm text-red-600 mt-2 text-center">{apiError}</p>
                        )}
                        <button
                            type="submit"
                            disabled={!isValid || loading}
                            className={`mt-4 w-full py-3 rounded-md text-white font-medium transition ${!isValid || loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

