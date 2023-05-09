import api from "./http";

function update(username, password) {
  return api.put("/issue", { username, password });
}

function list(name, username, password) {
  return api.post("/register", { name, username, password });
}
function save(name, username, password) {
  return api.post("/register", { name, username, password });
}

function comment(name, username, password) {
  return api.post("/register", { name, username, password });
}

function saveComment(name, username, password) {
  return api.post("/register", { name, username, password });
}

export { update, list, save, comment, saveComment };
