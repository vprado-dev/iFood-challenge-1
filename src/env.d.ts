declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "test" | "production" | "staging";
    PORT: string;
    API_NAME: string;
    API_TOKEN: string;
    OPEN_WEATHER_API_KEY: string;
    SPOTIFY_OAUTH_TOKEN: string;
  }
}
