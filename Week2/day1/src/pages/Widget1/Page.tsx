import { FC, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import WeatherStats from "./WeatherStats";
import HourlyForecast from "./HourlyForecast";

const APIKEY = "c9a0ca46550648b29ce125849232709";

const Widget1: FC = () => {
  const [city, setCity] = useState("Hanoi");
  const [temp, setTemp] = useState<string>("--");
  const [condition, setCondition] = useState<string>("--");
  const [icon, setIcon] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("--");
  const [wind, setWind] = useState<string>("--");
  const [hours, setHours] = useState<{ time: string; temp: string; icon: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {

        const resCurrent = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&aqi=no&lang=vi`
        );
        if (!resCurrent.ok) throw new Error("Không tìm thấy thành phố hoặc lỗi mạng!");
        const dataCurrent = await resCurrent.json();
        setTemp(Math.round(dataCurrent.current.temp_c).toString());
        setCondition(dataCurrent.current.condition.text);
        setIcon(dataCurrent.current.condition.icon ? "https:" + dataCurrent.current.condition.icon : "");
        setHumidity(dataCurrent.current.humidity.toString());
        setWind(dataCurrent.current.wind_kph.toString());

    
        const resForecast = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=1&aqi=no&alerts=no&lang=vi`
        );
        if (!resForecast.ok) throw new Error("Không lấy được dự báo giờ!");
        const dataForecast = await resForecast.json();
        const nowHour = new Date().getHours();
        const hoursData = dataForecast.forecast.forecastday[0].hour
          .filter((h: any) => h.time && Number(h.time.split(" ")[1].split(":")[0]) >= nowHour)
          .slice(0, 4)
          .map((h: any, idx: number) => ({
            time: idx === 0 ? "Now" : h.time.split(" ")[1].slice(0, 5),
            temp: Math.round(h.temp_c).toString(),
            icon: h.condition.icon ? <img src={"https:" + h.condition.icon} alt="icon" className="w-6 h-6 inline" /> : "☀️"
          }));
        setHours(hoursData);
      } catch (err: any) {
        setError(err.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  return (
    <section>
      <div className="flex min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-300 to-blue-100 w-full justify-center items-center">
        <div className="w-[350px] rounded-3xl shadow-xl bg-blue-200/60 p-6">
          <SearchBar city={city} setCity={setCity} />
          {loading ? (
            <div className="text-center py-8">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <>
              <CurrentWeather temp={temp} condition={condition} icon={icon ? <img src={icon} alt="icon" className="w-8 h-8 inline" /> : "☀️"} />
              <WeatherStats humidity={humidity} wind={wind} />
              <HourlyForecast hours={hours} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Widget1;
