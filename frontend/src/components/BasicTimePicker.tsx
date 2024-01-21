import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";

type BasicTimePickerTypes = {
  selectedTime: Dayjs | null;
  handleTimeChange: (value: Dayjs | null) => void;
};
export default function BasicTimePicker({
  selectedTime,
  handleTimeChange,
}: BasicTimePickerTypes) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Basic time picker"
        sx={{ width: "100%" }}
        value={selectedTime}
        onChange={(newValue) => handleTimeChange(newValue)}
      />
    </LocalizationProvider>
  );
}
