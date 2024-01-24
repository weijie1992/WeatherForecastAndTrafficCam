import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { ERRORS, weatherForecastUrl } from 'src/trafficweather/constants/api';
import { TrafficweatherServiceResponse } from 'src/trafficweather/utils/types';

@Injectable()
export class WeatherForecastApiService {
  constructor(private readonly httpService: HttpService) {}
  async getData(): Promise<TrafficweatherServiceResponse> {
    return firstValueFrom(
      this.httpService.get(weatherForecastUrl).pipe(
        map(
          (response: AxiosResponse<TrafficweatherServiceResponse>) =>
            response.data,
        ),
        catchError((error: AxiosError) => {
          console.error(error);
          throw new HttpException(
            ERRORS.service,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );
  }
}
