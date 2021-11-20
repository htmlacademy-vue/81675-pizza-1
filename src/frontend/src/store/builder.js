import publicService from "@/services/publicService";

export default {
  namespaced: true,
  state: {
    isLoading: true,
    dough: [],
    sizes: [],
    sauces: [],
    ingredients: [],
    selectedDoughId: 0,
    selectedSizeId: 0,
    selectedSauceId: 0,
    pizzaName: "",
    pizzaAmount: 1,
    pizzaId: "",
  },
  mutations: {
    setIngredients(state, payload) {
      state.ingredients = payload;
    },
    selectDough(state, payload) {
      state.selectedDoughId = payload;
    },
    selectSize(state, payload) {
      state.selectedSizeId = payload;
    },
    selectSauce(state, payload) {
      state.selectedSauceId = payload;
    },
    setPizzaName(state, payload) {
      state.pizzaName = payload;
    },
    setPizzaAmount(state, payload) {
      state.pizzaAmount = payload;
    },
    setPizzaId(state, payload) {
      state.pizzaId = payload;
    },
    ingredientAdd(state, payload) {
      payload.amount++;
    },
    ingredientRemove(state, payload) {
      payload.amount--;
    },
    ingredientAddById(state, payload) {
      const item = state.ingredients.find((item) => item.id === payload);
      item.amount++;
    },
    setState(state, newState) {
      Object.assign(state, newState);
    },
    resetState(state, rootState) {
      Object.assign(state, {
        selectedDoughId: rootState.Public.dough[0]?.id,
        selectedSizeId: rootState.Public.sizes[0].id,
        selectedSauceId: rootState.Public.sauces[0]?.id,
        pizzaName: "",
        pizzaAmount: 1,
        pizzaId: "",
      });
      state.ingredients.forEach((item) => (item.amount = 0));
    },
  },
  getters: {
    selectedDough(state, rootState, getters, rootGetters) {
      return rootGetters["Public/doughById"](state.selectedDoughId);
    },
    selectedSize(state, rootState, getters, rootGetters) {
      return rootGetters["Public/sizeById"](state.selectedSizeId);
    },
    selectedSauce(state, rootState, getters, rootGetters) {
      return rootGetters["Public/sauceById"](state.selectedSauceId);
    },
    ingredientsPrice(state) {
      return state.ingredients.reduce((acc, item) => {
        return acc + item.price * item.amount;
      }, 0);
    },
    totalPrice(state, getters) {
      return (
        state.pizzaAmount *
        getters.selectedSize.multiplier *
        (getters.selectedDough?.price +
          getters.selectedSauce.price +
          getters.ingredientsPrice)
      );
    },
    pizzaIngredients(state) {
      return state.ingredients.filter((item) => item.amount > 0);
    },
    pizzaObj(state, getters) {
      return {
        id: state.pizzaId,
        name: state.pizzaName,
        dough: {
          id: getters.selectedDough.id,
          name: getters.selectedDough.name,
          price: getters.selectedDough.price,
        },
        size: {
          id: getters.selectedSize.id,
          name: getters.selectedSize.name,
          multiplier: getters.selectedSize.multiplier,
        },
        sauce: {
          id: getters.selectedSauce.id,
          name: getters.selectedSauce.name,
          price: getters.selectedSauce.price,
        },
        ingredients: getters.pizzaIngredients,
        amount: state.pizzaAmount,
      };
    },
  },
  actions: {
    async init({ commit, rootState }) {
      const [ingredients, additional] = await Promise.all([
        publicService.fetchIngredients(),
        publicService.fetchAdditional(),
      ]);
      const changes = {
        isLoading: false,
        ingredients,
        selectedDoughId: rootState.Public.dough[0]?.id,
        selectedSizeId: rootState.Public.sizes[0]?.id,
        selectedSauceId: rootState.Public.sauces[0]?.id,
      };
      commit("setState", changes);
      commit("Cart/setState", { additional }, { root: true });
    },
    editPizza({ commit, state }, pizza) {
      state.ingredients.forEach((item) => {
        const pizzaIngredient = pizza.ingredients.find(
          (pizzaIng) => item.id === pizzaIng.id
        );
        item.amount = pizzaIngredient ? pizzaIngredient.amount : 0;
      });
      commit("setState", {
        selectedDoughId: pizza.dough.id,
        selectedSizeId: pizza.size.id,
        selectedSauce: pizza.sauce.id,
        pizzaName: pizza.name,
        pizzaAmount: pizza.amount,
        pizzaId: pizza.id,
      });
    },
  },
};
