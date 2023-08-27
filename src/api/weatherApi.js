import { request } from "src/utils";
import { WEATHER_API_URL } from "src/constants";

export function fetchWeatherApi(params) {
  return request({
    url: WEATHER_API_URL,
    method: "get",
    params,
  });
}
