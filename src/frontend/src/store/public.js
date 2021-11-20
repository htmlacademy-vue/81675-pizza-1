import publicService from "@/services/publicService";

export default {
  namespaced: true,
  state: {
    dough: [],
  },
  mutations: {
    setState(state, newState) {
      Object.assign(state, newState);
    },
  },
  getters: {
    doughById(state) {
      return (id) => {
        return state.dough.find((item) => item.id === id);
      };
    },
  },
  actions: {
    async init({ commit }) {
      const dough = await publicService.fetchDough();
      commit("setState", { dough });
    },
  },
};
