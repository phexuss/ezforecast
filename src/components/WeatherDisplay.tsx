import { useState } from "react";
import type { WeatherResponse } from "../types";
import ForecastButton from "./ForecastButton";
import ForecastList from "./ForecastList";

const WeatherDisplay = ({ weather }: { weather: WeatherResponse }) => {
	const [isForecast, setIsForecast] = useState(false);

	const handleForecast = () => {
		setIsForecast(prev => !prev);
	};

	return (
		<div className='flex flex-col items-center pt-25 gap-2 font-inter '>
			<span className='text-3xl font-medium text-white'>
				{weather.current.condition.text}
			</span>
			<img
				src={`https:${weather.current.condition.icon}`}
				className='w-44 h-44 py-6 px-6'
				alt='icon image'
			/>
			<span className='text-6xl font-medium pb-2.5 m-auto text-white '>
				{weather.current.temp_c}°
			</span>

			<span className='flex flex-row gap-5 items-center w-10 h-auto mr-40 my-2.5'>
				<img src='./wind.svg' alt='' />
				<span className='text-2xl text-white'>
					{weather.current.wind_kph}km/h
				</span>
			</span>

			<span className='flex flex-row gap-5 items-center w-10 h-auto mr-40 my-2.5'>
				<img src='./humidity.svg' alt='' />
				<span className='text-2xl text-white'>{weather.current.humidity}%</span>
			</span>

			<ForecastButton onClick={handleForecast} />

			{isForecast && (
				<ForecastList forecastday={weather.forecast.forecastday} />
			)}
		</div>
	);
};

export default WeatherDisplay;
