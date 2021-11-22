export default {
  namespaced: true,
  state: {
    cart: [],
    misc: [],
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
    resetCart(state) {
      Object.assign(state, {
        cart: [],
        isOrderComplete: false,
        misc: [],
      });
    },
    setState(state, newState) {
      Object.assign(state, newState);
    },
  },
  getters: {
    miscPrice(state, getters, rootState, rootGetters) {
      return state.misc.reduce((acc, item) => {
        const miscData = rootGetters["Public/miscById"](item.id);
        return acc + miscData.price * item.amount;
      }, 0);
    },
    cartTotalPrice(state, getters, rootState, rootGetters) {
      const pizzasPrice = state.cart.reduce(
        (acc, pizza) => acc + rootGetters["Public/pizzaPrice"](pizza),
        0
      );
      return pizzasPrice + getters.miscPrice;
    },
  },
  actions: {
    miscAdd({ state }, id) {
      const miscInCart = state.misc.find((item) => item.id === id);
      miscInCart ? miscInCart.amount++ : state.misc.push({ id, amount: 1 });
    },
    miscRemove({ state }, id) {
      const miscInCart = state.misc.find((item) => item.id === id);
      if (!miscInCart) return;
      miscInCart.amount--;
      if (miscInCart.amount <= 0)
        state.misc = state.misc.filter((item) => item.id !== id);
    },
  },
};
