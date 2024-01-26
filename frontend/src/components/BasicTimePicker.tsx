import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { BasicTimePickerTypes } from "../utils/types";

export default function BasicTimePicker({
  selectedTime,
  handleTimeChange,
  timeErrorMessage,
  setTimeError,
}: BasicTimePickerTypes) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Time"
        sx={{ width: "100%" }}
        value={selectedTime}
        onChange={(newValue) => newValue && handleTimeChange(newValue)}
        onError={(newError) => setTimeError(newError)}
        slotProps={{
          textField: {
            helperText: timeErrorMessage,
          },
        }}
      />
    </LocalizationProvider>
  );
}
