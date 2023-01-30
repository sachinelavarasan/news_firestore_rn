import axios from "axios";

const apiKey = "01e8db01828243608fb0a778704055c8";

const instance = axios.create({
  baseURL: "https://newsapi.org/v2",
});

instance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${apiKey}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
