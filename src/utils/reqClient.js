import axios from "axios";
import BASE_URL from "../api/baseUrl";
import { useUserStore } from "@/store";

// --- Axios Loading Interceptors ---
// axios.interceptors.request.use(
//   (config) => {
//     const store = useUserStore();
//     store.setisLoading(true); // turn on loading
//     return config;
//   },
//   (error) => {
//     const store = useUserStore();
//     store.setisLoading(false);
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (response) => {
//     const store = useUserStore();
//     store.setisLoading(false); // turn off loading
//     return response;
//   },
//   (error) => {
//     const store = useUserStore();
//     store.setisLoading(false); // turn off loading
//     return Promise.reject(error);
//   }
// );

export const preAuthGetApi = async (url, body, tokens, headers) =>
  axios.get(`${BASE_URL}/${url}`, body, {
    headers: {
      Authorization: "",
      ...headers,
    },
  });

export const postApi = async (url, body, headers) =>
  axios.post(`${BASE_URL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_10at_")}`,
      ...headers,
    },
  });

export const postDocumentApi = async (url, body, config = {}) =>
  axios.post(`${BASE_URL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_10at_")}`,
      ...config.headers,
    },
    ...config, // 👈 spread extra config like responseType
  });

export const putApi = async (url, body, headers) =>
  axios.put(`${BASE_URL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_10at_")}`,
      ...headers,
    },
  });

export const patchApi = async (url, body, headers) =>
  axios.patch(`${BASE_URL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_10at_")}`,
      ...headers,
    },
  });

export const getApi = async (url, params = {}, headers) =>
  axios.get(`${BASE_URL}/${url}`, {
    params: { ...params },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_10at_")}`,
      ...headers,
    },
  });

export const deleteApi = async (url, body, headers) =>
  axios.delete(`${BASE_URL}/${url}`, {
    data: body,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("_10at_")}`,
      ...headers,
    },
  });
