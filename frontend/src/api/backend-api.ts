import axios from "axios";
import { endpoint } from "../constants/api";

//TODO: change to backend, add validation here as well before hitting api
const trafficImages = async (date: string, time: string) => {
  //TODO validation first, throw error

  try {
    const dateTime = `${date}T${time}`;
    // const dateTime = "2024-01-22T11:11:11";
    console.log(`${endpoint}?date_time=${dateTime}`);
    //TODO check on typing
    const res = await axios.get(`${endpoint}?date_time=${dateTime}`);
    console.log("🚀 ~ trafficImages ~ res:", res.data.items[0]);
    if (Object.keys(res.data.items[0])) {
      //TODO throw 400 error check in nest
      console.log("empty object");
    }
    const cameraList = res.data.items[0].cameras;
    const mapCameraList = cameraList.map((item) => ({
      image: item.image,
      latitude: item.location.latitude.toFixed(2),
      longitude: item.location.longitude.toFixed(2),
    }));
    console.log("🚀 ~ latLongList ~ latLongList:", mapCameraList);

    // Create a map of coordinates to images from arr1
    const coordinates1 = new Map(
      mapCameraList.map((item) => [
        `${item.latitude},${item.longitude}`,
        item.image,
      ])
    );
    console.log("🚀 ~ trafficImages ~ coordinates1:", coordinates1);
    //fetch data from 2hour weather forecast
    const { data: weatherForcastData } = await axios.get(
      "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
    );
    console.log("🚀 ~ trafficImages ~ data:", weatherForcastData);
    const mappedWeatherForcastMetaData = new Map(
      weatherForcastData.area_metadata.map((item) => [
        item.name,
        {
          latitude: item.label_location.latitude,
          longitude: item.label_location.longitude,
        },
      ])
    );
    console.log(
      "🚀 ~ trafficImages ~ mappedWeatherForcastData:",
      mappedWeatherForcastMetaData
    );

    const mappedWeatherForcast = weatherForcastData.items[0].forecasts.map(
      (forecast) => ({
        area: forecast.area,
        forecast: forecast.forecast,
        latitude: mappedWeatherForcastMetaData
          .get(forecast.area)
          .latitude.toFixed(2),
        longitude: mappedWeatherForcastMetaData
          .get(forecast.area)
          .longitude.toFixed(2),
      })
    );
    console.log(
      "🚀 ~ mappedWeatherForcastData ~ mappedWeatherForcast:",
      mappedWeatherForcast
    );
    /* All Results including missing images
    // Construct a new list for arr2 with the image property
    const results = mappedWeatherForcast.map((item) => ({
      ...item,
      image: coordinates1.get(`${item.latitude},${item.longitude}`),
    }));
    console.log("🚀 ~ results ~ results:", results);
    return results
    */
    const filteredResults = mappedWeatherForcast
      .map((item) => {
        if (coordinates1.has(`${item.latitude},${item.longitude}`)) {
          console.log(coordinates1.get(`${item.latitude},${item.longitude}`));
          return {
            ...item,
            image: coordinates1.get(`${item.latitude},${item.longitude}`),
          };
        } else {
          console.log("🚀 ~ filteredResults ~ else:");
          return;
        }
      })
      .filter(Boolean);
    console.log("🚀 ~ filteredResults ~ filteredResults:", filteredResults);
    return filteredResults;
  } catch (err) {
    //TODO handle other errors 500
    console.log("🚀 ~ trafficImages ~ err:", err);
  }
};

export default {
  trafficImages,
};
