import { HttpService } from '@nestjs/axios';
import { TrafficweatherServiceResponse } from 'src/trafficweather/utils/types';
export declare class WeatherForecastApiService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getData(): Promise<TrafficweatherServiceResponse>;
}
