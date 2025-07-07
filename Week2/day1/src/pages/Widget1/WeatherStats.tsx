import { FC } from "react";

const WeatherStats: FC<{ humidity: string; wind: string }> = ({ humidity, wind }) => (
    <div className="flex gap-4 justify-center mb-4">
        <div className="bg-white/60 rounded-xl px-6 py-4 flex flex-col items-center shadow">
            <div className="text-sm text-gray-600">Humidity</div>
            <div className="text-2xl font-bold">{humidity}%</div>
        </div>
        <div className="bg-white/60 rounded-xl px-6 py-4 flex flex-col items-center shadow">
            <div className="text-sm text-gray-600">Wind</div>
            <div className="text-2xl font-bold">{wind} km/h</div>
        </div>
    </div>
);

export default WeatherStats; 