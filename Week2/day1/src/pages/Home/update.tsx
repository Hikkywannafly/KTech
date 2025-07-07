import React, { useEffect } from 'react';
const url = 'https://api.escuelajs.co/api/v1/products';
type Props = {
    productId: number;
    onUpdated?: (product: any) => void;
    onClose?: () => void;
};

export default function Update({ productId, onUpdated, onClose }: Props) {
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

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url + '/' + productId);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFormData({
                    title: data.title || '',
                    price: data.price?.toString() || '',
                    description: data.description || '',
                    categoryId: data.category?.id?.toString() || '',
                    images: (data.images || []).join(', '),
                });
            } catch (error: any) {
                setError('Error fetching product data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [productId]);

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
            const response = await fetch(url + '/' + productId, {
                method: 'PUT',
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
            if (onUpdated && typeof onUpdated === 'function') {
                onUpdated(data);
            }
        } catch (error: any) {
            setError('Error updating product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center' onSubmit={handleSubmit}>
            <div className='bg-white p-8 rounded-lg shadow-lg w-1/3'>
                <h2 className='text-2xl font-semibold mb-4'>Update Product</h2>
                {loading && <div className='mb-2 text-blue-500'>Loading...</div>}
                {error && <div className='mb-2 text-red-500'>{error}</div>}
                {success && <div className='mb-2 text-green-600'>Product updated successfully!</div>}
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
                <div className='flex justify-end gap-2'>
                    <button type='button' onClick={onClose} className='w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors' disabled={loading}>
                        Close
                    </button>
                    <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors' disabled={loading}>
                        Update Product
                    </button>
                </div>
            </div>
        </form>
    );
}