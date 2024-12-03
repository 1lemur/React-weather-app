import { ReactNode } from "react";

interface WeatherMainDataProps {
  name: string;
  country: string;
  weatherMain: string;
  temperature: number;
  weatherIcon: ReactNode;
}

const WeatherMainData: React.FC<WeatherMainDataProps> = ({
  name,
  country,
  weatherMain,
  temperature,
  weatherIcon,
}) => {
  return (
   <div className="flex flex-col items-center gap-3 text-center">
      <h1>{name}</h1>
      <h2>{country}</h2>
      <span>{weatherIcon}</span>
      <h2>{Math.round(temperature)}°C</h2>
      <h2>{weatherMain}</h2>
   </div>
  );
};

export default WeatherMainData;
