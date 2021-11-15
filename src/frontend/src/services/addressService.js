import axios from "axios";
import jwtService from "@/services/jwtService";

const BASE_URL = "http://localhost:3000";

function getAddresses() {
  const url = `${BASE_URL}/addresses`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${jwtService.getToken()}`,
    },
  });
}

function saveAddress(payload) {
  const url = `${BASE_URL}/addresses`;
  return axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${jwtService.getToken()}`,
    },
  });
}

export default {
  getAddresses,
  saveAddress,
};
