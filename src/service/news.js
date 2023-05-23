import api from "./http";

function list(pageNo = 0, pageSize = 4) {
  return api.get("/api/news", {
    params: {
      pageNo,
      pageSize,
    },
  });
}
//CRUD
function save(header, text, img) {
  var formData = new FormData();
  formData.append("header", header);
  formData.append("text", text);
  formData.append("img", img);

  return api.post(`/api/news`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // return api.post("/api/news", { header, text, img });
}
function detail(newsId) {
  return api.get(`/api/news/${newsId}`);
}
function remove(newsId) {
  return api.delete(`/api/news/${newsId}`);
}

export default { list, save, remove, detail };
