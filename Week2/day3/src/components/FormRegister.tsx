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


interface FormValues {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    newsletter: boolean;
    terms: boolean;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
    firstName: yup
        .string()
        .required('First name is required')
        .min(2, 'Must be at least 2 characters'),
    lastName: yup
        .string()
        .required('Last name is required')
        .min(2, 'Must be at least 2 characters'),
    phone: yup
        .string()
        .required('Phone is required')
        .matches(/^\d{10,15}$/, 'Phone must be 10‑15 digits'),
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Min 8 characters')
        .matches(/[a-z]/, 'Need 1 lowercase')
        .matches(/[A-Z]/, 'Need 1 uppercase')
        .matches(/\d/, 'Need 1 number')
        .matches(/^\S*$/, 'No spaces allowed'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    newsletter: yup.boolean().default(false),
    terms: yup
        .boolean()
        .oneOf([true], 'You must accept Terms')
        .required('You must accept Terms'),
});

export default function FormRegistration() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            newsletter: false,
            terms: false,
        },
    });

    const [showPwd, setShowPwd] = useState(false);
    const [showCfm, setShowCfm] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);

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

            {/* Form panel */}
            <main className="flex-1 bg-blue-200 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg space-y-6 text-gray-800"
                >
                    <h2 className="text-2xl font-semibold mb-2">Register</h2>
                    <p className="text-sm text-gray-500 mb-8">
                        Manage all your lottery efficiently
                    </p>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('firstName')}
                            />
                            {errors.firstName && (
                                <p className="error">{errors.firstName.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('lastName')}
                            />
                            {errors.lastName && (
                                <p className="error">{errors.lastName.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('phone')}
                            />
                            {errors.phone && (
                                <p className="error">{errors.phone.message}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="error">{errors.email.message}</p>
                            )}
                        </div>
                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPwd ? 'text' : 'password'}
                                placeholder="Password"
                                className="input pr-10 w-full px-4 py-2 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"

                                {...register('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPwd(!showPwd)}
                                className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                            >
                                {showPwd ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                            {errors.password && (
                                <p className="error">{errors.password.message}</p>
                            )}
                        </div>
       
                        <div className="relative">
                            <input
                                type={showCfm ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                className="w-full px-4 py-2 pr-10 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('confirmPassword')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCfm(!showCfm)}
                                className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                            >
                                {showCfm ? (
                                    <EyeSlashIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>


                    <div className="space-y-2 mt-6">
                        <label className="flex items-start gap-2 text-sm">
                            <input
                                type="checkbox"
                                className="h-4 w-4 accent-blue-600 mt-0.5"
                                {...register('newsletter')}
                            />
                            Yes, I want to receive Lottery Display emails.
                        </label>

                        <label className="flex items-start gap-2 text-sm">
                            <input
                                type="checkbox"
                                className="h-4 w-4 accent-blue-600 mt-0.5"
                                {...register('terms')}
                            />
                            I agree to all the&nbsp;
                            <a
                                href="#"
                                className="text-blue-600 underline hover:no-underline"
                            >
                                Terms, Privacy Policy and Fees
                            </a>
                        </label>
                        {errors.terms && (
                            <p className="error">{errors.terms.message}</p>
                        )}
                    </div>


                    <button
                        type="submit"
                        disabled={!isValid || !watch('terms')}
                        className={`mt-6 w-full py-3 rounded-md text-white font-medium transition
              ${!isValid || !watch('terms')
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        Create Account
                    </button>


                    <p className="text-center text-sm mt-4">
                        Already have an account?{' '}
                        <a
                            href="/widget2"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </form>
            </main>
        </div>
    );
}

