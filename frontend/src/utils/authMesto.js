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
    body: JSON.stringify({
      password: password,
      email: email
  }),
  }).then(getResponseData);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      email: email
  }),
  }).then(getResponseData)
  .then((data) => {
      localStorage.setItem('jwt', data.token)
      return data;
  })
};

export const getContent = () => {
  const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(getResponseData);
};

