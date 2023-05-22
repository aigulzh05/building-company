import api from "./http";

function list(pageNo = 1, pageSize = 10) {
  return api.get("/api/sub-type", {
    params: {
      pageNo,
      pageSize,
    },
  });
}
//CRUD
function save(name, globalTypeId) {
  return api.post(`/api/sub-type`, {
    globalTypeId,
    name,
  });
}
function detail(subTypeId) {
  return api.get(`/api/sub-type/${subTypeId}`);
}
function update(id, name, globalTypeId) {
  return api.put(`/api/sub-type`, {
    id,
    name,
    globalTypeId,
  });
}

function remove(subTypeId) {
  return api.delete(`/api/sub-type/${subTypeId}`);
}

export default {
  list,
  save,
  update,
  detail,
  remove,
};
