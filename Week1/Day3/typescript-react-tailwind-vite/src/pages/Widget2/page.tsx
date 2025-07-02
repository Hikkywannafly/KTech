import { Input } from "@/components/Input";
import { Search, CircleEllipsis, Phone, SlidersHorizontal } from "lucide-react";

export default function Widget2() {
    return (
        <div className="p-4 w-full h-fit flex  justify-center bg-gray-100 min-h-screen">
            <div className="flex flex-col gap-4 w-full max-w-md">

                <Input leftIcon={<Search />} />
                <Input leftIcon={<Search />} placeholder="Search" />
                <Input defaultValue="Textfield" leftIcon={<Search />} />
                <Input leftIcon={<Search />} placeholder="Search in the web" />
                <Input
                    leftIcon={<Search />}
                    placeholder="Search in the web"
                    rightIcon={<CircleEllipsis className="text-gray-500" />}
                />
                <Input
                    leftIcon={<Search />}
                    placeholder="Search crypto"
                    rightIcon={<SlidersHorizontal className="text-gray-500" />}
                />
                <Input
                    placeholder="Phone number"
                    rightIcon={
                        <div className="bg-green-100 p-2 rounded-full">
                            <Phone className="text-green-600 w-4 h-4" />
                        </div>
                    }
                />
                <Input
                    leftIcon={<Search />}
                    placeholder="Search in the web"
                    rightIcon={
                        <div className="bg-yellow-300 p-2 rounded-full">
                            <CircleEllipsis className="text-yellow-800 w-4 h-4" />
                        </div>
                    }
                />
            </div>
        </div>
    );
}
