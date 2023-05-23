import api from "./http";

function list(pageNo = 0, pageSize = 10) {
  return api.get("/api/purchase-request", {
    params: {
      pageNo,
      pageSize,
    },
  });
}
//CRUD
function save(customerName, phoneNumber,message) {
  return api.post("/api/purchase-request", 
  { customerName,
    phoneNumber,
    message});
}
function detail(purchaseId ) {
  return api.get(`/api/purchase-request/${purchaseId }`);
}
function remove(purchaseId ) {
  return api.delete(`/api/purchase-request/${purchaseId }`);
}

export default {  list, save, remove, detail };





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
