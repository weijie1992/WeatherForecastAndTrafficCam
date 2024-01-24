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
exports.WeatherForecastApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const api_1 = require("../../constants/api");
let WeatherForecastApiService = class WeatherForecastApiService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getData() {
        return (0, rxjs_1.firstValueFrom)(this.httpService.get(api_1.weatherForecastUrl).pipe((0, rxjs_1.map)((response) => response.data), (0, rxjs_1.catchError)((error) => {
            console.error(error);
            throw new common_1.HttpException(api_1.ERRORS.service, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        })));
    }
};
exports.WeatherForecastApiService = WeatherForecastApiService;
exports.WeatherForecastApiService = WeatherForecastApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], WeatherForecastApiService);
//# sourceMappingURL=weather-forecast-api.service.js.map