import { DateValidationError, TimeValidationError } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

export type Results = {
  area: string;
  forecast: string;
  latitude: string;
  longitude: string;
  image: string;
};

export type ShowApiErrorSnack = {
  open: boolean;
  errorMessage: string;
};

export type AxiosErrorMessage = {
  message: string;
};

export type BasicDatePickerType = {
  selectedDate: Dayjs;
  handleDateChange: (date: Dayjs) => void;
  dateErrorMessage: string;
  setDateError: (error: DateValidationError) => void;
};

export type BasicTimePickerTypes = {
  selectedTime: Dayjs | null;
  handleTimeChange: (value: Dayjs) => void;
  timeErrorMessage: string;
  setTimeError: (error: TimeValidationError) => void;
};

export type ShowApiErrorSnackComponent = {
  setShowApiErrorSnack: (
    updater: (prev: ShowApiErrorSnack | undefined) => ShowApiErrorSnack
  ) => void;
  showApiErrorSnack: ShowApiErrorSnack;
};
