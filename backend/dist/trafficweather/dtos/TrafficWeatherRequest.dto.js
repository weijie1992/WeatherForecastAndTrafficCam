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
exports.TrafficWeatherRequest = exports.IsDatetimeFormatConstraint = void 0;
const class_validator_1 = require("class-validator");
const DATETIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
let IsDatetimeFormatConstraint = class IsDatetimeFormatConstraint {
    validate(datetime, _validationArguments) {
        if (!DATETIME_REGEX.test(datetime)) {
            return false;
        }
        const currentDate = new Date();
        const inputDate = new Date(`${datetime}`);
        if (inputDate > currentDate) {
            return false;
        }
        return true;
    }
    defaultMessage(_validationArguments) {
        return 'Invalid datetime format or date must be less than or equal to today';
    }
};
exports.IsDatetimeFormatConstraint = IsDatetimeFormatConstraint;
exports.IsDatetimeFormatConstraint = IsDatetimeFormatConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isDatetimeFormat', async: false })
], IsDatetimeFormatConstraint);
class TrafficWeatherRequest {
}
exports.TrafficWeatherRequest = TrafficWeatherRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ each: false }),
    (0, class_validator_1.IsString)({ each: false }),
    (0, class_validator_1.Validate)(IsDatetimeFormatConstraint, { each: false }),
    __metadata("design:type", String)
], TrafficWeatherRequest.prototype, "datetime", void 0);
//# sourceMappingURL=TrafficWeatherRequest.dto.js.map