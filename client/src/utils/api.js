import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/") window.location = "/";
    }
    if (error.response && error.response.status === 403) {
      if (window.location.pathname !== "/") window.location = "/home";
    }
    return Promise.reject(error);
  }
);

function headers() {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      "x-access-token": `Bearer ${token}`,
    };
  }
  return {};
}

export function apiGet(url) {
  return axios({
    method: "get",
    url: `/api/${url}`,
    timeout: 600000,
    headers: headers(),
  });
}

export function apiPost(url, data) {
  return axios({
    method: "post",
    url: `/api/${url}`,
    data: data,
    timeout: 600000,
    headers: headers(),
  });
}

export function s3put(url, object, onUploadProgress) {
  return axios({
    method: "put",
    url: url,
    data: object,
    headers: {
      "Content-Type": "video/webm",
    },
    onUploadProgress: onUploadProgress,
  });
}

export function apiPostFD(url, data) {
  const fdHeaders = headers();
  fdHeaders["Content-Type"] = "multipart/form-data";
  return axios({
    method: "post",
    url: `/api/${url}`,
    data: data,
    timeout: 600000,
    headers: headers(),
  });
}

export function apiPut(url, data) {
  return axios({
    method: "put",
    url: `/api/${url}`,
    data: data,
    timeout: 600000,
    headers: headers(),
  });
}

export function apiDelete(url) {
  return axios({
    method: "delete",
    url: `/api/${url}`,
    timeout: 600000,
    headers: headers(),
  });
}