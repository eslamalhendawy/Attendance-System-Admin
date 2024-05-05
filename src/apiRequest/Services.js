import axios from "axios";
const baseURL = "https://smart-attendance-system-using-qr-code-1.onrender.com/api/v1";

export const postData = async (url, data, token) => {
  let response = [];
  await axios.post(`${baseURL}/${url}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      response = res.data;
    })
    .catch(err => {
      response = err;
    });
    return response;
}

export const getData = async (url, token) => {
  let response = [];
  await axios.get(`${baseURL}/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      response = res.data;
    })
    .catch(err => {
      response = err;
    });
    return response;
}

export const updateData = async (url, data, token) => {
  let response = [];
  await axios.patch(`${baseURL}/${url}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      response = res.data;
    })
    .catch(err => {
      response = err;
    });
    return response;
};