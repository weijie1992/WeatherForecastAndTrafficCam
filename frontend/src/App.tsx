import {
  Box,
  Button,
  Card,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import BasicDatePicker from "./components/BasicDatePicker";
import BasicTimePicker from "./components/BasicTimePicker";
import { useState, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import backendApi from "./api/backend-api";
import { AxiosErrorMessage, Results, ShowApiErrorSnack } from "./utils/types";
import { DateValidationError, TimeValidationError } from "@mui/x-date-pickers";
import CustomAlert from "./components/CustomAlert";
import axios, { AxiosError } from "axios";

function App() {
  const [searchResults, setSearchResults] = useState<Results[]>([]);
  const [selectedResult, setSelectedResult] = useState<Results | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTime, setSelectedTime] = useState<Dayjs>(dayjs());
  const [dateError, setDateError] = useState<DateValidationError | null>(null);
  const [timeError, setTimeError] = useState<TimeValidationError | null>(null);
  const [showApiErrorSnack, setShowApiErrorSnack] = useState<ShowApiErrorSnack>(
    {
      open: false,
      errorMessage: "",
    }
  );
  const dateErrorMessage = useMemo(() => {
    switch (dateError) {
      case "maxDate":
      case "minDate": {
        return "Please Select date between today to last 10 years";
      }
      case "invalidDate": {
        return "Your date is not valid";
      }
      default: {
        return "";
      }
    }
  }, [dateError]);

  const timeErrorMessage = useMemo(() => {
    switch (timeError) {
      case "invalidDate": {
        return "Your time is not valid";
      }
      default: {
        return "";
      }
    }
  }, [timeError]);

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time: Dayjs) => {
    setSelectedTime(time);
  };
  const handleSearchReset = () => {
    setSearchResults([]);
    setSelectedResult(null);
  };
  const handleSearch = async () => {
    if (!dateError && !timeError) {
      handleSearchReset();
      const date = selectedDate.format("YYYY-MM-DD");
      const time = selectedTime.format("HH:mm:ss");
      try {
        const res = await backendApi.trafficImages(date, time);
        setSearchResults(res);
      } catch (err: unknown) {
        if (axios.isAxiosError<AxiosErrorMessage>(err)) {
          const axiosError = err as AxiosError<AxiosErrorMessage>;
          setShowApiErrorSnack((prevState) => ({
            ...prevState,
            open: true,
            errorMessage:
              axiosError?.response?.data?.message || axiosError.message,
          }));
        }
      }
    }
  };
  return (
    <>
      <Box display="flex" justifyContent="center">
        <CustomAlert
          setShowApiErrorSnack={setShowApiErrorSnack}
          showApiErrorSnack={showApiErrorSnack}
        />
      </Box>

      <Container>
        <Box display="flex" flexDirection="column" height="100vh" mt={3}>
          <Box
            display="flex"
            gap={5}
            sx={{ flex: "1 0 12.5%" }}
            alignItems="center"
          >
            <Box sx={{ flex: 1 / 3, minWidth: 0 }}>
              <BasicDatePicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
                dateErrorMessage={dateErrorMessage}
                setDateError={setDateError}
              />
            </Box>
            <Box
              sx={{
                flex: 1 / 3,
                minWidth: 0,
              }}
            >
              <BasicTimePicker
                selectedTime={selectedTime}
                handleTimeChange={handleTimeChange}
                timeErrorMessage={timeErrorMessage}
                setTimeError={setTimeError}
              />
            </Box>
            <Box>
              <Button variant="contained" onClick={handleSearch}>
                Search
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              border: ".05px solid #2f3b44",
              flex: "3 0 37.5%",
              overflow: "auto",
              maxHeight: "100%",
            }}
            display="flex"
            height="100%"
            gap={5}
          >
            <Box sx={{ flex: 2 / 3, overflow: "auto", maxHeight: "100%" }}>
              <List>
                {searchResults.map((result) => (
                  <ListItem key={result.area}>
                    <ListItemButton
                      selected={selectedResult?.area === result.area}
                      onClick={() => {
                        setSelectedResult(result);
                      }}
                    >
                      <ListItemText>{result.area}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box
              display="flex"
              sx={{
                flex: 1 / 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {searchResults.length === 0 ? (
                <Typography variant="h6">
                  Select a Date and Time and click on the Search button
                </Typography>
              ) : !selectedResult ? (
                <Typography variant="h6">
                  Select an item in the left list
                </Typography>
              ) : (
                <Typography variant="h6">
                  {`The 2 hour weather forecast is as at current time ${dayjs()} is `}
                  <strong>{selectedResult.forecast}</strong>
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ border: ".05px solid #2f3b44", flex: "4 0 50%" }}>
            {selectedResult && (
              <Card>
                <img
                  src={selectedResult.image}
                  alt="screenshot"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Card>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
