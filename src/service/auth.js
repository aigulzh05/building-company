import api from "./http";

const fakeLoginResponse = {
  accessToken: "accesss",
  refreshToken: "reffffff",
};
function login(username, password) {
  // return api.post("/authenticate", { username, password });
  return Promise.resolve(fakeLoginResponse);
}

function register(name, username, password) {
  return api.post("/register", { name, username, password });
}

export default { login, register };
