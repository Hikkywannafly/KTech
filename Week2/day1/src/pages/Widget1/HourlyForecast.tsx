import { FC } from "react";

type Hour = { time: string; temp: string; icon: string };

const HourlyForecast: FC<{ hours: Hour[] }> = ({ hours }) => (
    <div className="bg-white/80 rounded-xl p-4 flex flex-col items-center">
        <div className="w-full flex justify-between mb-2 text-gray-600 font-semibold">Now</div>
        <div className="flex gap-6 overflow-x-auto">
            {hours.map((h, i) => (
                <div key={i} className="flex flex-col items-center min-w-[60px]">
                    <span className="text-2xl">{h.icon}</span>
                    <span className="font-bold text-lg">{h.temp}°</span>
                    <span className="text-xs text-gray-500">{h.time}</span>
                </div>
            ))}
        </div>
    </div>
);

export default HourlyForecast; 