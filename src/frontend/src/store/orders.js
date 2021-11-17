export default {
  namespaced: true,
  state: {
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
  },
  mutations: {
    setState(state, newState) {
      Object.assign(state, newState);
    },
  },
  actions: {
    createOrder({ state, rootState }) {
      const pizzas = rootState.Cart.cart.map((item) => {
        return {
          name: item.name,
          sauceId: item.sauce.id,
          doughId: item.dough.id,
          sizeId: item.size.id,
          quantity: item.amount,
          ingredients: item.ingredients.map((ingredient) => {
            return {
              ingredientId: ingredient.id,
              quantity: ingredient.amount,
            };
          }),
        };
      });
      const misc = rootState.Cart.additional
        .filter((item) => item.amount > 0)
        .map((item) => {
          return {
            miscId: item.id,
            quantity: item.amount,
          };
        });
      const user = rootState.Auth.user;
      const order = {
        userId: user.id,
        phone: user.phone,
        address: state.address,
        pizzas,
        misc,
      };
      console.log("create", order);

      // commit("Cart/setOrderComplete", true);
    },
  },
};
