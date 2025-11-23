import { useState } from "react";
import type { CitySelectorProps } from "../types.ts";
import SearchInput from "./SearchInput.tsx";

const CitySelector = ({
	cityName,
	setCityName,
	setWeather,
}: CitySelectorProps) => {
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	return (
		<>
			<div className='flex flex-row px-6 pt-8 gap-3.5 font-inter'>
				<img src='./geo.svg' alt='Geo image' />
				<p className='text-white text-2xl '>{cityName}</p>
				<button
					onClick={handleClick}
					className={`transition-transform duration-300 cursor-pointer ${
						isClicked ? "rotate-180" : "rotate-0"
					} `}
				>
					<img src='./triangle.svg' alt='triangle image' />
				</button>
			</div>
			<SearchInput
				status={isClicked}
				setCityName={setCityName}
				setWeather={setWeather}
			/>
		</>
	);
};

export default CitySelector;
