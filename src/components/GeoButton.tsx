import toast from "react-hot-toast";

interface GeoButtonProps {
	onCoordinatesReady: (lat: number, lon: number) => void;
}

const GeoButton = ({ onCoordinatesReady }: GeoButtonProps) => {
	const handleGeoLocate = () => {
		if (!navigator.geolocation) {
			toast.error("Ваш браузер не поддерживает геолокацию.");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			position => {
				onCoordinatesReady(position.coords.latitude, position.coords.longitude);
			},
			() => {
				toast.error(
					"Не удалось получить местоположение. Проверьте разрешения браузера."
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
