import addressService from "@/services/addressService";

export default {
  namespaced: true,
  state: {
    addresses: [],
    form: null,
  },
  mutations: {
    setState(state, newState) {
      Object.assign(state, newState);
    },
    startNewAddress(state) {
      state.form = {
        id: null,
        name: "",
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
    },
    editAddress(state, payload) {
      state.form = { ...payload };
    },
  },
  actions: {
    async fetchAddresses({ commit }) {
      const addresses = await addressService.getAll();
      commit("setState", { addresses });
    },
    async addAddress({ commit, dispatch }, payload) {
      try {
        await addressService.add(payload);
        commit("setState", { form: null });
        dispatch("fetchAddresses");
      } catch (e) {
        console.log(e);
      }
    },
    async editAddress({ commit, dispatch }, payload) {
      try {
        await addressService.edit(payload);
        commit("setState", { form: null });
        dispatch("fetchAddresses");
      } catch (e) {
        console.log(e);
      }
    },
    async removeAddress({ commit, dispatch }, payload) {
      try {
        await addressService.remove(payload);
        commit("setState", { form: null });
        dispatch("fetchAddresses");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
