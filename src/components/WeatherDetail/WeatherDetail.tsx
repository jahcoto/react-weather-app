import { WeatherSchema } from "../../hooks/useWeather";

type WeatherDetailProps = {
  weather: WeatherSchema;
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div>
      <h2>Clima de:</h2>
    </div>
  );
}
