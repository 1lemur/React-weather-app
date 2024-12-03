import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BsCloudFog2Fill, BsCloudyFill, BsFillSunFill, BsSnow } from 'react-icons/bs';
import { CiSearch } from "react-icons/ci";
import { TiWeatherPartlySunny } from 'react-icons/ti';
import DisplayError from './UI/DisplayError';
import Loader from "./UI/Loader";
import WeatherDetails from "./WeatherDetails";
import WeatherMainData from "./WeatherMainData";

interface WeatherDataProps {
   name: string;
   main: {
      temp: number;
      humidity: number;
   };
   sys: {
      country: string;
   };
   weather: {
      main: string;
   }[];
   wind: {
      speed: number;
   };
}

const iconMapping: { [key: string]: JSX.Element } = {
   Rain: <BsCloudyFill size={48} />,
   Clear: <BsFillSunFill size={48} />,
   Clouds: <BsCloudyFill size={48} />,
   Mist: <BsCloudFog2Fill size={48} />,
   Snow: <BsSnow size={48} />,
   Default: <TiWeatherPartlySunny size={48} />
};

const DisplayWeather = () => {
   const API_KEY = process.env.REACT_APP_API_KEY!;
   const BASE_URL = process.env.REACT_APP_BASE_URL!;

   const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [inputCity, setInputCity] = useState("");
   const [error, setError] = useState("")

   const fetchWeatherData = async (city: string) => {
      try {
         const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
         const { data } = await axios.get(url);
         setWeatherData(data);
      } catch (e: any) {
         setWeatherData(null)
         setError('City not found') 
      }
   };

   const fetchCurrentWeather = useCallback(async (lat: number, lon: number) => {
      try {
         const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
         const { data } = await axios.get(url);
         setWeatherData(data);
      } catch (e) {
         // console.error(e);
      }
   }, [BASE_URL, API_KEY])

   const handleSearch = async () => {
      if (inputCity.trim()=== '') return;
      setError('')
      setIsLoading(true);
      await fetchWeatherData(inputCity);
      setIsLoading(false);
   };

   const iconChanger = (weather: string) => {
      return iconMapping[weather] || iconMapping.Default;
   };

   useEffect(() => {
      const fetchGeolocationWeather = async () => {
         navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchCurrentWeather(latitude, longitude);
         });
      };
      fetchGeolocationWeather();
   }, [fetchCurrentWeather]);

   return (
      <div className="p-5 bg-white bg-opacity-15 rounded-3xl flex flex-col gap-10 max-w-min">
         <div className="flex gap-5 items-center">
            <input
               type="text"
               placeholder="Write a city"
               className="border-teal-50 border-solid border-2 p-3 rounded-3xl focus:outline-teal-50 w-80"
               value={inputCity}
               onChange={(e) => setInputCity(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <CiSearch
               onClick={handleSearch}
               size={51}
               className="border-2 p-3 border-teal-50 rounded-full cursor-pointer hover:bg-teal-50 transition-colors ease-in"
            />
         </div>
         {isLoading ? (
            <Loader />
         ) : weatherData && !error ? (
            <>
               <WeatherMainData
                  name={weatherData.name}
                  country={weatherData.sys.country}
                  weatherMain={weatherData.weather[0].main}
                  temperature={weatherData.main.temp}
                  weatherIcon={iconChanger(weatherData.weather[0].main)}
               />
               <WeatherDetails
                  humidity={weatherData.main.humidity}
                  windSpeed={weatherData.wind.speed}
               />
            </>
         ) : <DisplayError error={error} /> 
         }
      </div>
   );
};

export default DisplayWeather;
