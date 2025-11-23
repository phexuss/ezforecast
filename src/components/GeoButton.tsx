import toast from "react-hot-toast";

interface GeoButtonProps {
	onCoordinatesReady: (lat: number, lon: number) => void;
}

const GeoButton = ({ onCoordinatesReady }: GeoButtonProps) => {
	const handleGeoLocate = () => {
		if (!navigator.geolocation) {
			toast.error("Your browser does not support geolocation.");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			position => {
				onCoordinatesReady(position.coords.latitude, position.coords.longitude);
			},
			() => {
				toast.error(
					"Unable to retrieve location. Check your browser permissions."
				);
			}
		);
	};

	return (
		<div className='flex px-6'>
			<button
				onClick={handleGeoLocate}
				id='geoBtn'
				className='text-white font-medium text-xl hover:bg-main-gray rounded-md p-1 transition duration-300 cursor-pointer'
			>
				Use current location
			</button>
		</div>
	);
};

export default GeoButton;
