import api from "./http";

function list() {
  return api.get("/api/position");
}
//CRUD
function save(name, salary) {
  return api.post("/api/position", { name, salary });
}
function detail(id) {
  return api.get(`/api/position/${id}`);
}
function update(id, name, salary) {
  return api.put(`/api/position/${id}?name=${name}
  &salary=${salary}`);
}
function remove(id) {
  return api.delete(`/api/position/${id}`);
}

export default { update, list, save, remove, detail };





// fetch("http://3.34.2.208:5000/position", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZSIsImlhdCI6MTY4NDA5MTc5MiwiZXhwIjoxNjg0MDkzNTkyfQ.tNqi4tOlawe5Gk9jLSRW89r4oVGKUDKXy6jw3r3ImuI"
//   },
//   "referrer": "http://localhost:3000/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "include"
// }).then(res=>res.json()).then(data=>console.log(data))
