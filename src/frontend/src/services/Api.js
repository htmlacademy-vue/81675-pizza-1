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

export default {
  fetchDough,
};
