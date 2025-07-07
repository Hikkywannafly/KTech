import { FC } from "react";

const cities = [
    { label: "Hà Nội", value: "Hanoi" },
    { label: "Đà Nẵng", value: "Da nang" },
    { label: "Tokyo", value: "Tokyo" },
    { label: "Kyoto", value: "Kyoto" },
    { label: "Hồ Chí Minh", value: "Ho Chi Minh" },
];

const SearchBar: FC<{ city: string; setCity: (c: string) => void }> = ({ city, setCity }) => (
    <div className="w-full flex justify-center mb-4">
        <select
            className="w-full max-w-xs p-2 rounded-full border border-gray-300 text-lg text-center bg-white"
            value={city}
            onChange={e => setCity(e.target.value)}
        >
            {cities.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
            ))}
        </select>
    </div>
);

export default SearchBar; 