import { HttpService } from '@nestjs/axios';
import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
export declare class TrafficImageApiService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getData(datetime: TrafficWeatherRequest): Promise<any>;
}
