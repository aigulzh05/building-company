import api from "./http";

function list() {
  return api.get("/position");
}
//CRUD
function save(positionId, username, password) {
  return api.post(
    `/api/user?positionId=${positionId}&username=${username}&password=${password}`
  );
}
function detail(userId) {
  return api.get(`/api/user/${userId}`);
}
function update(id, firstName, lastName, photo, phoneNumber, address) {
  var formData = new FormData();
  formData.append("photo", photo);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("phoneNumber", phoneNumber);
  formData.append("address", address);

  axios.put(`/api/user/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
function remove(id) {
  return api.delete(`/api/user/${id}`);
}

export { update, list, save, remove, detail };
