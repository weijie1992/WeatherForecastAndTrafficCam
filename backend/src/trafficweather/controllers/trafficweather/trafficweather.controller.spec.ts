import { Test, TestingModule } from '@nestjs/testing';
import { TrafficweatherController } from './trafficweather.controller';

describe('TrafficweatherController', () => {
  let controller: TrafficweatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrafficweatherController],
    }).compile();

    controller = module.get<TrafficweatherController>(TrafficweatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
