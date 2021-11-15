import axios from "axios";
import jwtService from "@/services/jwtService";
import colaImg from "@/assets/img/cola.svg";
import sauceImg from "@/assets/img/sauce.svg";
import potatoImg from "@/assets/img/potato.svg";

const BASE_URL = "http://localhost:3000";

async function fetchDough() {
  const url = `${BASE_URL}/dough`;
  const res = await axios.get(url);
  const values = {
    ["Тонкое"]: "light",
    ["Толстое"]: "large",
  };
  return res.data.map((item) => {
    return {
      ...item,
      value: values[item.name],
    };
  });
}

async function fetchSizes() {
  const url = `${BASE_URL}/sizes`;
  const res = await axios.get(url);
  return res.data;
}

async function fetchSauces() {
  const url = `${BASE_URL}/sauces`;
  const res = await axios.get(url);
  const values = {
    ["Томатный"]: "tomato",
    ["Сливочный"]: "creamy",
  };
  return res.data.map((item) => {
    return {
      ...item,
      value: values[item.name],
    };
  });
}

async function fetchIngredients() {
  const url = `${BASE_URL}/ingredients`;
  const res = await axios.get(url);
  return res.data.map((item) => {
    const match = item.image.match(/(\w+).svg/);
    const nameEn = match?.[1] ?? "";
    return {
      ...item,
      nameEn,
      amount: 0,
    };
  });
}

async function fetchAdditional() {
  const url = `${BASE_URL}/misc`;
  const images = [colaImg, sauceImg, potatoImg];
  const res = await axios.get(url);
  return res.data.map((item, index) => {
    return {
      ...item,
      amount: 0,
      image: images[index],
    };
  });
}

function login(payload) {
  const url = `${BASE_URL}/login`;
  return axios.post(url, payload);
}

async function logout() {
  const url = `${BASE_URL}/logout`;
  await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${jwtService.getToken()}`,
    },
  });
  jwtService.removeToken();
}

function whoAmI() {
  const url = `${BASE_URL}/whoAmI`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${jwtService.getToken()}`,
    },
  });
}

export default {
  fetchDough,
  fetchSizes,
  fetchSauces,
  fetchIngredients,
  fetchAdditional,
  login,
  logout,
  whoAmI,
};
