import axios from "axios";
import jwtService from "@/services/jwtService";
import { BASE_URL } from "@/common/constants";

async function getAll() {
  const url = `${BASE_URL}/orders`;
  const res = await axios.get(url, jwtService.authParams());
  return res.data;
}

function create(payload) {
  const url = `${BASE_URL}/orders`;
  return axios.post(url, payload, jwtService.authParams());
}

function remove(id) {
  const url = `${BASE_URL}/orders/${id}`;
  return axios.delete(url, jwtService.authParams());
}

export default {
  getAll,
  create,
  remove,
};
