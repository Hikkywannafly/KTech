import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useUserContext } from '../context/UserProvider';

export interface FormData {
    name: string;
    email: string;
    age?: number | null;
}

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Minimum 2 characters').matches(/^[A-Za-z\s]+$/, 'Name must only contain letters'),
    email: yup.string().required('Email is required').email('Invalid email'),
    age: yup
        .number()
        .typeError('Age must be a number')
        .positive('Age must be positive')
        .nullable()
        .transform((value, originalValue) => originalValue === '' ? null : value),
});

function UserForm() {
    const { addUser } = useUserContext();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema) as any,
    });

    const onSubmit = (data: FormData) => {
        addUser({
            name: data.name,
            email: data.email,
            age: data.age ? Number(data.age) : undefined,
        });
        reset();
        console.log('User added:', data);
        toast.success('User added!');
    };

    console.log("Form errors:", errors);

    return (
        <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br py-8">
            <form
                onSubmit={handleSubmit(onSubmit as any)}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-blue-100"
            >
                <h1 className="text-xl font-bold text-blue-700 mb-6 text-center tracking-tight">Create User</h1>
                <div className="mb-5">
                    <label className="block font-semibold text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        className={`border-2 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.name ? 'border-red-400' : 'border-blue-200'}`}
                        placeholder="Enter name"
                    />
                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name.message}</div>}
                </div>
                <div className="mb-5">
                    <label className="block font-semibold text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className={`border-2 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.email ? 'border-red-400' : 'border-blue-200'}`}
                        placeholder="Enter email"
                    />
                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email.message}</div>}
                </div>
                <div className="mb-7">
                    <label className="block font-semibold text-gray-700 mb-1">Age</label>
                    <input
                        type="number"
                        {...register('age')}
                        className={`border-2 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.age ? 'border-red-400' : 'border-blue-200'}`}
                        min="1"
                        placeholder="Enter age (optional)"
                    />
                    {errors.age && <div className="text-red-500 text-xs mt-1">{errors.age.message}</div>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-200 text-lg tracking-wide"
                >
                    Add User
                </button>
                <ToastContainer />
            </form>
        </div>
    );
}

export default UserForm;