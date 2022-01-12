import { Router } from "express";
import { weatherPostOne } from "../endpoint/weather";
import { auth } from "../middlewares/auth";
import { body } from "../utils/requestsValidations";
import { weatherPostBody } from "../validations/weather";

const router = Router();

/**
 * POST /weather
 * @tag Weather
 * @security BearerAuth
 * @bodyContent {WeatherPostBody} application/json
 * @response 201
 * @responseContent {WeatherPostResponse} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/weather", auth, body(weatherPostBody), weatherPostOne);

export default router;
