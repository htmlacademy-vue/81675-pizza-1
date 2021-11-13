import miscData from "@/static/misc.json";
import colaImg from "@/assets/img/cola.svg";
import sauceImg from "@/assets/img/sauce.svg";
import potatoImg from "@/assets/img/potato.svg";

const images = [
  { id: 1, image: colaImg },
  { id: 2, image: sauceImg },
  { id: 3, image: potatoImg },
];

const normalizedMiscData = miscData.map((item) => {
  const img = images.find((imgItem) => imgItem.id === item.id);
  return {
    ...item,
    image: img.image,
    amount: 0,
  };
});

export default {
  namespaced: true,
  state: {
    cart: [],
    additional: normalizedMiscData,
  },
  mutations: {
    addToCart(state, payload) {
      state.cart.push(payload);
    },
  },
  getters: {
    additionalPrice(state) {
      return state.additional.reduce((acc, item) => {
        return acc + item.price * item.amount;
      }, 0);
    },
    pizzaPrice() {
      return (pizza) => {
        const { dough, size, sauce, ingredients } = pizza;
        const ingredientsPrice = ingredients.reduce((acc, item) => {
          return acc + item.price * item.amount;
        }, 0);
        return size.multiplier * (dough.price + sauce.price + ingredientsPrice);
      };
    },
    cartTotalPrice(state, getters) {
      const pizzasPrice = state.cart.reduce(
        (acc, pizza) => acc + getters.pizzaPrice(pizza),
        0
      );
      return pizzasPrice + getters.additionalPrice;
    },
  },
};
