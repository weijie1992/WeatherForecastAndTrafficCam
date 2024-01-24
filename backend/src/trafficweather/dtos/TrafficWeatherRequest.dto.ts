import {
  IsNotEmpty,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const DATETIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

@ValidatorConstraint({ name: 'isDatetimeFormat', async: false })
export class IsDatetimeFormatConstraint
  implements ValidatorConstraintInterface
{
  validate(
    datetime: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _validationArguments?: ValidationArguments,
  ): boolean {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_validationArguments?: ValidationArguments): string {
    return 'Invalid datetime format or date must be less than or equal to today';
  }
}
export class TrafficWeatherRequest {
  @IsNotEmpty({ each: false })
  @IsString({ each: false })
  @Validate(IsDatetimeFormatConstraint, { each: false })
  datetime: string;
}
