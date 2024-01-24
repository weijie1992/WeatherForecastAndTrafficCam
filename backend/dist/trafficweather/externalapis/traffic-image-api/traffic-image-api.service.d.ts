import { HttpService } from '@nestjs/axios';
import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
import { TrafficImageApiResponse } from 'src/trafficweather/utils/types';
export declare class TrafficImageApiService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getData(params: TrafficWeatherRequest): Promise<TrafficImageApiResponse>;
}
