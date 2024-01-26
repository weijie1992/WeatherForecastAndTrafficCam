import { Test, TestingModule } from '@nestjs/testing';
import { WeatherForecastApiService } from './weather-forecast-api.service';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { throwError } from 'rxjs';
import { of } from 'rxjs';
import { ERRORS, weatherForecastUrl } from 'src/trafficweather/constants/api';
import { TrafficweatherServiceResponse } from 'src/trafficweather/utils/types';

describe('WeatherForecastApiService', () => {
  let service: WeatherForecastApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherForecastApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherForecastApiService>(WeatherForecastApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getData', () => {
    it('should return weather forecast data', async () => {
      const mockResponse: AxiosResponse<TrafficweatherServiceResponse> =
        {} as AxiosResponse<TrafficweatherServiceResponse>;

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

      const result = await service.getData();

      expect(httpService.get).toHaveBeenCalledWith(weatherForecastUrl);
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw HttpException on API error', async () => {
      const mockError: AxiosError = {} as AxiosError;

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(() => mockError));

      await expect(async () => await service.getData()).rejects.toThrow(
        new HttpException(ERRORS.service, HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });
});
