import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
import { TrafficweatherService } from 'src/trafficweather/services/trafficweather/trafficweather.service';
export declare class TrafficweatherController {
    private readonly trafficWeatherService;
    constructor(trafficWeatherService: TrafficweatherService);
    getTrafficWeather(params: TrafficWeatherRequest): Promise<import("../../utils/types").Results[]>;
}
