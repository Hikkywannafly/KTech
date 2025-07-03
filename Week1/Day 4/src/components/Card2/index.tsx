type CardProps = {
    src?: string;
    title?: string;
    price: number;
    className?: string;
    discount?: number;
}

export const Card2 = ({
    src = "",
    title = "",
    price,
    discount,
    className = "",
}: CardProps) => {
    return (
        <div
            className=" flex flex-col gap-3 bg-white pb-4 rounded-2xl "
        >
            <div className="relative">
                <img
                    src={src}
                    alt={title}
                    className={`rounded-2xl object-contain w-full h-48 ${className}`}
                />
                {
                    discount && (
                        <>
                            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                                {discount}%
                            </span>
                        </>
                    )
                }

            </div>

            <span className="text-lg font-semibold text-gray-800 mx-2">
                {title}
            </span>
            <div className="flex items-center mx-2">
                <span className="text-red-500 font-semibold mr-2">
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(price)}
                </span>
                {discount && (
                    <span className="text-gray-500 line-through">
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(price / (1 - discount / 100))}
                    </span>
                )}
            </div >

        </div >
    );
};
