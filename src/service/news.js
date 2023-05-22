import api from "./http";

function list(pageNo = 1, pageSize = 4) {
  return api.get("/api/news", {
    params: {
      pageNo,
      pageSize,
    },
  });
}
//CRUD
function save(header, text,img) {
  return api.post("/api/news", 
  { header,
    text,
    img});
}
function detail(newsId ) {
  return api.get(`/api/news/${newsId }`);
}
function remove(newsId ) {
  return api.delete(`/api/news/${newsId }`);
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
