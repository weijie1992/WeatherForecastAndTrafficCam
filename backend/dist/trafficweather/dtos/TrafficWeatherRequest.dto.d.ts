import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsDatetimeFormatConstraint implements ValidatorConstraintInterface {
    validate(datetime: string, _validationArguments?: ValidationArguments): boolean;
    defaultMessage(_validationArguments?: ValidationArguments): string;
}
export declare class TrafficWeatherRequest {
    datetime: string;
}
