import React from 'react';

type Props = {
    selected: number[];
    onChange: (ids: number[]) => void;
};

const CategoryFilter: React.FC<Props> = ({ selected, onChange }) => {

    const [categories, setCategories] = React.useState<any[]>([]);
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/categories');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }
    React.useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        loadCategories();
    }, []);

    console.log('Selected categories:', selected);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Categories</h2>

            <div className="space-y-2">

                {
                    categories.map((category) => (
                        <label key={category.id} className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={selected.includes(category.id)}
                                onChange={(e) => {
                                    const newSelected = e.target.checked
                                        ? [...selected, category.id]
                                        : selected.filter(id => id !== category.id);
                                    onChange(newSelected);
                                }}
                            />
                            {category.name}
                        </label>
                    ))
                }
            </div>
        </div>
    );
};

export default CategoryFilter; 