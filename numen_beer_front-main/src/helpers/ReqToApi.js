import axios from "axios";

export const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://numen-beer.herokuapp.com/",
});

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

axiosService.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
    return config;
  });


export const getReq = (path) => {
  return axiosService.get(path);
};

export const postReq = (path, body) => {
  return axiosService.post(path, body);
};

export const putReq = (path, body) => {
  return axiosService.put(path, body);
};

export const patchReq = (path, body) => {
  return axiosService.patch(path, body);
}

export const delReq = (path) => {
  return axiosService.delete(path);
};
