import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/") window.location = "/";
    }
    if (error.response && error.response.status === 403) {
        // window.location = "/home";
    }
    return error;
  }
);

function headers() {
  const token = localStorage.getItem("token");
  return {
    "x-access-token": `Bearer ${token}`,
  };
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