import fetch from "node-fetch";
import { endpoint } from "../functions/endpoint";
import { HttpError } from "../utils/httpError";
interface fetchOpenWeatherProps {
  lat?: number;
  lon?: number;
  cityName?: number;
}

const fetchOpenWeather = async ({
  lat,
  lon,
  cityName,
}: fetchOpenWeatherProps) => {
  const openWeatherUrl = new URL(
    "http://api.openweathermap.org/data/2.5/weather",
  );

  const searchParams = openWeatherUrl.searchParams;

  if (cityName) {
    searchParams.append("q", `${cityName}`);
  } else {
    searchParams.append("lat", `${lat}`);
    searchParams.append("lon", `${lon}`);
  }

  searchParams.append("appid", process.env.OPEN_WEATHER_API_KEY);

  const openWeatherResponse = await fetch(openWeatherUrl.toString(), {
    method: "GET",
  });

  const openWeatherJson = await openWeatherResponse.json();

  if (openWeatherResponse.status != 200) {
    throw new HttpError(openWeatherResponse.status, openWeatherJson.message);
  }

  return openWeatherJson;
};

const fetchSpotify = async (musicGenre: string) => {
  const spotifyUrl = new URL("https://api.spotify.com/v1/recommendations");

  spotifyUrl.searchParams.append("seed_genres", musicGenre);
  spotifyUrl.searchParams.append("limit", `${10}`);

  const spotifyResponse = await fetch(spotifyUrl.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SPOTIFY_OAUTH_TOKEN}`,
    },
  });

  const spotifyJson = await spotifyResponse.json();

  if (spotifyResponse.status != 200) {
    throw new HttpError(
      spotifyResponse.status,
      JSON.stringify(spotifyJson, null, 2),
    );
  }

  return spotifyJson;
};

export const weatherPostOne = endpoint(async (req, res) => {
  const { lat, lon } = req.body;

  const { main, name } = await fetchOpenWeather({ lat, lon });

  const celsiusTemp = Number((main.temp - 273).toFixed(2));

  let musicGenre: string;

  if (celsiusTemp > 30) {
    musicGenre = "party";
  } else if (celsiusTemp >= 15 && celsiusTemp <= 30) {
    musicGenre = "pop";
  } else if (celsiusTemp < 15 && celsiusTemp >= 10) {
    musicGenre = "rock";
  } else {
    musicGenre = "classical";
  }

  const { tracks } = await fetchSpotify(musicGenre);

  const tracksNames = tracks.map((track: any) => track.name);

  res.status(200).json({
    cityName: name,
    temperature: `${celsiusTemp}`,
    genre: musicGenre,
    tracks: tracksNames,
  });
});

export const weatherGetOne = endpoint(async (req, res) => {
  const { cityName } = req.query as any;

  const { main, name } = await fetchOpenWeather({ cityName });

  const celsiusTemp = Number((main.temp - 273).toFixed(2));

  let musicGenre: string;

  if (celsiusTemp > 30) {
    musicGenre = "party";
  } else if (celsiusTemp >= 15 && celsiusTemp <= 30) {
    musicGenre = "pop";
  } else if (celsiusTemp < 15 && celsiusTemp >= 10) {
    musicGenre = "rock";
  } else {
    musicGenre = "classical";
  }

  const { tracks } = await fetchSpotify(musicGenre);

  const tracksNames = tracks.map((track: any) => track.name);

  res.status(200).json({
    cityName: name,
    temperature: `${celsiusTemp}`,
    genre: musicGenre,
    tracks: tracksNames,
  });
});
