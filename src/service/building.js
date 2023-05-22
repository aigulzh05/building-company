import api from "./http";

function list(pageNo = 0, pageSize = 10) {
  return api.get("/api/building", {
    params: {
      pageNo,
      pageSize,
    },
  });
}
//CRUD
function save(
  dateStart,
  dateEnd,
  name,
  description,
  numberOfFloors,
  numberOfApartments,
  address,
  img
) {
  var formData = new FormData();
  formData.append("dateStart", dateStart);
  formData.append("dateEnd", dateEnd);

  formData.append("name", name);
  formData.append("description", description);
  formData.append("numberOfApartments", numberOfApartments);
  formData.append("numberOfFloors", numberOfFloors);
  formData.append("address", address);

  formData.append("img", img);

  const options = { headers: { "Content-Type": "multipart/form-data" } };

  return api.post(`/api/building`, formData, options);
}
function detail(buildingId) {
  return api.get(`/api/building/${buildingId}`);
}
function update(
  id,
  dateStart,
  dateEnd,
  name,
  description,
  numberOfFloors,
  numberOfApartments,
  address,
  state
) {
  return api.put(`/api/building`, {
    id,
    dateStart,
    dateEnd,
    name,
    description,
    numberOfFloors,
    numberOfApartments,
    address,
    state,
  });
}

function updatePhoto(buildingId, img) {
  var formData = new FormData();
  formData.append("img", img);
  formData.append("buildingId", buildingId);

  return api.put(`/api/building/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export default {
  list,
  save,
  update,
  detail,
  updatePhoto,
};
