import { Card2 } from "@/components/Card2";

import { FC } from "react";

const Data = [
    {
        src: "https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/Apple-USBC-To-SDCard-A.jpg?raw=true",
        title: "Chomusuke 1 Chomusuke 1 Chomusuke 1 Chomusuke 1 Chomusuke 1 Chomusuke 1",
        price: 100000,
        discount: 99,
    },
    {
        src: "https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/airpod-3.png?raw=true",
        title: "Chomusuke 2 Chomusuke 1 Chomusuke 1 Chomusuke 1 Chomusuke 1 Chomusuke 1",
        price: 300000,
        discount: 29,
    },
    {
        src: "https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/cap-lightning-to-usb-cable-md818zma-1.jpg?raw=true",
        title: "Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3",
        price: 3000,
    },
    {
        src: "https://github.com/ngothanhtung/vku-reactjs/blob/main/react-practices/Day-04/images-list-4/type-c-20-w.png?raw=true",
        title: " Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3 Chomusuke 3 ",
        price: 103000,
    },
]
const Widget1: FC = () => {
    return (
        <section>
            <div className="flex  min-h-[calc(100vh-64px)] bg-base-200 w-full justify-center ">
                <div className="flex-col lg:flex-row max-w-7xl w-full px-4 py-8 gap-4">

                    <div className="flex justify-between items-center mb-5">
                        <span className="text-xl font-bold">Phụ kiện tương thích</span>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {Data.map((item, index) => (
                            <Card2
                                key={index}
                                src={item.src}
                                title={item.title}
                                price={item.price}
                                discount={item?.discount || undefined}
                                className="rounded-lg shadow-lg"
                            />
                        ))}
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Widget1;
