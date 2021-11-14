import axios from "axios";

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

export default {
  fetchDough,
  fetchSizes,
  fetchSauces,
  fetchIngredients,
};
