export const BASE_URL = "https://api.daianamesto.students.nomoredomainsmonster";

const getResponseData = (res) => {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
} 

export const register = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return getResponseData(res);
};

export const authorize = async (email, password) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await getResponseData(res);
  localStorage.setItem('userId', data._id);
  return data;
};

export const getContent = async () => {
  // const token = localStorage.getItem('jwt');
  const res = await fetch(`${BASE_URL}/users/me`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return getResponseData(res);
};

