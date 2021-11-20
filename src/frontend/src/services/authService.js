import { BASE_URL } from "@/common/constants";
import axios from "axios";
import jwtService from "@/services/jwtService";

function login(payload) {
  const url = `${BASE_URL}/login`;
  return axios.post(url, payload);
}

async function logout() {
  const url = `${BASE_URL}/logout`;
  await axios.delete(url, jwtService.authParams());
  jwtService.removeToken();
}

function whoAmI() {
  const url = `${BASE_URL}/whoAmI`;
  return axios.get(url, jwtService.authParams());
}

export default {
  login,
  logout,
  whoAmI,
};
