import miscData from "@/static/misc.json";
import colaImg from "@/assets/img/cola.svg";
import sauceImg from "@/assets/img/sauce.svg";
import potatoImg from "@/assets/img/potato.svg";

const images = [
  { id: 1, image: colaImg },
  { id: 2, image: sauceImg },
  { id: 3, image: potatoImg },
];

const defaultState = () => ({
  cart: [],
  additional: miscData.map((item) => {
    const img = images.find((imgItem) => imgItem.id === item.id);
    return {
      ...item,
      image: img.image,
      amount: 0,
    };
  }),
  isOrderComplete: false,
});

export default {
  namespaced: true,
  state: {
    ...defaultState(),
  },
  mutations: {
    addToCart(state, pizza) {
      const pizzaInCartIndex = state.cart.findIndex(
        (item) => item.id === pizza.id
      );
      if (pizzaInCartIndex !== -1) {
        state.cart.splice(pizzaInCartIndex, 1, pizza);
      } else {
        state.cart.push(pizza);
      }
    },
    removeFromCart(state, payload) {
      const index = state.cart.findIndex((item) => item === payload);
      state.cart.splice(index, 1);
    },
    pizzaAdd(state, pizza) {
      pizza.amount++;
    },
    pizzaRemove(state, pizza) {
      pizza.amount--;
    },
    additionalAdd(state, item) {
      item.amount++;
    },
    additionalRemove(state, item) {
      item.amount--;
    },
    setOrderComplete(state, payload) {
      state.isOrderComplete = payload;
    },
    resetCart(state) {
      Object.assign(state, defaultState());
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
        return (
          size.multiplier *
          (dough.price + sauce.price + ingredientsPrice) *
          pizza.amount
        );
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
