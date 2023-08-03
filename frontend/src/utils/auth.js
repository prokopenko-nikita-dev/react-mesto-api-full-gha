export const BASE_URL = 'https://api.domainname.nikitapro.nomoreparties.co'

const responseCheck = (response) => {
  console.log(response)
  if (response.ok) {
    return response.json()
  } 
  return Promise.reject(`Ошибка ${response.status}`);
}

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
    .then(responseCheck)
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
    .then(responseCheck)
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    }
  })
    .then(responseCheck)
}