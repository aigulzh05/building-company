import api from "./http";
const REFRESH_TOKEN_NAME = "refresh-token";

const fakeLoginResponse = {
  data: {
    accessToken: "accesss",
    refreshToken: "reffffff",
  },
};
function login(username, password) {
  return api.post("/api/authenticate", { username, password });
  //return Promise.resolve(fakeLoginResponse);
}

function refreshToken() {
  return api.post("/api/refresh-token", {
    refreshToken: localStorage.getItem(REFRESH_TOKEN_NAME),
  });
  //return Promise.resolve(fakeLoginResponse);
}

function register(name, username, password) {
  return api.post("/api/register", { name, username, password });
}

export default { login, register, refreshToken };
