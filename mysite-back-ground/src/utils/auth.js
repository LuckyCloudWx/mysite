import Cookies from 'js-cookie'

const TokenKey = 'authorToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(TokenKey);
}
