export const BASE_URL = "https://api.daianamesto.students.nomoredomainsmonster.ru";

const getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
} 

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
      
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => getResponseData(res));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => getResponseData(res));
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
    },
  }).then((res) => getResponseData(res));
};

