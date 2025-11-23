export interface SearchInputProps {
	status: boolean;
	setCityName: (name: string) => void;
	setWeather: (data: WeatherResponse) => void;
}

export interface WeatherLocation {
	country: string;
	name: string;
	tz_id: string;
}

export interface WeatherCurrent {
	wind_kph: number;
	humidity: number;
	temp_c: number;
	condition: { icon: string; text: string };
}

export interface ForecastDay {
	date: string;
	day: {
		maxtemp_c: number;
		mintemp_c: number;
		condition: {
			text: string;
			icon: string;
		};
	};
}

export interface WeatherForecast {
	forecastday: ForecastDay[];
}

export interface WeatherResponse {
	location: WeatherLocation;
	current: WeatherCurrent;
	forecast: WeatherForecast;
}

export interface CitySelectorProps {
	cityName: string;
	setCityName: (name: string) => void;
	setWeather: (data: WeatherResponse) => void;
}

export interface ForecastButtonProps {
	onClick: () => void;
}
