import type { ForecastDay } from "../types";

const ForecastList = ({ forecastday }: { forecastday: ForecastDay[] }) => {
	return (
		<div className='flex flex-wrap gap-4 mt-6 justify-center px-4'>
			{forecastday.map(day => (
				<div
					key={day.date}
					className='flex flex-col items-center px-4 py-4 text-white'
				>
					<span>{day.date}</span>
					<img src={`https:${day.day.condition.icon}`} alt='' />
					<span>{day.day.condition.text}</span>
					<span>
						🌡{day.day.maxtemp_c}° / {day.day.mintemp_c}°
					</span>
				</div>
			))}
		</div>
	);
};

export default ForecastList;
