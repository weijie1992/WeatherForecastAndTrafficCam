import { Module } from '@nestjs/common';
import { TrafficweatherController } from './controllers/trafficweather/trafficweather.controller';
import { TrafficweatherService } from './services/trafficweather/trafficweather.service';

import { TrafficImageApiService } from './externalapis/traffic-image-api/traffic-image-api.service';
import { WeatherForecastApiService } from './externalapis/weather-forecast-api/weather-forecast-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TrafficweatherController],
  providers: [
    TrafficweatherService,
    TrafficImageApiService,
    WeatherForecastApiService,
  ],
})
export class TrafficweatherModule {}
