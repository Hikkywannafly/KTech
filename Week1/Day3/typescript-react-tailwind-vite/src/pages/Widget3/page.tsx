import React from "react";
import { Ellipsis, Eye } from "lucide-react";
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-xl p-4 shadow-sm ${className}`}>{children}</div>
);

export default function Widget3() {
    return (
        <div className="p-4 w-full h-fit flex  justify-center bg-gray-100 min-h-screen">
            <div className="flex flex-col gap-4 w-full max-w-md">


                <div className="flex flex-col gap-4 w-full ">
                    <Card className="flex flex-col justify-between items-center">
                        <div className="flex items-center gap-2 mb-2 w-full justify-between">
                            <span className="text-red-500 text-sm">7'</span>
                            <Ellipsis />
                        </div>

                        <span className="text-sm flex items-center gap-2 w-full justify-between">
                            Span
                            🏳️‍⚧️
                            <span className=" bg-amber-500 rounded-2xl px-2 py-1">
                                0 : 0
                            </span>
                            🏳️‍⚧️
                            France
                        </span>

                    </Card>

                    <Card className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png" className="w-6 h-6" />
                            Manchester United
                        </span>
                        <Ellipsis />
                    </Card>

                    <Card className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXZTC-XW3tkOP-ucSNB7q3qFM5R0Is_djzIw&s" className="w-10 h-10 rounded-full" />
                            <div>
                                <div className="font-medium">Wade Warren</div>
                                <div className="text-blue-600 text-sm">VISA 3242 •••• </div>
                            </div>
                        </div>
                        <Eye />
                    </Card>

                    <Card>
                        <div className="flex gap-2 mb-2 text-xs">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Highlight</span>
                            <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">Feeds</span>
                        </div>
                        <div className="font-semibold">Dashboard</div>
                        <div className="text-sm text-gray-400">Business management service</div>
                        <div className="mt-2 bg-gray-100 h-2 rounded-full">
                            <div className="bg-green-500 h-2 w-[80%] rounded-full"></div>
                        </div>
                    </Card>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <Card className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXZTC-XW3tkOP-ucSNB7q3qFM5R0Is_djzIw&s" className="w-10 h-10 rounded-full" />
                            <div>
                                <div className="font-semibold">Yolanda</div>
                                <div className="text-sm text-gray-500">Web Development</div>
                            </div>
                        </div>
                        <span>📷</span>
                    </Card>

                    <div className=" bg-white rounded-xl  shadow-sm flex justify-between items-center p-0">
                        <div className="flex items-center h-[70px] w-full">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXZTC-XW3tkOP-ucSNB7q3qFM5R0Is_djzIw&s"
                                className="h-full object-cover rounded-l-xl "
                                style={{ width: "70px" }}
                            />
                            <span className="font-medium ml-2">María</span>
                        </div>
                        <span className="text-green-600">📞</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
