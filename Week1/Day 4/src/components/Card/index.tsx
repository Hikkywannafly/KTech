type CardProps = {
    src?: string;
    title?: string;
    view?: string;
    className?: string;

}

export const Card = ({
    src = "",
    title = "",
    view = "",
    className = "",
}: CardProps) => {
    return (
        <div
            className=" flex flex-col gap-3 bg-white pb-4 rounded-2xl "
        >
            {/* Image */}
            <div className="">
                <img
                    src={src}
                    alt={title}
                    className={`rounded-2xl object-cover w-full h-48 ${className}`}
                />
            </div>
            {/* Title */}
            <span className="text-lg font-semibold text-gray-800 mx-2">
                {title}
            </span>
            {/* View */}
            <span className="text-red-500 mx-2">{view}</span>
        </div >
    );
};
