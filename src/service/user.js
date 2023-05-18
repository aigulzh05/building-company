import api from "./http";

function list(pageNo = 1, pageSize = 3) {
  return api.get("/api/user", {
    params: {
      pageNo,
      pageSize,
    },
  });
}
//CRUD
function save(positionId, username, password) {
  return api.post(`/api/user`, {
    positionId,
    username,
    password,
  });
}
function detail(userId) {
  return api.get(`/api/user/${userId}`);
}
function update(id, firstName, lastName, phoneNumber, address) {
  return api.put(`/api/user`, {
    id,
    firstName,
    lastName,
    phoneNumber,
    address,
  });
}
function updatePassword(userId, password) {
  return api.put(`/api/user/password`, {
    userId,
    password,
  });
}
function updatePhoto(userId, photo) {
  var formData = new FormData();
  formData.append("photo", photo);
  formData.append("userId", userId);

  return api.put(`/api/user/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export default { update, list, save, detail, updatePassword, updatePhoto };
