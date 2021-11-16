import axios from "axios";
import jwtService from "@/services/jwtService";

const BASE_URL = "http://localhost:3000";

async function getAddresses() {
  const url = `${BASE_URL}/addresses`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${jwtService.getToken()}`,
    },
  });
  return res.data;
}

function addAddress(payload) {
  const url = `${BASE_URL}/addresses`;
  const params = {
    headers: {
      Authorization: `Bearer ${jwtService.getToken()}`,
    },
  };

  return axios.post(url, payload, params);
}

function editAddress(payload) {
  const url = `${BASE_URL}/addresses/${payload.id}`;
  const params = {
    headers: {
      Authorization: `Bearer ${jwtService.getToken()}`,
    },
  };
  return axios.put(url, payload, params);
}

export default {
  getAddresses,
  addAddress,
  editAddress,
};
