import axios from "axios";
import jwtService from "@/services/jwtService";
import { BASE_URL } from "@/common/constants";

async function getAll() {
  const url = `${BASE_URL}/addresses`;
  const res = await axios.get(url, jwtService.authParams());
  return res.data;
}

function add(payload) {
  const url = `${BASE_URL}/addresses`;
  return axios.post(url, payload, jwtService.authParams());
}

function edit(payload) {
  const url = `${BASE_URL}/addresses/${payload.id}`;
  return axios.put(url, payload, jwtService.authParams());
}

function remove(payload) {
  const url = `${BASE_URL}/addresses/${payload.id}`;
  return axios.delete(url, jwtService.authParams());
}

export default {
  getAll,
  add,
  edit,
  remove,
};
