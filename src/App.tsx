import { Toaster } from "react-hot-toast";

import { useState } from "react";
import Background from "./components/Background";
import CitySelector from "./components/CitySelector";
import WeatherDisplay from "./components/WeatherDisplay";
import "./styles/App.css";
import type { WeatherResponse } from "./types";

function App() {
	const [cityName, setCityName] = useState("City");
	const [weather, setWeather] = useState<WeatherResponse | null>(null);
	return (
		<>
			<Background />
			<CitySelector
				cityName={cityName}
				setCityName={setCityName}
				setWeather={setWeather}
			/>
			{weather && <WeatherDisplay weather={weather} />}
			<Toaster position='top-center' />
		</>
	);
}

export default App;
