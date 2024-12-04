import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/DateFormatter";

const Weather = () => {
    const { resData } = useAuth();
    const [date, setDate] = React.useState("");
    const [weatherData, setWeatherData] = React.useState(null);
    console.log("weatherData", weatherData);

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        setDate(formattedDate);
        if (resData?.users?.weatherData) {
            setWeatherData(resData.users.weatherData);
        }
    }, [resData]);

    return (
        <div className="fixed top-6 right-6 mt-14 pr-5 pt-4 z-50">
            <div className="bg-weather-100 shadow-lg  rounded-xl py-4 max-w-md w-[56vw] sm:w-[28vw] md:w-[20vw] lg:w-[14vw]">
                <h1 className="text-xs font-semibold text-center mb-4">{date}</h1>
                {weatherData && (
                    <div className="space-y-2">
                        <p className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-700 text-center pt-2">
                            {weatherData.Temperature.split(".")[0]}°C
                        </p>
                        <p className="text-sm sm:text-base text-center text-gray-600">
                            {weatherData.location}
                        </p>
                        <p className="text-xs font-bold text-center text-gray-800">
                            Wind
                        </p>
                        <div className="flex  justify-center items-center mx-4 pt-4">
                            <div className="bg-weather-100 text-gray-800 w-full sm:w-1/2">
                                <p className="text-sm font-bold">{weatherData.Humidity}%</p>
                                <p className="text-xs">Humidity</p>
                            </div>
                            <div className="bg-weather-100 w-full sm:w-1/2">
                                <p className="text-sm font-bold text-gray-800">{weatherData.WindSpeed} km/h</p>
                                <p className="text-xs">Wind Speed</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
