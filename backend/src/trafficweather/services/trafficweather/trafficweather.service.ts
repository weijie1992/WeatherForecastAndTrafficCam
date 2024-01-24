import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrafficWeatherRequest } from 'src/trafficweather/dtos/TrafficWeatherRequest.dto';
import { TrafficImageApiService } from 'src/trafficweather/externalapis/traffic-image-api/traffic-image-api.service';
import { WeatherForecastApiService } from 'src/trafficweather/externalapis/weather-forecast-api/weather-forecast-api.service';
import {
  Camera,
  MapCameraList,
  TrafficImageApiResponse,
  TrafficweatherServiceResponse,
  MappedWeatherForecast,
  Results,
} from 'src/trafficweather/utils/types';

@Injectable()
export class TrafficweatherService {
  constructor(
    private readonly trafficImageApiService: TrafficImageApiService,
    private readonly weatherForecastApiService: WeatherForecastApiService,
  ) {}
  async getTrafficWeatherData(datetime: TrafficWeatherRequest) {
    const trafficImageResponse =
      await this.trafficImageApiService.getData(datetime);

    this.validateTrafficImageResponse(trafficImageResponse, datetime);

    const cameraList = this.mapCameraList(
      trafficImageResponse.items[0].cameras,
    );

    const coordinates1 = this.mapCameraCoordinates(cameraList);

    const weatherForecastResponse =
      await this.weatherForecastApiService.getData();

    const mappedWeatherForcast = this.mapWeatherForecast(
      weatherForecastResponse,
    );

    const filteredResults = this.filterResults(
      coordinates1,
      mappedWeatherForcast,
    );

    return filteredResults;
  }

  private validateTrafficImageResponse(
    trafficImageResponse: TrafficImageApiResponse,
    datetime: TrafficWeatherRequest,
  ): void {
    if (Object.keys(trafficImageResponse.items[0]).length === 0) {
      throw new HttpException(
        `No traffic images found given ${datetime}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapCameraList(cameraList: Camera[]): MapCameraList[] {
    return cameraList.map((item) => ({
      image: item.image,
      latitude: item.location.latitude.toFixed(2),
      longitude: item.location.longitude.toFixed(2),
    }));
  }

  private mapCameraCoordinates(
    cameraList: MapCameraList[],
  ): Map<string, string> {
    return new Map(
      cameraList.map((item) => [
        `${item.latitude},${item.longitude}`,
        item.image,
      ]),
    );
  }

  private mapWeatherForecast(
    weatherForecastResponse: TrafficweatherServiceResponse,
  ): MappedWeatherForecast[] {
    const mappedWeatherForcastMetaData = new Map(
      weatherForecastResponse.area_metadata.map((item) => [
        item.name,
        {
          latitude: item.label_location.latitude,
          longitude: item.label_location.longitude,
        },
      ]),
    );

    return weatherForecastResponse.items[0].forecasts.map((forecast) => ({
      area: forecast.area,
      forecast: forecast.forecast,
      latitude: mappedWeatherForcastMetaData
        .get(forecast.area)
        .latitude.toFixed(2),
      longitude: mappedWeatherForcastMetaData
        .get(forecast.area)
        .longitude.toFixed(2),
    }));
  }

  private filterResults(
    coordinates: Map<string, string>,
    weatherForecast: MappedWeatherForecast[],
  ): Results[] | null {
    return weatherForecast
      .map((item) => {
        if (coordinates.has(`${item.latitude},${item.longitude}`)) {
          return {
            ...item,
            image: coordinates.get(`${item.latitude},${item.longitude}`),
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);
  }
}
