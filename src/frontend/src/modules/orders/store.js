import ordersService from "@/services/ordersService";

export default {
  namespaced: true,
  state: {
    orders: [],
    userPhone: "",
    addressId: null,
    isSelfDelivery: true,
    address: {
      street: "",
      building: "",
      flat: "",
    },
  },
  mutations: {
    setState(state, newState) {
      Object.assign(state, newState);
    },
  },
  actions: {
    async getOrders({ commit }) {
      const orders = await ordersService.getAll();
      const normalizedOrders = orders.map((order) => {
        const pizzas = order.orderPizzas.map((orderPizza) => {
          return {
            name: orderPizza.name,
            amount: orderPizza.quantity,
            doughId: orderPizza.doughId,
            sauceId: orderPizza.sauceId,
            sizeId: orderPizza.sizeId,
            ingredients: orderPizza.ingredients.map((item) => {
              return {
                id: item.ingredientId,
                amount: item.quantity,
              };
            }),
          };
        });

        const misc =
          order.orderMisc?.map((orderMisc) => {
            return {
              id: orderMisc.miscId,
              amount: orderMisc.quantity,
            };
          }) ?? [];

        return {
          id: order.id,
          orderAddress: order.orderAddress,
          orderPizzas: pizzas,
          orderMisc: misc,
          phone: order.phone,
          userId: order.userId,
          addressId: order.addressId,
        };
      });
      commit("setState", { orders: normalizedOrders });
    },
    async createOrder({ rootGetters, dispatch }, orderData) {
      const pizzas = orderData.pizzas.map((item) => {
        return {
          name: item.name,
          sauceId: item.sauceId,
          doughId: item.doughId,
          sizeId: item.sizeId,
          quantity: item.amount,
          ingredients: item.ingredients.map((ingredient) => {
            return {
              ingredientId: ingredient.id,
              quantity: ingredient.amount,
            };
          }),
        };
      });
      const misc = orderData.misc.map((item) => {
        return {
          miscId: item.id,
          quantity: item.amount,
        };
      });
      const order = {
        userId: orderData.userId,
        phone: orderData.phone,
        pizzas,
        misc,
        address: orderData.address,
      };

      try {
        await ordersService.create(order);
        if (rootGetters["Auth/isAuthed"]) {
          dispatch("getOrders");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async removeOrder({ rootGetters, dispatch }, id) {
      try {
        await ordersService.remove(id);
        if (rootGetters["Auth/isAuthed"]) {
          dispatch("getOrders");
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
