import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
import { TrafficImageApiService } from 'src/trafficweather/externalapis/traffic-image-api/traffic-image-api.service';
import { WeatherForecastApiService } from 'src/trafficweather/externalapis/weather-forecast-api/weather-forecast-api.service';
export declare class TrafficweatherService {
    private readonly trafficImageApiService;
    private readonly weatherForecastApiService;
    constructor(trafficImageApiService: TrafficImageApiService, weatherForecastApiService: WeatherForecastApiService);
    getTrafficWeatherData(datetime: TrafficWeatherRequest): Promise<any>;
}
