import axios from "axios";

export function initAxios() {
  axios.defaults.baseURL = "https://api.ratesapi.io/api";
}
