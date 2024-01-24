import { Test, TestingModule } from '@nestjs/testing';
import { WeatherForecastApiService } from './weather-forecast-api.service';

describe('WeatherForecastApiService', () => {
  let service: WeatherForecastApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherForecastApiService],
    }).compile();

    service = module.get<WeatherForecastApiService>(WeatherForecastApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
