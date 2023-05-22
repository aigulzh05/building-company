import api from "./http";

function list(pageNo = 1, pageSize = 3) {
  return api.get("/api/product", {
    params: {
      pageNo,
      pageSize,
    },
  });
}
//CRUD
function save(name, quantity, price, subTypeId, img) {
  var formData = new FormData();
  formData.append("name", name);
  formData.append("img", img);
  formData.append("quantity", quantity);
  formData.append("price", price);
  formData.append("subTypeId", subTypeId);

  return api.post(`/api/product`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
function detail(productId) {
  return api.get(`/api/product/${productId}`);
}
function update(id, name, quantity, price, subTypeId) {
  return api.put(`/api/product`, {
    id,
    name,
    quantity,
    price,
    subTypeId,
  });
}
function updatePhoto(productId, photo) {
  var formData = new FormData();
  formData.append("photo", photo);
  formData.append("productId", productId);

  return api.put(`/api/product/photo`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
function remove(productId) {
  return api.delete(`/api/product/${productId}`);
}

export default {
  list,
  save,
  update,
  detail,
  remove,
  updatePhoto,
};
