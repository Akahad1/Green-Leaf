"use server";
import axios from "axios";
import { cookies } from "next/headers";
const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/a6",
});
AxiosInstance.interceptors.request.use(
  async function (config) {
    const cookieStore = cookies();
    const accessToken = await (await cookieStore).get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
