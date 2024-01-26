import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { TrafficImageApiService } from 'src/trafficweather/externalapis/traffic-image-api/traffic-image-api.service';
import { AxiosResponse, AxiosError } from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { ERRORS, trafficImageUrl } from 'src/trafficweather/constants/api';
import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
import { TrafficImageApiResponse } from 'src/trafficweather/utils/types';

describe('TrafficImageApiService', () => {
  let service: TrafficImageApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrafficImageApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TrafficImageApiService>(TrafficImageApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should retrieve data successfully', async () => {
    const mockTrafficWeatherRequest: TrafficWeatherRequest = {
      datetime: '2022-01-23T12:00:00',
    };

    const mockApiResponse: AxiosResponse<TrafficImageApiResponse> =
      {} as AxiosResponse<TrafficImageApiResponse>;

    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockApiResponse));

    const result = await service.getData(mockTrafficWeatherRequest);

    expect(httpService.get).toHaveBeenCalledWith(
      `${trafficImageUrl}?date_time=${mockTrafficWeatherRequest.datetime}`,
    );
    expect(result).toEqual(mockApiResponse.data);
  });

  it('should handle HTTP error', async () => {
    const mockTrafficWeatherRequest: TrafficWeatherRequest = {
      datetime: '2022-01-23T12:00:00',
    };

    const mockError: AxiosError = {} as AxiosError;

    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(() => mockError));

    await expect(
      async () => await service.getData(mockTrafficWeatherRequest),
    ).rejects.toThrow(
      new HttpException(ERRORS.service, HttpStatus.INTERNAL_SERVER_ERROR),
    );

    expect(httpService.get).toHaveBeenCalledWith(
      `${trafficImageUrl}?date_time=${mockTrafficWeatherRequest.datetime}`,
    );
  });
});
