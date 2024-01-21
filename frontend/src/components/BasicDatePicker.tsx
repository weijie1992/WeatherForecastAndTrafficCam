import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

type BasicDatePickerType = {
  selectedDate: Dayjs | null;
  handleDateChange: (date: Dayjs | null) => void;
};
export default function BasicDatePicker({
  selectedDate,
  handleDateChange,
}: BasicDatePickerType) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        sx={{ width: "100%" }}
        value={selectedDate}
        onChange={(newValue) => handleDateChange(newValue)}
      />
    </LocalizationProvider>
  );
}
