import { Router } from "express";
import { weatherGetOne, weatherPostOne } from "../endpoint/weather";
import { auth } from "../middlewares/auth";
import { body, query } from "../utils/requestsValidations";
import { weatherGetOneParams, weatherPostBody } from "../validations/weather";

const router = Router();

/**
 * POST /weather
 * @tag Weather
 * @security BearerAuth
 * @bodyContent {WeatherPostBody} application/json
 * @response 201
 * @responseContent {Weather} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/weather", auth, body(weatherPostBody), weatherPostOne);

/**
 * GET /weather
 * @tag Weather
 * @security BearerAuth
 * @response 200
 * @queryParam {string} [cityName]
 * @responseContent {Weather} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get("/weather", auth, query(weatherGetOneParams), weatherGetOne);

export default router;
