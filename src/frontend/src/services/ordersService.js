import axios from "axios";
import jwtService from "@/services/jwtService";

const BASE_URL = "http://localhost:3000";

async function fetchOrders() {
  const url = `${BASE_URL}/orders`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${jwtService.getToken()}`,
    },
  });
  return res.data;
}

function createOrder(payload) {
  const url = `${BASE_URL}/orders`;
  const params = {
    headers: {
      Authorization: `Bearer ${jwtService.getToken()}`,
    },
  };
  return axios.post(url, payload, params);
}

export default {
  fetchOrders,
  createOrder,
};
