import { FC } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const Button = ({ onClick, className, children }: { onClick: () => void; className: string; children: React.ReactNode }) => (

    <button
        onClick={onClick}
        className={`btn rounded-xl0 p-2 w-[70px] ${className}`}
    >
        {children}
    </button>
);

const Widget2: FC = () => {
    const [activeColor, setActiveColor] = useState<string | null>(null);
    const [stars, setStars] = useState(0);
    const [msg, setMsg] = useState('');

    const TotalStar_arr = [
        { id: 1, msg: 'Rat Te' },
        { id: 2, msg: 'Te' },
        { id: 3, msg: 'Binh thuong' },
        { id: 4, msg: 'Tuyet voi' },
        { id: 5, msg: 'Rat Tuyet Voi!' }
    ];
    return (
        <section>
            <div className="flex  min-h-[calc(100vh-64px)] bg-base-200 w-full justify-center ">
                <div className="flex-col lg:flex-row max-w-7xl w-full px-4 py-8 gap-4">
                    {/* state 1 */}

                    <div className="flex flex-col gap-3">

                        <h1>State 1</h1>
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <span>
                                Màu :
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveColor("red")}
                                    className={`btn rounded-xl0 p-2 w-[70px] ${activeColor === "red"
                                        ? "bg-red-500 text-white"
                                        : "border border-amber-700"
                                        }`}
                                >
                                    Đỏ
                                </button>
                                <button
                                    onClick={() => setActiveColor("blue")}
                                    className={`btn rounded-xl0 p-2 w-[70px] ${activeColor === "blue"
                                        ? "bg-blue-500 text-white"
                                        : "border border-amber-700"
                                        }`}
                                >
                                    Xanh
                                </button>
                                <button
                                    onClick={() => setActiveColor("yellow")}
                                    className={`btn rounded-xl0 p-2 w-[70px] ${activeColor === "yellow"
                                        ? "bg-yellow-500 text-white"
                                        : "border border-amber-700"
                                        }`}
                                >
                                    Vàng
                                </button>
                            </div>

                        </div>

                    </div>


                    <div className="flex flex-col gap-3">

                        <h1>State 2</h1>
                        <div className="flex flex-row gap-4 justify-center items-center">
                            <div>
                                {TotalStar_arr.map((item, index) => {
                                    if (index <= stars) {
                                        return (
                                            <FontAwesomeIcon
                                                key={item.id.toString()}
                                                icon={faStarSolid}
                                                style={{ color: '#f60', cursor: 'pointer' }}
                                                onClick={() => {
                                                    setStars(index);
                                                    setMsg(item.msg);
                                                }}
                                            />
                                        );
                                    }
                                    return (
                                        <FontAwesomeIcon
                                            key={item.id.toString()}
                                            icon={faStarRegular}
                                            style={{ color: '#f60', cursor: 'pointer' }}
                                            onClick={() => {
                                                setStars(index);
                                                setMsg(item.msg);
                                            }}
                                        />
                                    );
                                })}
                                <span style={{ 'display': 'inline-block', 'marginLeft': '10px' }}>{msg}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section >
    );
};

export default Widget2;
