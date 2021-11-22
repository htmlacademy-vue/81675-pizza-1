export default {
  namespaced: true,
  state: {
    cart: [],
    additional: [],
    isOrderComplete: false,
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
      Object.assign(state, {
        cart: [],
        isOrderComplete: false,
      });
      state.additional.forEach((item) => (item.amount = 0));
    },
    setState(state, newState) {
      Object.assign(state, newState);
    },
  },
  getters: {
    additionalPrice(state) {
      return state.additional.reduce((acc, item) => {
        return acc + item.price * item.amount;
      }, 0);
    },
    cartTotalPrice(state, getters, rootState, rootGetters) {
      const pizzasPrice = state.cart.reduce(
        (acc, pizza) => acc + rootGetters["Public/pizzaPrice"](pizza),
        0
      );
      return pizzasPrice + getters.additionalPrice;
    },
  },
};
