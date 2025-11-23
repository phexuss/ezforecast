import type { ForecastButtonProps } from "../types.ts";

const ForecastButton = ({ onClick }: ForecastButtonProps) => {
	return (
		<button
			onClick={onClick}
			className='text-white font-medium text-xl mt-4 hover:bg-main-gray rounded-md p-1 transition duration-300 cursor-pointer'
		>
			Get Forecast for 3 Days
		</button>
	);
};

export default ForecastButton;
