import addressService from "@/services/addressService";

export default {
  namespaced: true,
  state: {
    form: null,
  },
  mutations: {
    startNewAddress(state) {
      state.form = {
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
    },
  },
  actions: {
    async saveAddress(_, payload) {
      try {
        await addressService.saveAddress(payload);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
