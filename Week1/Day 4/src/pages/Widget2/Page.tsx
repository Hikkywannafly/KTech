import { FC } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const Button = ({ onClick, className, children }: { onClick: () => void; className?: string; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`btn rounded-xl0 p-2 w-[70px] ${className || ''}`}
    >
        {children}
    </button>
);

type Product = {
    id: number;
    name: string;
    image: string;
    price?: number;
    status?: string;
};

const colorOptions = [
    { key: "red", label: "Đỏ", className: "bg-red-500 text-white" },
    { key: "blue", label: "Xanh", className: "bg-blue-500 text-white" },
    { key: "yellow", label: "Vàng", className: "bg-yellow-500 text-white" },
];

const starOptions = [
    { id: 1, msg: "Rat Te" },
    { id: 2, msg: "Te" },
    { id: 3, msg: "Binh thuong" },
    { id: 4, msg: "Tuyet voi" },
    { id: 5, msg: "Rat Tuyet Voi!" },
];

const Widget2: FC = () => {
    const [activeColor, setActiveColor] = useState<string | null>(null);
    const [selectedStar, setSelectedStar] = useState<number>(-1);
    const [starMessage, setStarMessage] = useState("");

    const handleStarClick = (index: number) => {
        setSelectedStar(index);
        setStarMessage(starOptions[index]?.msg || "");
    };
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: "vivo Y18 8GB/128GB",
            price: 4410000,
            image: "https://galaxydidong.vn/wp-content/uploads/2022/09/14-pro-max-galaxydidong-vang.jpg",
        },
        {
            id: 2,
            name: "FESTINA 40 mm Nam F20007/2",
            price: 3646000,
            image: "https://galaxydidong.vn/wp-content/uploads/2022/09/14-pro-max-galaxydidong-vang.jpg",
        },
        {
            id: 3,
            name: "Samsung Galaxy A55 5G 8GB/256GB",
            status: "Ngừng kinh doanh",
            image: "https://galaxydidong.vn/wp-content/uploads/2022/09/14-pro-max-galaxydidong-vang.jpg",
        },
        {
            id: 4,
            name: "Samsung Galaxy A56 5G 12GB/256GB",
            price: 11480000,
            image: "https://galaxydidong.vn/wp-content/uploads/2022/09/14-pro-max-galaxydidong-vang.jpg",
        },
    ]);
    const handleRemove = (id: number) => {
        setProducts((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <section>
            <div className="flex min-h-[calc(100vh-64px)] bg-base-200 w-full justify-center ">
                <div className="flex-col lg:flex-row max-w-7xl w-full px-4 py-8 gap-4">
                    {/* state 1 */}
                    <div className="flex flex-col gap-3">
                        <h1>State 1</h1>
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <span>Màu :</span>
                            <div className="flex gap-2">
                                {colorOptions.map((color) => (
                                    <Button
                                        key={color.key}
                                        onClick={() => setActiveColor(color.key)}
                                        className={
                                            activeColor === color.key
                                                ? color.className
                                                : "border border-amber-700"
                                        }
                                    >
                                        {color.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* state 2 */}
                    <div className="flex flex-col gap-3">
                        <h1>State 2</h1>
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <div>
                                {starOptions.map((item, index) => (
                                    <FontAwesomeIcon
                                        key={item.id}
                                        icon={index <= selectedStar ? faStarSolid : faStarRegular}
                                        style={{ color: "#f60", cursor: "pointer" }}
                                        onClick={() => handleStarClick(index)}
                                    />
                                ))}
                                <span style={{ display: "inline-block", marginLeft: "10px" }}>{starMessage}</span>
                            </div>
                        </div>
                    </div>
                    {/* state 3 */}
                    <div className=" ">
                        <h1>State 3</h1>
                        <div className="flex gap-4 flex-wrap p-4">
                            {products.map((p) => (
                                <div key={p.id} className="border p-2 rounded w-56 relative">

                                    <button
                                        onClick={() => handleRemove(p.id)}
                                        className="absolute top-1 right-1 text-sm text-gray-500 hover:text-red-600"
                                    >
                                        ✕
                                    </button>
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-16 h-16 object-contain mb-2"
                                    />
                                    <p className="text-sm">{p.name}</p>
                                    {p.status ? (
                                        <p className="text-red-500 text-sm font-medium">{p.status}</p>
                                    ) : (
                                        <p className="text-red-600 font-semibold text-sm">
                                            {p.price?.toLocaleString("vi-VN")}₫
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Widget2;
