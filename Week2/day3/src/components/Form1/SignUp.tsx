// SignUpForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
    name: string;
    email: string;
    password: string;
};

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log('Submitted:', data);
    };

    const emailValue = watch('email');

    return (
        <div className="">
            <img
                src="https://videos.openai.com/vg-assets/assets%2Ftask_01jzmn7vfkek5rgbnvab19bz6f%2F1751966318_img_0.webp?st=2025-07-09T01%3A52%3A45Z&se=2025-07-15T02%3A52%3A45Z&sks=b&skt=2025-07-09T01%3A52%3A45Z&ske=2025-07-15T02%3A52%3A45Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=iPbe2D3mnwVqGXx7ei1vCZyB3n2J3ANebVJb2neAhpk%3D&az=oaivgprodscus"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="relative z-10 p-6 space-y-4">
                <h2 className="text-2xl font-bold">Sign up</h2>

                {emailValue && (
                    <p className="text-sm text-white">
                        Looks like you don't have an account.
                        <br />
                        Let's create a new account for <span className="font-semibold">{emailValue}</span>.
                    </p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register('name')}
                            className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none"
                        />
                        <p className="text-red-400 text-sm">{errors.name?.message}</p>
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email')}
                            className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none"
                        />
                        <p className="text-red-400 text-sm">{errors.email?.message}</p>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            {...register('password')}
                            className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-2 text-sm text-gray-600"
                        >
                            {showPassword ? 'Hide' : 'View'}
                        </button>
                        <p className="text-red-400 text-sm">{errors.password?.message}</p>
                    </div>

                    <p className="text-xs text-gray-200">
                        By selecting Agree and continue below, I agree to{' '}
                        <span className="underline cursor-pointer">Terms of Service</span> and{' '}
                        <span className="underline cursor-pointer">Privacy Policy</span>.
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
                    >
                        Agree and continue
                    </button>
                </form>
            </div>

        </div>
    );
}
