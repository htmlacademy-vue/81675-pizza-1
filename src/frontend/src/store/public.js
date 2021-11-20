import publicService from "@/services/publicService";

export default {
  namespaced: true,
  state: {
    dough: [],
    sizes: [],
    sauces: [],
    ingredients: [],
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
    sizeById(state) {
      return (id) => {
        return state.sizes.find((item) => item.id === id);
      };
    },
    sauceById(state) {
      return (id) => {
        return state.sauces.find((item) => item.id === id);
      };
    },
    ingredientById(state) {
      return (id) => {
        return state.ingredients.find((item) => item.id === id);
      };
    },
  },
  actions: {
    async init({ commit }) {
      const [dough, sizes, sauces, ingredients] = await Promise.all([
        publicService.fetchDough(),
        publicService.fetchSizes(),
        publicService.fetchSauces(),
        publicService.fetchIngredients(),
      ]);
      commit("setState", { dough, sizes, sauces, ingredients });
    },
  },
};
