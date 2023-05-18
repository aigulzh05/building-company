import api from "./http";

function list(pageNo = 1, pageSize = 2) {
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

function detailMe() {
  return api.get(`/api/me`);
}
function updatePasswordMe(password) {
  return api.put(`/api/settings/password`, {
    password,
  });
}
function updatePhotoMe(photo) {
  var formData = new FormData();
  formData.append("photo", photo);

  return api.put(`/api/settings/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
function updateMe(firstName, lastName, phoneNumber, address) {
  return api.put(`/api/settings/user`, {
    firstName,
    lastName,
    phoneNumber,
    address,
  });
}
export default {
  update,
  list,
  save,
  detail,
  updatePassword,
  updatePhoto,
  detailMe,
  updatePasswordMe,
  updatePhotoMe,
  updateMe,
};
