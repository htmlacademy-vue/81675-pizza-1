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
    async getOrders({ commit, rootState }) {
      const doughById = (id) =>
        rootState.Builder.dough.find((item) => item.id === id);
      const sauceById = (id) =>
        rootState.Builder.sauces.find((item) => item.id === id);
      const sizeById = (id) =>
        rootState.Builder.sizes.find((item) => item.id === id);
      const ingredientById = (id) =>
        rootState.Builder.ingredients.find((item) => item.id === id);
      const miscById = (id) =>
        rootState.Cart.additional.find((item) => item.id === id);

      const orders = await ordersService.fetchOrders();
      const normalizedOrders = orders.map((order) => {
        const pizzas = order.orderPizzas.map((orderPizza) => {
          return {
            name: orderPizza.name,
            amount: orderPizza.quantity,
            dough: doughById(orderPizza.doughId),
            sauce: sauceById(orderPizza.sauceId),
            size: sizeById(orderPizza.sizeId),
            ingredients: orderPizza.ingredients.map((item) => {
              return {
                ...ingredientById(item.ingredientId),
                amount: item.quantity,
              };
            }),
          };
        });

        const misc =
          order.orderMisc?.map((orderMisc) => {
            return {
              ...miscById(orderMisc.id),
              amount: orderMisc.quantity,
            };
          }) ?? [];

        return {
          id: order.id,
          orderAddress: order.orderAddress,
          orderPizzas: pizzas,
          orderMisc: misc,
        };
      });
      commit("setState", { orders: normalizedOrders });
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
        pizzas,
        misc,
      };
      order.address = state.address.street ? state.address : null;
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
