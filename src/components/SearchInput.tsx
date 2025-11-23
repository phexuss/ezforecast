import axios from "axios";
import toast from "react-hot-toast";

import { useState } from "react";
import type { SearchInputProps, WeatherResponse } from "../types.ts";
import GeoButton from "./GeoButton.tsx";

const apiKey = "707e8234b23b4d648dd82820250611";

const SearchInput = ({ status, setCityName, setWeather }: SearchInputProps) => {
	const [inputValue, setInputValue] = useState("");

	const handleGeoSearch = async (lat: number, lon: number) => {
		const query = `${lat},${lon}`;

		try {
			const response = await axios.get<WeatherResponse>(
				`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=5&aqi=yes&alerts=no`
			);

			setWeather(response.data);

			setCityName(
				`${response.data.location.name}, ${response.data.location.country}`
			);
		} catch (error) {
			console.error("Error occurred during geo search", error);
			toast.error("Error occurred during geo search");
		}
	};

	const handleClick = async () => {
		const cityName = inputValue.trim();
		if (!cityName) return;
		try {
			const response = await axios.get<WeatherResponse>(
				`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5&aqi=yes&alerts=no`
			);
			setWeather(response.data);
			console.log(response.data);
			setCityName(
				`${response.data.location.name}, ${response.data.location.country}`
			);
		} catch (error) {
			console.error("Error occured", error);
			toast.error("Error occured");
		}
	};

	return (
		<>
			<div
				id='weatherInfo'
				className='flex-col items-center gap-2 transition-all duration-300'
			>
				<div className='w-full flex justify-center mt-4 px-6'>
					<div
						id='searchBar'
						className={`absolute bg-black/40 backdrop-blur-sm flex items-center justify-center z-10 transition-all duration-300 ${
							status
								? "opacity-100 scale-100"
								: "opacity-0 scale-95 pointer-events-none"
						}  scale-95 rounded-2xl px-4`}
					>
						<input
							id='searchInput'
							type='text'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							placeholder='Enter a city...'
							className='w-full px-4 py-6 rounded-lg text-white text-[24px] focus:outline-none transition duration-300'
						/>
						<button onClick={handleClick}>
							<img
								className='leading-none hover:text-gray-300 w-8 h-8 cursor-pointer'
								src='./search.svg'
								alt='search image'
							/>
						</button>
					</div>
				</div>
			</div>
			<GeoButton onCoordinatesReady={handleGeoSearch} />
		</>
	);
};

export default SearchInput;
