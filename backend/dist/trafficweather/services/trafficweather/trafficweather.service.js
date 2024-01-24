"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficweatherService = void 0;
const common_1 = require("@nestjs/common");
const traffic_image_api_service_1 = require("../../externalapis/traffic-image-api/traffic-image-api.service");
const weather_forecast_api_service_1 = require("../../externalapis/weather-forecast-api/weather-forecast-api.service");
let TrafficweatherService = class TrafficweatherService {
    constructor(trafficImageApiService, weatherForecastApiService) {
        this.trafficImageApiService = trafficImageApiService;
        this.weatherForecastApiService = weatherForecastApiService;
    }
    async getTrafficWeatherData(datetime) {
        const trafficImageResponse = await this.trafficImageApiService.getData(datetime);
        this.validateTrafficImageResponse(trafficImageResponse, datetime);
        const cameraList = this.mapCameraList(trafficImageResponse.items[0].cameras);
        const coordinates1 = this.mapCameraCoordinates(cameraList);
        const weatherForecastResponse = await this.weatherForecastApiService.getData();
        const mappedWeatherForcast = this.mapWeatherForecast(weatherForecastResponse);
        const filteredResults = this.filterResults(coordinates1, mappedWeatherForcast);
        return filteredResults;
    }
    validateTrafficImageResponse(trafficImageResponse, datetime) {
        if (Object.keys(trafficImageResponse.items[0]).length === 0) {
            throw new common_1.HttpException(`No traffic images found given ${datetime}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    mapCameraList(cameraList) {
        return cameraList.map((item) => ({
            image: item.image,
            latitude: item.location.latitude.toFixed(2),
            longitude: item.location.longitude.toFixed(2),
        }));
    }
    mapCameraCoordinates(cameraList) {
        return new Map(cameraList.map((item) => [
            `${item.latitude},${item.longitude}`,
            item.image,
        ]));
    }
    mapWeatherForecast(weatherForecastResponse) {
        const mappedWeatherForcastMetaData = new Map(weatherForecastResponse.area_metadata.map((item) => [
            item.name,
            {
                latitude: item.label_location.latitude,
                longitude: item.label_location.longitude,
            },
        ]));
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
    filterResults(coordinates, weatherForecast) {
        return weatherForecast
            .map((item) => {
            if (coordinates.has(`${item.latitude},${item.longitude}`)) {
                return {
                    ...item,
                    image: coordinates.get(`${item.latitude},${item.longitude}`),
                };
            }
            else {
                return null;
            }
        })
            .filter(Boolean);
    }
};
exports.TrafficweatherService = TrafficweatherService;
exports.TrafficweatherService = TrafficweatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [traffic_image_api_service_1.TrafficImageApiService,
        weather_forecast_api_service_1.WeatherForecastApiService])
], TrafficweatherService);
//# sourceMappingURL=trafficweather.service.js.map