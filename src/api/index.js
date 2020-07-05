import axios from "axios";

const api = axios.create({
  baseURL: "https://api.covid19india.org/data.json",
});
const stateTimeSeries = axios.create({
  baseURL: "https://api.covid19india.org/v3/min/timeseries.min.json",
});

export const fetchData = async () => {
  try {
    const data = await api.get("");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const stateTimeData = async () => {
  try {
    const data = await stateTimeSeries.get("");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

