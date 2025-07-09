import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { differenceInYears, parseISO } from 'date-fns';
import type { InferType } from 'yup';

interface FormInputs {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    gender: 'Male' | 'Female' | 'Other';
    dateOfBirth: string;
    country: string;
    hobbies: string[];
    profilePicture: FileList;
    bio?: string;
}

const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const validationSchema = yup.object({
    fullName: yup
        .string()
        .required('Full Name is required.')
        .min(3, 'Full Name must be at least 3 characters.'),
    email: yup
        .string()
        .required('Email is required.')
        .email('Invalid email address.'),
    password: yup
        .string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters.')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, 'Password must contain letters and numbers.'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match.')
        .required('Confirm Password is required.'),
    phoneNumber: yup
        .string()
        .required('Phone number is required.')
        .matches(/^\d{10,}$/, 'Phone number must be at least 10 digits.'),
    gender: yup
        .string()
        .oneOf(['Male', 'Female', 'Other'], 'Please select a gender.')
        .required('Please select a gender.'),
    dateOfBirth: yup
        .string()
        .required('Date of birth is required.')
        .test('age', 'You must be at least 18 years old.', value => {
            if (!value) return false;
            const age = differenceInYears(new Date(), parseISO(value));
            return age >= 18;
        }),
    country: yup.string().required('Please select a country.'),
    hobbies: yup.array().of(yup.string().required()).min(1, 'Select at least one hobby.').required(),
    profilePicture: yup
        .mixed<FileList>()
        .required('Profile picture is required.')
        .test('fileType', 'Unsupported file type.', value => {
            const files = value as FileList;
            if (!files || files.length === 0) return false;
            return SUPPORTED_IMAGE_TYPES.includes(files[0].type);
        }),
    bio: yup.string().max(300, 'Bio must be at most 300 characters.').required().default(undefined),
});

type FormSchema = InferType<typeof validationSchema>;

const countries = [
    'Vietnam',
    'United States',
    'United Kingdom',
    'Japan',
    'Germany',
    'Canada',
];

export default function UserRegistrationForm() {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        reset,
    } = useForm<FormSchema>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur',
    });

    const [showPwd, setShowPwd] = useState(false);
    const [showCfm, setShowCfm] = useState(false);

    const onSubmit: SubmitHandler<FormSchema> = data => {
        const { profilePicture, ...rest } = data;
        console.log({ ...rest, profilePicture: profilePicture[0] });
        alert('Registration successful!');
        reset();
    };

    const bioValue = watch('bio') || '';

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">User Registration</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

                <div>
                    <label htmlFor="fullName" className="block font-medium">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        className="input w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        {...register('fullName')}
                    />
                    {errors.fullName && (
                        <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                </div>


                <div>
                    <label htmlFor="email" className="block font-medium">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="input w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>


                <div className="relative">
                    <label htmlFor="password" className="block font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        type={showPwd ? 'text' : 'password'}
                        className="input w-full pr-10 px-4 py-2 rounded-md bg-white text-black focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        {...register('password')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPwd(prev => !prev)}
                        className="absolute right-2 top-9 text-sm text-blue-600 focus:outline-none"
                    >
                        {showPwd ? 'Hide' : 'View'}
                    </button>
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>


                <div className="relative">
                    <label htmlFor="confirmPassword" className="block font-medium">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type={showCfm ? 'text' : 'password'}
                        className="input w-full pr-10 px-4 py-2 rounded-md bg-white text-black focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        {...register('confirmPassword')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowCfm(prev => !prev)}
                        className="absolute right-2 top-9 text-sm text-blue-600 focus:outline-none"
                    >
                        {showCfm ? 'Hide' : 'View'}
                    </button>
                    {errors.confirmPassword && (
                        <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>


                <div>
                    <label htmlFor="phoneNumber" className="block font-medium">
                        Phone Number
                    </label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        className="input w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        {...register('phoneNumber')}
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-600 text-sm mt-1">{errors.phoneNumber.message}</p>
                    )}
                </div>


                <fieldset>
                    <legend className="font-medium">Gender</legend>
                    <div className="space-x-4 mt-1 flex items-center">
                        {['Male', 'Female', 'Other'].map(option => (
                            <label key={option} className="inline-flex items-center gap-1">
                                <input
                                    type="radio"
                                    value={option}
                                    {...register('gender')}
                                    className="form-radio"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    {errors.gender && (
                        <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
                    )}
                </fieldset>


                <div>
                    <label htmlFor="dateOfBirth" className="block font-medium">
                        Date of Birth
                    </label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        className="input w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        {...register('dateOfBirth')}
                    />
                    {errors.dateOfBirth && (
                        <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth.message}</p>
                    )}
                </div>


                <div>
                    <label htmlFor="country" className="block font-medium">
                        Country
                    </label>
                    <select
                        id="country"
                        className="input w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        defaultValue=""
                        {...register('country')}
                    >
                        <option value="" disabled>
                            Select Country
                        </option>
                        {countries.map(c => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    {errors.country && (
                        <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>
                    )}
                </div>

                <fieldset>
                    <legend className="font-medium">Hobbies</legend>
                    <div className="flex flex-col mt-1 space-y-1">
                        {['Reading', 'Traveling', 'Gaming'].map(hobby => (
                            <label key={hobby} className="inline-flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    value={hobby}
                                    {...register('hobbies')}
                                    className="form-checkbox"
                                />
                                {hobby}
                            </label>
                        ))}
                    </div>
                    {errors.hobbies && (
                        <p className="text-red-600 text-sm mt-1">{errors.hobbies.message}</p>
                    )}
                </fieldset>


                <div>
                    <label htmlFor="profilePicture" className="block font-medium">
                        Profile Picture
                    </label>
                    <input
                        id="profilePicture"
                        type="file"
                        accept="image/png, image/jpeg"
                        {...register('profilePicture')}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none focus:border-blue-500 file:bg-gray-100 file:border-0 file:py-1 file:px-3 file:mr-2 file:rounded file:text-sm file:font-semibold"
                    />
                    {errors.profilePicture && (
                        <p className="text-red-600 text-sm mt-1">{errors.profilePicture.message as string}</p>
                    )}
                </div>

                {/* Bio */}
                <div>
                    <label htmlFor="bio" className="block font-medium">
                        Bio <span className="text-gray-500">(optional)</span>
                    </label>
                    <textarea
                        id="bio"
                        rows={3}
                        maxLength={300}
                        className="input w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                        {...register('bio')}
                    />
                    <div className="flex justify-between items-center mt-1">
                        {errors.bio ? (
                            <p className="text-red-600 text-sm">{errors.bio.message}</p>
                        ) : (
                            <span></span>
                        )}
                        <p className="text-sm text-gray-600">
                            {bioValue.length}/300
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
