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
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponseData(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password: password,
      email: email, }),
  }).then((data) => {
    if (data._id) {
      localStorage.setItem('userId', data._id);
      return data;
    } else {
      return;
    }
  }).then((res) => getResponseData(res));
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => getResponseData(res));
};

export const onLogout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res) => getResponseData(res));
}
