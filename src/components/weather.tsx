import sleep from "@/util/sleep";
import generateRandomNumber from "@/util/random";

const Weather = async () => {
    async function getWeather() {
        "use server";

        const w = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=40.7411&longitude=73.9897&current=precipitation&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FNew_York&forecast_days=1"
        );

        const data: {
            latitude: number;
            longitude: number;
            timezone: string;
            timezone_abbreviation: string;
            current: {
                time: string;
                interval: number;
                precipitation: number;
            };
        } = await w.json();

        return data.current.precipitation > 0.5;
    }

    const raining = await getWeather();

    return (
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <h2 className={`mb-3 text-8xl font-semibold`}>
                {raining ? "Yes" : "No"}
            </h2>
        </div>
    );
};

export default Weather;
