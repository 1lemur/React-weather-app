import { FaWind } from "react-icons/fa";
import { RiWaterPercentFill } from "react-icons/ri";

interface WeatherDetailsProps {
  humidity: number;
  windSpeed: number;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ humidity, windSpeed }) => {
   return (
      <div className="flex items-center justify-between bg-white p-3 rounded-3xl bg-opacity-70 leading-6 ">
         <div className="flex items-center">
            <RiWaterPercentFill size={52} />
            <div className="flex flex-col">
               <h3>{humidity}%</h3>
               <h3>Humidity</h3>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <FaWind size={52} />
            <div className="flex flex-col">
               <h3>{windSpeed} km/h</h3>
               <h3>Wind speed</h3>
            </div>
         </div>
      </div>
  );
};

export default WeatherDetails;
