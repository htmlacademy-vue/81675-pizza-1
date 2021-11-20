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
    selectedSize: null,
    selectedSauce: null,
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
      state.selectedSize = payload;
    },
    selectSauce(state, payload) {
      state.selectedSauce = payload;
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
        selectedDoughId: rootState["Public/dough"][0]?.id,
        selectedSize: state.sizes[0],
        selectedSauce: state.sauces[0],
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
    ingredientsPrice(state) {
      return state.ingredients.reduce((acc, item) => {
        return acc + item.price * item.amount;
      }, 0);
    },
    totalPrice(state, getters) {
      return (
        state.pizzaAmount *
        state.selectedSize.multiplier *
        (getters.selectedDough?.price +
          state.selectedSauce.price +
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
          id: state.selectedDoughId,
          name: state.selectedDough.name,
          price: state.selectedDough.price,
        },
        size: {
          id: state.selectedSize.id,
          name: state.selectedSize.name,
          multiplier: state.selectedSize.multiplier,
        },
        sauce: {
          id: state.selectedSauce.id,
          name: state.selectedSauce.name,
          price: state.selectedSauce.price,
        },
        ingredients: getters.pizzaIngredients,
        amount: state.pizzaAmount,
      };
    },
  },
  actions: {
    async init({ commit, rootState }) {
      const [sizes, sauces, ingredients, additional] = await Promise.all([
        publicService.fetchSizes(),
        publicService.fetchSauces(),
        publicService.fetchIngredients(),
        publicService.fetchAdditional(),
      ]);
      const changes = {
        isLoading: false,
        sizes,
        sauces,
        ingredients,
        selectedDoughId: rootState.Public.dough[0]?.id,
        selectedSize: sizes[0],
        selectedSauce: sauces[0],
      };
      commit("setState", changes);
      commit("Cart/setState", { additional }, { root: true });
    },
    editPizza({ commit, state, rootGetters }, pizza) {
      const dough = rootGetters["Public/doughById"](pizza.dough.id);
      const size = state.sizes.find((item) => item.id === pizza.size.id);
      const sauce = state.sauces.find((item) => item.id === pizza.sauce.id);
      state.ingredients.forEach((item) => {
        const pizzaIngredient = pizza.ingredients.find(
          (pizzaIng) => item.id === pizzaIng.id
        );
        item.amount = pizzaIngredient ? pizzaIngredient.amount : 0;
      });
      commit("setState", {
        selectedDoughId: dough.id,
        selectedSize: size,
        selectedSauce: sauce,
        pizzaName: pizza.name,
        pizzaAmount: pizza.amount,
        pizzaId: pizza.id,
      });
    },
  },
};
