import { Injectable } from '@nestjs/common';
import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
import { TrafficImageApiService } from 'src/trafficweather/externalapis/traffic-image-api/traffic-image-api.service';
import { WeatherForecastApiService } from 'src/trafficweather/externalapis/weather-forecast-api/weather-forecast-api.service';

@Injectable()
export class TrafficweatherService {
  constructor(
    private readonly trafficImageApiService: TrafficImageApiService,
    private readonly weatherForecastApiService: WeatherForecastApiService,
  ) {}
  async getTrafficWeatherData(datetime: TrafficWeatherRequest): Promise<any> {
    const trafficImageResponse =
      await this.trafficImageApiService.getData(datetime);
    console.log(
      '🚀 ~ TrafficweatherService ~ getTrafficWeatherData ~ trafficImageResponse:',
      trafficImageResponse,
    );

    const weatherForecastApiService =
      await this.weatherForecastApiService.getData();
    console.log(
      '🚀 ~ TrafficweatherService ~ getTrafficWeatherData ~ weatherForecastApiService:',
      weatherForecastApiService,
    );
    return trafficImageResponse;
  }
}
