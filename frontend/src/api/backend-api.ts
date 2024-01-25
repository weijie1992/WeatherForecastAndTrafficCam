import axios from "axios";
import { backendUrl } from "../constants/api";

const trafficImages = async (date: string, time: string) => {
  const dateTime = `${date}T${time}`;
  const res = await axios.get(`${backendUrl}${dateTime}`);
  return res.data;
};

export default {
  trafficImages,
};
