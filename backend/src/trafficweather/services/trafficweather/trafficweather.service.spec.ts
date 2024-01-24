import { Test, TestingModule } from '@nestjs/testing';
import { TrafficweatherService } from './trafficweather.service';

describe('TrafficweatherService', () => {
  let service: TrafficweatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrafficweatherService],
    }).compile();

    service = module.get<TrafficweatherService>(TrafficweatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
