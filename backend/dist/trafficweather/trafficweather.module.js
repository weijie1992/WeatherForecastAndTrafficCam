"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficweatherModule = void 0;
const common_1 = require("@nestjs/common");
const trafficweather_controller_1 = require("./controllers/trafficweather/trafficweather.controller");
const trafficweather_service_1 = require("./services/trafficweather/trafficweather.service");
const traffic_image_api_service_1 = require("./externalapis/traffic-image-api/traffic-image-api.service");
const weather_forecast_api_service_1 = require("./externalapis/weather-forecast-api/weather-forecast-api.service");
const axios_1 = require("@nestjs/axios");
let TrafficweatherModule = class TrafficweatherModule {
};
exports.TrafficweatherModule = TrafficweatherModule;
exports.TrafficweatherModule = TrafficweatherModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [trafficweather_controller_1.TrafficweatherController],
        providers: [
            trafficweather_service_1.TrafficweatherService,
            traffic_image_api_service_1.TrafficImageApiService,
            weather_forecast_api_service_1.WeatherForecastApiService,
        ],
    })
], TrafficweatherModule);
//# sourceMappingURL=trafficweather.module.js.map