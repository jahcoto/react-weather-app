import axios from "axios";
import { z } from "zod";
// import { object, string, number, InferInput, parse } from "valibot";
import { SearchType } from "../types";
import { useState } from "react";

//Tipear datos de API con ZOD
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

export type WeatherSchema = z.infer<typeof Weather>;

//Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// });

// type WeatherType = InferInput<typeof WeatherSchema>;

export default function useWeather<WeatherSchema>() {
  const [weather, setWeather] = useState({
    name: "",
    main: {
      temp: "",
      temp_max: "",
      temp_min: "",
    },
  });
  const fetchWeather = async (search: SearchType) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;
      const { data: geoData } = await axios(geoUrl);
      const lat = geoData[0].lat;
      const lon = geoData[0].lon;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const { data: weatherData } = await axios(weatherUrl);
      //ZOD
      const result = Weather.safeParse(weatherData);
      if (result.success) {
        setWeather(result.data);
      }

      //Valibot
      //   const result = parse(WeatherSchema, weatherData);
      //   if (result) {
      //     console.log(result.name);
      //   }
    } catch (error) {
      console.log(error);
    }
  };
  return { weather, fetchWeather };
}
