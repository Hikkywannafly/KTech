import React from 'react';

type Props = {
    onCreated?: (product: any) => void;
};

const url = 'https://api.escuelajs.co/api/v1/products';

export default function Create({ onCreated }: Props) {
    const [formData, setFormData] = React.useState({
        title: '',
        price: '',
        description: '',
        categoryId: '',
        images: '', // comma separated URLs
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const payload = {
                title: formData.title,
                price: Number(formData.price),
                description: formData.description,
                categoryId: Number(formData.categoryId),
                images: formData.images.split(',').map((url) => url.trim()).filter(Boolean),
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSuccess(true);
            setFormData({
                title: '',
                price: '',
                description: '',
                categoryId: '',
                images: '',
            });
            if (onCreated && typeof onCreated === 'function') {
                onCreated(data);
            }
        } catch (error: any) {
            setError('Error creating product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className='w-full p-4 bg-white rounded shadow mb-4' onSubmit={handleSubmit}>
                <h2 className='text-xl font-bold mb-4'>Create Product</h2>
                {loading && <div className='mb-2 text-blue-500'>Loading...</div>}
                {error && <div className='mb-2 text-red-500'>{error}</div>}
                {success && <div className='mb-2 text-green-600'>Product created successfully!</div>}
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='title'>
                        Title
                    </label>
                    <input type='text' id='title' value={formData.title} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} disabled={loading} />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='price'>
                        Price
                    </label>
                    <input type='number' id='price' value={formData.price} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} disabled={loading} />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='description'>
                        Description
                    </label>
                    <textarea id='description' value={formData.description} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} disabled={loading} />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='categoryId'>
                        Category ID
                    </label>
                    <input type='number' id='categoryId' value={formData.categoryId} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} disabled={loading} />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor='images'>
                        Images (comma separated URLs)
                    </label>
                    <input type='text' id='images' value={formData.images} className='w-full p-2 border border-gray-300 rounded' onChange={handleChange} disabled={loading} />
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors' disabled={loading}>
                    Create Product
                </button>
            </form>
        </div>
    );
}