import {
  Box,
  Button,
  Card,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import BasicDatePicker from "./components/BasicDatePicker";
import BasicTimePicker from "./components/BasicTimePicker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import backendApi from "./api/backend-api";
function App() {
  // const [trafficData, useTrafficData] = useState([]);
  // const [date, setDate] = useState('')
  const [searchResults, setSearchResults] = useState([]); //TODO Typed this
  const [selectedResult, setSelectedResult] = useState({});
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time: Dayjs | null) => {
    setSelectedTime(time);
  };
  const handleSearch = async () => {
    const date = selectedDate?.isValid && selectedDate.format("YYYY-MM-DD");
    const time = selectedTime?.isValid && selectedTime.format("HH:mm:ss");
    console.log("🚀 ~ handleSearch ~ date:", date);
    console.log("🚀 ~ handleSearch ~ time:", time);
    //TODO handle error
    try {
      if (date && time) {
        // const res = await backendApi.trafficImages(date, time);
        const res = await backendApi.trafficImages(date, time);
        console.log("🚀 ~ handleSearch ~ res:", res);
        setSearchResults(res);
      }
      //TODO set error if date && time MISSING
    } catch (err) {
      //TODO set error if date && time not valid
      console.log("🚀 ~ handleSearch ~ err:", err);
    }
  };
  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100vh" mt={2}>
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
            />
          </Box>
          <Box>
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>
        </Box>
        <Box
          sx={{ border: ".05px solid #2f3b44", flex: "3 0 37.5%" }}
          display="flex"
          height="100%"
          gap={5}
        >
          <Box sx={{ flex: 2 / 3 }}>
            <List>
              {searchResults.map((result) => (
                <ListItem key={result.area}>
                  <ListItemButton
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
          <Box sx={{ flex: 1 / 3 }}>
            {Object.keys(selectedResult).length === 0
              ? "Please select a item to view"
              : `The 2 hour weather forecast is ${selectedResult.forecast}`}
          </Box>
        </Box>
        <Box sx={{ border: ".05px solid #2f3b44", flex: "4 0 50%" }}>
          {Object.keys(selectedResult).length && (
            <Card>
              <img src={selectedResult.image} alt="screenshot" />
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
