import api from "./http";

function list(pageNo = 1, pageSize = 4) {
  return api.get("/api/apartment", {
    params: {
      pageNo,
      pageSize,
    },
  });
}
//CRUD
function save(roomNumber, area, pricePerArea, img,
  buildingId ) {
  return api.post(`/api/apartmen`, {
    roomNumber,
    area,
    pricePerArea,
    img,
    buildingId
  });
}
function detail(apartmentId ) {
  return api.get(`/api/apartment/${apartmentId }`);
}
function update(id, roomNumber, area, pricePerArea,
  status,buildingId ) {
  return api.put(`/api/apartment`, {
    id,
    roomNumber,
    area,
    pricePerArea,
    status,
    buildingId,
    
  });
}

function updatePhoto(apartmentId, img) {
  var formData = new FormData();
  formData.append("img", img);
  formData.append("apartmentId", apartmentId);

  return api.put(`/api/apartment/photo`, formData, {
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
