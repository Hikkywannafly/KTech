const url = 'https://api.escuelajs.co/api/v1/products';

type Props = {
    productId: number;
    onDeleted?: (id: number) => void;
};

export default function Delete({ productId, onDeleted }: Props) {
    const handleOnDelete = async (id: number) => {
        try {
            if (!confirm('Are you sure you want to delete this product?')) {
                console.log('Delete operation cancelled');
                return;
            }
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (onDeleted && typeof onDeleted === 'function') {
                onDeleted(id);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    return (
        <div>
            <button className='bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors' onClick={() => handleOnDelete(productId)}>
                Delete
            </button>
        </div>
    );
}