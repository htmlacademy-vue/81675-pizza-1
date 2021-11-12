export default {
  namespaced: true,
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, payload) {
      state.cart.push(payload);
    },
  },
  getters: {
    cartTotalPrice(state) {
      const pizzaPrice = (pizza) => {
        const { dough, size, sauce, ingredients } = pizza;
        const ingredientsPrice = ingredients.reduce((acc, item) => {
          return acc + item.price * item.amount;
        }, 0);
        return size.multiplier * (dough.price + sauce.price + ingredientsPrice);
      };

      return state.cart.reduce((acc, pizza) => acc + pizzaPrice(pizza), 0);
    },
  },
};
