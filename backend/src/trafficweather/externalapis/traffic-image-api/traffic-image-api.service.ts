import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { map, catchError, firstValueFrom } from 'rxjs';
import { ERRORS, trafficImageUrl } from 'src/trafficweather/constants/api';
import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
import { TrafficImageApiResponse } from 'src/trafficweather/utils/types';
@Injectable()
export class TrafficImageApiService {
  constructor(private readonly httpService: HttpService) {}
  async getData(
    params: TrafficWeatherRequest,
  ): Promise<TrafficImageApiResponse> {
    return firstValueFrom(
      this.httpService
        .get(`${trafficImageUrl}?date_time=${params.datetime}`)
        .pipe(
          map(
            (response: AxiosResponse<TrafficImageApiResponse>) => response.data,
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
