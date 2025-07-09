// SignUpForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {

    password: string;
};

const schema = yup.object().shape({
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log('Submitted:', data);
    };


    return (
        <div className="">

            <img
                src="https://videos.openai.com/vg-assets/assets%2Ftask_01jzmn7vfkek5rgbnvab19bz6f%2F1751966318_img_0.webp?st=2025-07-09T01%3A52%3A45Z&se=2025-07-15T02%3A52%3A45Z&sks=b&skt=2025-07-09T01%3A52%3A45Z&ske=2025-07-15T02%3A52%3A45Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=iPbe2D3mnwVqGXx7ei1vCZyB3n2J3ANebVJb2neAhpk%3D&az=oaivgprodscus"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="relative z-10 p-6 space-y-4">
                <h2 className="text-2xl font-bold">Login</h2>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="flex items-center justify-center mb-4 p-4 gap-7 bg-black/40 rounded-lg shadow-lg">
                        <img
                            src="https://videos.openai.com/vg-assets/assets%2Ftask_01jzmn7vfkek5rgbnvab19bz6f%2F1751966318_img_0.webp?st=2025-07-09T01%3A52%3A45Z&se=2025-07-15T02%3A52%3A45Z&sks=b&skt=2025-07-09T01%3A52%3A45Z&ske=2025-07-15T02%3A52%3A45Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=3d249c53-07fa-4ba4-9b65-0bf8eb4ea46a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=iPbe2D3mnwVqGXx7ei1vCZyB3n2J3ANebVJb2neAhpk%3D&az=oaivgprodscus"
                            alt="Background"
                            className="w-20 h-20 rounded-full"
                        />
                        <div className="">
                            <h1>
                                The Rock bóe
                            </h1>
                            <p className="text-sm text-gray-200">
                                therockbéo@gmail.com
                            </p>
                        </div>
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
                        Continue
                    </button>
                </form>
            </div>

        </div>
    );
}
