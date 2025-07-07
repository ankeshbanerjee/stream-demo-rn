import axios from "axios";

export function initService() {
  axios.defaults.baseURL = process.env.EXPO_PUBLIC_BASE_URL;
  axios.defaults.timeout = 10 * 1000;
}
