import { Test, TestingModule } from '@nestjs/testing';
import { TrafficImageApiService } from './traffic-image-api.service';

describe('TrafficImageApiService', () => {
  let service: TrafficImageApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrafficImageApiService],
    }).compile();

    service = module.get<TrafficImageApiService>(TrafficImageApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
