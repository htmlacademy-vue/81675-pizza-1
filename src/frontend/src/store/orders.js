export default {
  namespaced: true,
  state: {},
  actions: {
    createOrder(_, order) {
      console.log("create", order);
    },
  },
};
