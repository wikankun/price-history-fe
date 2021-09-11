import http from "../http-common";

class ItemDataService {
  getAll() {
    return http.get("/item");
  }

  get(id) {
    return http.get(`/item/${id}`);
  }

  getPriceHistory(id) {
    return http.get(`/price/${id}`);
  }

  updatePriceHistory(id) {
    return http.post(`/price/${id}`);
  }

  create(data) {
    return http.post("/item", data);
  }

  update(id, data) {
    return http.put(`/item/${id}`, data);
  }

  delete(id) {
    return http.delete(`/item/${id}`);
  }

  findByName(name) {
    return http.get(`/item?name=${name}`);
  }
}

export default new ItemDataService();