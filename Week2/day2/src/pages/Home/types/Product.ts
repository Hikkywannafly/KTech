export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};


export type Category = {
    id: number;
    name: string;
    image: string;
    slug: string;

}

export type ProductSchema = {
    id?: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
    category?: Category;
    images: any[];
    slug?: string;
    creationAt?: string;
    updatedAt?: string;
};

