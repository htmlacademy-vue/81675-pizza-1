import ordersService from "@/services/ordersService";

export default {
  namespaced: true,
  state: {
    orders: [],
    userPhone: "",
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
    async getOrders({ commit }) {
      const orders = await ordersService.fetchOrders();
      commit("setState", { orders });
    },
    async createOrder({ state, rootState, commit }) {
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
        phone: state.userPhone,
        address: state.address,
        pizzas,
        misc,
      };
      console.log("create", order);

      try {
        await ordersService.createOrder(order);
        commit("Cart/setOrderComplete", true, { root: true });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
