import Keys from '../../keys'
import axios from 'axios';

const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${Keys.forecastKey}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(cityName){

    const url = `${ROOT_URL}&q=${cityName},us`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload : request
    }
}
