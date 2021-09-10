import axios from "axios";

export default axios.create({
  baseURL: "https://harga-barang.herokuapp.com",
  headers: {
    "Content-type": "application/json",
    // "Access-Control-Request-Method": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
});