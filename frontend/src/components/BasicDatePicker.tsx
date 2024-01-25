import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DateValidationError } from "@mui/x-date-pickers";

type BasicDatePickerType = {
  selectedDate: Dayjs;
  handleDateChange: (date: Dayjs) => void;
  dateErrorMessage: string;
  setDateError: (error: DateValidationError) => void;
};

const maxDate = dayjs();
const tenYearsAgo = dayjs().subtract(10, "year");

export default function BasicDatePicker({
  selectedDate,
  handleDateChange,
  dateErrorMessage,
  setDateError,
}: BasicDatePickerType) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        sx={{ width: "100%" }}
        minDate={tenYearsAgo}
        maxDate={maxDate}
        onError={(newError) => setDateError(newError)}
        slotProps={{
          textField: {
            helperText: dateErrorMessage,
          },
        }}
        value={selectedDate}
        onChange={(newValue) => newValue && handleDateChange(newValue)}
      />
    </LocalizationProvider>
  );
}
