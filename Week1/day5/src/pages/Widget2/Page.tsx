import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import styles from './RegisterForm.module.css';

const countries = ['Vietnam', 'United States', 'Japan', 'France', 'Germany'];
const hobbiesList = ['Reading', 'Traveling', 'Gaming'];

const isValidEmail = (email: string) => /^[^\s@]+@[^\\s@]+\.[^\s@]+$/.test(email);
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
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>User Registration</h2>
            <div className={styles.row}>
                <label className={styles.label} htmlFor="fullName">Full Name</label>
                <Input name="fullName" id="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" className={styles.input} />
                {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
            </div>
            <div className={styles.row}>
                <label className={styles.label} htmlFor="email">Email</label>
                <Input name="email" id="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className={styles.input} />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
            <div className={styles.row}>
                <label className={styles.label} htmlFor="password">Password</label>
                <Input name="password" id="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" className={styles.input} />
                {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>
            <div className={styles.row}>
                <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                <Input name="confirmPassword" id="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" className={styles.input} />
                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
            </div>
            <div className={styles.row}>
                <label className={styles.label} htmlFor="phone">Phone Number</label>
                <Input name="phone" id="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Enter phone number" className={styles.input} />
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Gender</label>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {['Male', 'Female', 'Other'].map((g) => (
                        <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} />
                            <span>{g}</span>
                        </label>
                    ))}
                </div>
                {errors.gender && <p className={styles.error}>{errors.gender}</p>}
            </div>
            <div className={styles.row}>
                <label className={styles.label} htmlFor="dob">Date of Birth</label>
                <Input name="dob" id="dob" type="date" value={form.dob} onChange={handleChange} className={styles.input} />
                {errors.dob && <p className={styles.error}>{errors.dob}</p>}
            </div>
            <div className={styles.row}>
                <label className={styles.label} htmlFor="country">Country</label>
                <select name="country" id="country" value={form.country} onChange={handleChange} className={styles.select}>
                    <option value="">Select a country</option>
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.country && <p className={styles.error}>{errors.country}</p>}
            </div>
            <div className={styles.row}>
                <label className={styles.label}>Hobbies</label>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {hobbiesList.map((hobby) => (
                        <label key={hobby} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input type="checkbox" name="hobbies" value={hobby} checked={form.hobbies.includes(hobby)} onChange={handleChange} />
                            <span>{hobby}</span>
                        </label>
                    ))}
                </div>
                {errors.hobbies && <p className={styles.error}>{errors.hobbies}</p>}
            </div>
            <div className={styles.row}>
                <label className={styles.label} htmlFor="profilePic">Profile Picture</label>
                <input name="profilePic" id="profilePic" type="file" accept=".jpg,.jpeg,.png" onChange={handleChange} className={styles.input} />
                {picName && <span style={{ fontSize: '0.85rem', color: '#6b7280', marginLeft: '0.5rem' }}>{picName}</span>}
                {errors.profilePic && <p className={styles.error}>{errors.profilePic}</p>}
            </div>
            <div className={styles.row}>
                <label className={styles.label} htmlFor="bio">Bio <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>(optional)</span></label>
                <textarea name="bio" id="bio" maxLength={300} value={form.bio} onChange={handleChange} className={styles.textarea} rows={3} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {errors.bio && <p className={styles.error}>{errors.bio}</p>}
                    <span className={styles.bioCounter}>{bioLeft} characters left</span>
                </div>
            </div>
            <button type="submit" className={styles.button}>Register</button>
        </form>
    );
};

export default Widget2; 