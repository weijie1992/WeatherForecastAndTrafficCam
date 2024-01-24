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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficweatherController = void 0;
const common_1 = require("@nestjs/common");
const TrafficWeatherRequest_dto_1 = require("../../dtos/TrafficWeatherRequest.dto");
const trafficweather_service_1 = require("../../services/trafficweather/trafficweather.service");
let TrafficweatherController = class TrafficweatherController {
    constructor(trafficWeatherService) {
        this.trafficWeatherService = trafficWeatherService;
    }
    async getTrafficWeather(params) {
        return await this.trafficWeatherService.getTrafficWeatherData(params);
    }
};
exports.TrafficweatherController = TrafficweatherController;
__decorate([
    (0, common_1.Get)(':datetime'),
    __param(0, (0, common_1.Param)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TrafficWeatherRequest_dto_1.TrafficWeatherRequest]),
    __metadata("design:returntype", Promise)
], TrafficweatherController.prototype, "getTrafficWeather", null);
exports.TrafficweatherController = TrafficweatherController = __decorate([
    (0, common_1.Controller)('trafficweather'),
    __metadata("design:paramtypes", [trafficweather_service_1.TrafficweatherService])
], TrafficweatherController);
//# sourceMappingURL=trafficweather.controller.js.map