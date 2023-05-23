import api from "./http";

function list(pageNo = 0, pageSize = 10) {
  return api.get("/api/global-type", {
    params: {
      pageNo,
      pageSize,
    },
  });
}
//CRUD
function save(name) {
  return api.post(`/api/global-type`, {
    name,
  });
}
function detail(globalTypeId) {
  return api.get(`/api/global-type/${globalTypeId}`);
}
function update(id, name) {
  return api.put(`/api/global-type`, {
    id,
    name,
  });
}

function remove(globalTypeId) {
  return api.delete(`/api/global-type/${globalTypeId}`);
}

export default {
  list,
  save,
  update,
  detail,
  remove,
};
