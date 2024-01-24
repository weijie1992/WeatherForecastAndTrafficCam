import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { trafficImageUrl } from 'src/trafficweather/constants/api';
import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
import { catchError } from 'rxjs';

@Injectable()
export class TrafficImageApiService {
  constructor(private readonly httpService: HttpService) {}
  async getData(datetime: TrafficWeatherRequest): Promise<any> {
    console.log('🚀 ~ TrafficImageApiService ~ getData ~ datetime:', datetime);
    console.log(`${trafficImageUrl}?date_time=${datetime}`);
    // this.httpService.get;
    const response = await this.httpService
      .get(`${trafficImageUrl}?date_time=${datetime}`)
      .pipe(
        catchError((error: AxiosError) => {
          console.log(
            '🚀 ~ TrafficImageApiService ~ catchError ~ error:',
            error,
          );

          throw error;
        }),
      );
    console.log('🚀 ~ TrafficImageApiService ~ getData ~ response:', response);

    return response;
  }
}
