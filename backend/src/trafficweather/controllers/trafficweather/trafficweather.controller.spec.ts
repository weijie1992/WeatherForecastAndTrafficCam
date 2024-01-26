import { Test, TestingModule } from '@nestjs/testing';
import { TrafficweatherController } from 'src/trafficweather/controllers/trafficweather/trafficweather.controller';
import { TrafficweatherService } from 'src/trafficweather/services/trafficweather/trafficweather.service';
import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
import { TrafficImageApiService } from 'src/trafficweather/externalapis/traffic-image-api/traffic-image-api.service';
import { WeatherForecastApiService } from 'src/trafficweather/externalapis/weather-forecast-api/weather-forecast-api.service';
import { HttpModule } from '@nestjs/axios';
describe('TrafficweatherController', () => {
  let controller: TrafficweatherController;
  let service: TrafficweatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [TrafficweatherController],
      providers: [
        TrafficweatherService,
        TrafficImageApiService,
        WeatherForecastApiService,
      ],
    }).compile();

    controller = module.get<TrafficweatherController>(TrafficweatherController);
    service = module.get<TrafficweatherService>(TrafficweatherService);
  });

  describe('getTrafficWeather', () => {
    it('should call getTrafficWeatherData with the correct parameters', async () => {
      const mockTrafficWeatherRequest: TrafficWeatherRequest = {
        datetime: '2022-01-23T12:00:00',
      };

      const mockResponse = [
        {
          area: 'mock',
          forecast: 'mock',
          latitude: 'mock',
          longitude: 'mock',
          image: 'mock',
        },
      ];

      jest
        .spyOn(service, 'getTrafficWeatherData')
        .mockResolvedValue(mockResponse);

      const result = await controller.getTrafficWeather(
        mockTrafficWeatherRequest,
      );

      expect(service.getTrafficWeatherData).toHaveBeenCalledWith(
        mockTrafficWeatherRequest,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
