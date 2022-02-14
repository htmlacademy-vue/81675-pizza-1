export default {
  namespaced: true,
  state: {
    selectedIngredients: [],
    selectedDoughId: 0,
    selectedSizeId: 0,
    selectedSauceId: 0,
    pizzaName: "",
    pizzaAmount: 1,
    pizzaId: "",
  },
  mutations: {
    ingredientAdd(state, id) {
      const builderItem = state.selectedIngredients.find(
        (item) => item.id === id
      );
      if (builderItem) {
        builderItem.amount++;
      } else {
        state.selectedIngredients.push({ id, amount: 1 });
      }
    },
    ingredientRemove(state, id) {
      const builderItem = state.selectedIngredients.find(
        (item) => item.id === id
      );
      builderItem.amount--;
      if (builderItem.amount <= 0) {
        state.selectedIngredients = state.selectedIngredients.filter(
          (item) => item.id !== id
        );
      }
    },
    setState(state, newState) {
      Object.assign(state, newState);
    },
  },
  getters: {
    selectedDough(state, getters, rootState, rootGetters) {
      return rootGetters["Public/doughById"](state.selectedDoughId);
    },
    selectedSize(state, getters, rootState, rootGetters) {
      return rootGetters["Public/sizeById"](state.selectedSizeId);
    },
    selectedSauce(state, getters, rootState, rootGetters) {
      return rootGetters["Public/sauceById"](state.selectedSauceId);
    },
    ingredientsPrice(state, getters, rootState, rootGetters) {
      return state.selectedIngredients.reduce((acc, item) => {
        const { price } = rootGetters["Public/ingredientById"](item.id);
        return acc + price * item.amount;
      }, 0);
    },
    totalPrice(state, getters, rootState, rootGetters) {
      const pizza = {
        doughId: state.selectedDoughId,
        sizeId: state.selectedSizeId,
        sauceId: state.selectedSauceId,
        ingredients: state.selectedIngredients,
        amount: state.pizzaAmount,
      };
      return rootGetters["Public/pizzaPrice"](pizza);
    },
  },
  actions: {
    async init({ commit, rootState }) {
      commit("setState", {
        selectedDoughId: rootState.Public.dough[0]?.id,
        selectedSizeId: rootState.Public.sizes[0]?.id,
        selectedSauceId: rootState.Public.sauces[0]?.id,
      });
    },
    editPizza({ commit }, pizza) {
      commit("setState", {
        selectedDoughId: pizza.doughId,
        selectedSizeId: pizza.sizeId,
        selectedSauceId: pizza.sauceId,
        selectedIngredients: pizza.ingredients,
        pizzaName: pizza.name,
        pizzaAmount: pizza.amount,
        pizzaId: pizza.id,
      });
    },
    resetState({ commit, rootState }) {
      commit("setState", {
        selectedDoughId: rootState.Public.dough[0]?.id,
        selectedSizeId: rootState.Public.sizes[0]?.id,
        selectedSauceId: rootState.Public.sauces[0]?.id,
        selectedIngredients: [],
        pizzaName: "",
        pizzaAmount: 1,
        pizzaId: "",
      });
    },
  },
};
