const apiKey = "707e8234b23b4d648dd82820250611"; // Get this key on https://www.weatherapi.com/my/

const f5Days = document.getElementById("forecast5Days") as HTMLButtonElement;

const wSearchBar = document.getElementById("searchBar") as HTMLDivElement;

function detectLocation() {
	const geoBtn = document.getElementById("geoBtn") as HTMLButtonElement;

	geoBtn.addEventListener("click", () => {
		if (!navigator.geolocation) {
			alert("Geolocation is not supported by your browser.");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				fetchCity(`${latitude},${longitude}`);
				f5Days.classList.remove("hidden");
			},
			() => {
				alert("Unable to retrieve your location.");
			}
		);
	});
}

function searchBarAnimation() {
	const btn = document.getElementById("cityBtn") as HTMLDivElement;
	const arrow = document.getElementById("arrow") as HTMLImageElement;
	btn.addEventListener("click", () => {
		arrow.classList.toggle("rotate-180");
		wSearchBar.classList.toggle("opacity-0");
	});
}

function searchAction() {
	const searchBtn = document.getElementById("searchBtn") as HTMLImageElement;
	const searchInput = document.getElementById(
		"searchInput"
	) as HTMLInputElement;

	searchBtn.addEventListener("click", () => {
		const city = searchInput.value.trim();
		if (!city) {
			searchInput.placeholder = "Please enter something :)";
			return;
		}
		f5Days.classList.remove("hidden");
		fetchCity(city);
	});
}

async function fetchCity(cityName: string) {
	const localTimeSpan = document.getElementById("localTime") as HTMLSpanElement;
	const humidityNow = document.getElementById(
		"humidityPercent"
	) as HTMLSpanElement;
	const windSpeed = document.getElementById("windValue") as HTMLSpanElement;
	const weatherImage = document.getElementById(
		"weatherImage"
	) as HTMLImageElement;
	const weatherDegree = document.getElementById(
		"weatherDegree"
	) as HTMLSpanElement;
	const nameOfCity = document.getElementById(
		"cityName"
	) as HTMLParagraphElement;
	const weatherStatus = document.getElementById(
		"weatherStatus"
	) as HTMLSpanElement;

	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5&aqi=yes&alerts=no`
		);

		if (!response.ok) {
			throw new Error("City not found");
		}

		const body = await response.json();
		const {
			current: {
				wind_kph,
				humidity,
				temp_c,
				condition: { text, icon },
			},
			location: { country, name, tz_id },
		} = body;

		const days = body.forecast.forecastday.map((day: any) => ({
			date: day.date,
			text: day.day.condition.text,
			icon: day.day.condition.icon,
			max: day.day.maxtemp_c,
			min: day.day.mintemp_c,
		}));

		const localTime = new Date().toLocaleString("en-US", {
			timeZone: tz_id,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});

		f5Days.addEventListener(
			"click",
			() => {
				renderForecast(days);
			},
			{ once: true }
		);

		weatherImage.src = `https:${icon}`;
		weatherDegree.textContent = `${temp_c}°`;
		nameOfCity.textContent = `${country}, ${name}`;
		weatherStatus.textContent = text;
		humidityNow.textContent = `${humidity}%`;
		windSpeed.textContent = `${wind_kph}km/h`;
		localTimeSpan.textContent = `Current local time: ${localTime}`;
	} catch (err) {
		console.log(err);
		nameOfCity.textContent = "City not found";
		weatherStatus.textContent = "Sorry, we can't find this city :(";
	}
}

function renderForecast(days: any[]) {
	const container = document.getElementById(
		"forecastContainer"
	) as HTMLDivElement;
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
	days.forEach(day => {
		const card = document.createElement("div");
		card.className = "flex flex-col items-center px-4 ";

		card.innerHTML = `<p class="text-white text-sm">${day.date}</p>
			<img src="https:${day.icon}" alt="${day.text}" class="w-12 h-12 my-2" />
			<p class="text-white text-md">${day.text}</p>
			<p class="text-white text-sm">🌡 ${day.max}° / ${day.min}°</p>`;

		container.appendChild(card);
	});
}

detectLocation();
searchBarAnimation();
searchAction();
