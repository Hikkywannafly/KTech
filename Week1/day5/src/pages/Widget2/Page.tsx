import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

const countries = ['Vietnam', 'United States', 'Japan', 'France', 'Germany'];
const hobbiesList = ['Reading', 'Traveling', 'Gaming'];

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (pw: string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pw);
const isValidPhone = (phone: string) => /^\d{10,}$/.test(phone);
const isImageFile = (file: File | null) => file && /\.(jpg|jpeg|png)$/i.test(file.name);
const getAge = (dob: string) => {
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const Widget2: React.FC = () => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        dob: '',
        country: '',
        hobbies: [] as string[],
        profilePic: null as File | null,
        bio: '',
    });
    const [errors, setErrors] = useState<{ [k: string]: string }>({});
    const [bioLeft, setBioLeft] = useState(300);
    const [picName, setPicName] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setForm((prev) => ({
                ...prev,
                hobbies: checked
                    ? [...prev.hobbies, value]
                    : prev.hobbies.filter((h) => h !== value),
            }));
        } else if (type === 'file') {
            const file = (e.target as HTMLInputElement).files?.[0] || null;
            setForm((prev) => ({ ...prev, profilePic: file }));
            setPicName(file ? file.name : '');
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
            if (name === 'bio') setBioLeft(300 - value.length);
        }
    };

    const validate = () => {
        const newErrors: { [k: string]: string } = {};
        if (form.fullName.trim().length < 3) newErrors.fullName = 'Full Name must be at least 3 characters.';
        if (!isValidEmail(form.email)) newErrors.email = 'Email must be a valid email format.';
        if (!isValidPassword(form.password)) newErrors.password = 'Password must be at least 8 characters and contain letters and numbers.';
        if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'Passwords do not match.';
        if (!isValidPhone(form.phone)) newErrors.phone = 'Phone Number must be at least 10 digits.';
        if (!form.gender) newErrors.gender = 'Please select a gender.';
        if (!form.dob || getAge(form.dob) < 18) newErrors.dob = 'You must be at least 18 years old.';
        if (!form.country) newErrors.country = 'Please select a country.';
        if (form.hobbies.length === 0) newErrors.hobbies = 'Please select at least one hobby.';
        if (!form.profilePic || !isImageFile(form.profilePic)) newErrors.profilePic = 'Profile Picture must be a .jpg, .jpeg, or .png image.';
        if (form.bio.length > 300) newErrors.bio = 'Bio must be at most 300 characters.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validate()) {
            alert('Registration successful!');
        }
    };

    return (
        <form className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 mx-auto mt-10 space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-2 text-center">User Registration</h2>
            <div>
                <label className="block font-medium mb-1" htmlFor="fullName">Full Name</label>
                <Input name="fullName" id="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
                <label className="block font-medium mb-1" htmlFor="email">Email</label>
                <Input name="email" id="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
                <label className="block font-medium mb-1" htmlFor="password">Password</label>
                <Input name="password" id="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
                <label className="block font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
                <Input name="confirmPassword" id="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            <div>
                <label className="block font-medium mb-1" htmlFor="phone">Phone Number</label>
                <Input name="phone" id="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Enter phone number" />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div>
                <label className="block font-medium mb-1">Gender</label>
                <div className="flex gap-6">
                    {['Male', 'Female', 'Other'].map((g) => (
                        <label key={g} className="flex items-center gap-2">
                            <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} className="accent-blue-500" />
                            <span>{g}</span>
                        </label>
                    ))}
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
            <div>
                <label className="block font-medium mb-1" htmlFor="dob">Date of Birth</label>
                <Input name="dob" id="dob" type="date" value={form.dob} onChange={handleChange} />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
            </div>
            <div>
                <label className="block font-medium mb-1" htmlFor="country">Country</label>
                <select name="country" id="country" value={form.country} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Select a country</option>
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>
            <div>
                <label className="block font-medium mb-1">Hobbies</label>
                <div className="flex gap-6">
                    {hobbiesList.map((hobby) => (
                        <label key={hobby} className="flex items-center gap-2">
                            <input type="checkbox" name="hobbies" value={hobby} checked={form.hobbies.includes(hobby)} onChange={handleChange} className="accent-green-500" />
                            <span>{hobby}</span>
                        </label>
                    ))}
                </div>
                {errors.hobbies && <p className="text-red-500 text-sm mt-1">{errors.hobbies}</p>}
            </div>
            <div>
                <label className="block font-medium mb-1" htmlFor="profilePic">Profile Picture</label>
                <input name="profilePic" id="profilePic" type="file" accept=".jpg,.jpeg,.png" onChange={handleChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                {picName && <span className="text-xs text-gray-600 ml-2">{picName}</span>}
                {errors.profilePic && <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>}
            </div>
            <div>
                <label className="block font-medium mb-1" htmlFor="bio">Bio <span className="text-xs text-gray-400">(optional)</span></label>
                <textarea name="bio" id="bio" maxLength={300} value={form.bio} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" rows={3} />
                <div className="flex justify-between items-center">
                    {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
                    <span className="text-xs text-gray-400 ml-auto">{bioLeft} characters left</span>
                </div>
            </div>
            <Button type="submit" className="w-full mt-4 text-lg">Register</Button>
        </form>
    );
};

export default Widget2; 