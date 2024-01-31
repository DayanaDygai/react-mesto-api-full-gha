export const BASE_URL = "https://api.daianamesto.students.nomoredomainsmonster.ru";

const getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
} 

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponseData(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponseData)
    .then((data) => {
      localStorage.setItem('userId', data._id)
      return data;
    });
};

export const getContent = () => {
  // const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
    method: "GET",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  }).then((res) => getResponseData(res));
};

