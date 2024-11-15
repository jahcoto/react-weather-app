import styles from "./App.module.css";
import Form from "./components/Form/Form";
import useWeather from "./hooks/useWeather";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";

function App() {
  const { weather, fetchWeather } = useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima...</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        <WeatherDetail weather={weather} />
      </div>
    </>
  );
}

export default App;
