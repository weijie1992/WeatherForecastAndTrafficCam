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
        console.log('🚀 ~ TrafficweatherService ~ getTrafficWeatherData ~ trafficImageResponse:', trafficImageResponse);
        const weatherForecastApiService = await this.weatherForecastApiService.getData();
        console.log('🚀 ~ TrafficweatherService ~ getTrafficWeatherData ~ weatherForecastApiService:', weatherForecastApiService);
        return trafficImageResponse;
    }
};
exports.TrafficweatherService = TrafficweatherService;
exports.TrafficweatherService = TrafficweatherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [traffic_image_api_service_1.TrafficImageApiService,
        weather_forecast_api_service_1.WeatherForecastApiService])
], TrafficweatherService);
//# sourceMappingURL=trafficweather.service.js.map