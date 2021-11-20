const TOKEN_KEY = "token";

function getToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

function saveToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

function removeToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

function authParams() {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
}

export default {
  getToken,
  saveToken,
  removeToken,
  authParams,
};
