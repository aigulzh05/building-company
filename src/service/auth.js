import api from "./http";

const fakeLoginResponse = () => {
  return {
    accessToken: "accesss",
    refreshToken: "reffffff",
  };
};
function login(username, password) {
  return api.post("/authenticate", { username, password });
  //   return fakeLoginResponse();
}

function register(name, username, password) {
  return api.post("/register", { name, username, password });
}

export default { login, register };
