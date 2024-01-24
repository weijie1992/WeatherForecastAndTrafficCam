import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
import { TrafficweatherService } from 'src/trafficweather/services/trafficweather/trafficweather.service';

@Controller('trafficweather')
export class TrafficweatherController {
  constructor(private readonly trafficWeatherService: TrafficweatherService) {}
  @Get(':datetime')
  async getTrafficWeather(
    @Param(ValidationPipe) params: TrafficWeatherRequest,
  ) {
    console.log(
      '🚀 ~ TrafficweatherController ~ getTrafficWeather ~ params:',
      params,
    );
    const result =
      await this.trafficWeatherService.getTrafficWeatherData(params);
    return result;
  }
}
