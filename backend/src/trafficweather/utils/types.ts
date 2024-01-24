export type Camera = {
  timestamp: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
  camera_id: string;
  image_metadata: ImageMetadata;
};
export type ImageMetadata = {
  height: number;
  width: number;
  md5: string;
};

export type TrafficImageApiResponse = {
  items: {
    timestamp: string;
    cameras: Camera[];
  }[];
  api_info: {
    status: string;
  };
};

export type MapCameraList = {
  image: string;
  latitude: string;
  longitude: string;
};
//Traffic weather
type AreaMetadata = {
  name: string;
  label_location: { latitude: number; longitude: number };
};

type Forecast = {
  area: string;
  forecast: string;
};

type Item = {
  update_timestamp: string;
  timestamp: string;
  valid_period: {
    start: string;
    end: string;
  };
  forecasts: Forecast[];
};

export type TrafficweatherServiceResponse = {
  area_metadata: AreaMetadata[];
  items: Item[];
  api_info: {
    status: string;
  };
};

export type MappedWeatherForecast = {
  area: string;
  forecast: string;
  latitude: string;
  longitude: string;
};

export type Results = {
  area: string;
  forecast: string;
  latitude: string;
  longitude: string;
};
