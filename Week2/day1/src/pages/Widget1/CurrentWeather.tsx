import { FC } from "react";

const CurrentWeather: FC<{ temp: string; condition: string; icon: any }> = ({ temp, condition, icon }) => (
    <div className="flex flex-col items-center mb-4">
        <div className="text-6xl font-bold">{temp}°</div>
        <div className="flex items-center gap-2 text-xl mt-2">
            <span>{condition}</span>
            <span>{icon}</span>
        </div>
    </div>
);

export default CurrentWeather; 