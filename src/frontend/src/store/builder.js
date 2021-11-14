import Api from "@/services/Api";

export default {
  namespaced: true,
  state: {
    isLoading: true,
    dough: [],
    sizes: [],
    sauces: [],
    ingredients: [],
    selectedDough: null,
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
      state.selectedDough = payload;
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
    resetState(state) {
      Object.assign(state, {
        selectedDough: state.dough[0],
        selectedSize: state.sizes[0],
        seletedSauce: state.sauces[0],
        pizzaName: "",
        pizzaAmount: 1,
        pizzaId: "",
      });
      state.ingredients.forEach((item) => (item.amount = 0));
    },
  },
  getters: {
    ingredientsPrice(state) {
      return state.ingredients.reduce((acc, item) => {
        return acc + item.price * item.amount;
      }, 0);
    },
    totalPrice(state, getters) {
      return (
        state.pizzaAmount *
        state.selectedSize.multiplier *
        (state.selectedDough?.price +
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
          id: state.selectedDough.id,
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
    async init({ commit }) {
      const [dough, sizes, sauces, ingredients] = await Promise.all([
        Api.fetchDough(),
        Api.fetchSizes(),
        Api.fetchSauces(),
        Api.fetchIngredients(),
      ]);
      const changes = {
        isLoading: false,
        dough,
        sizes,
        sauces,
        ingredients,
        selectedDough: dough[0],
        selectedSize: sizes[0],
        selectedSauce: sauces[0],
      };
      commit("setState", changes);
    },
    editPizza({ commit, state }, pizza) {
      const dough = state.dough.find((item) => item.id === pizza.dough.id);
      const size = state.sizes.find((item) => item.id === pizza.size.id);
      const sauce = state.sauces.find((item) => item.id === pizza.sauce.id);
      state.ingredients.forEach((item) => {
        const pizzaIngredient = pizza.ingredients.find(
          (pizzaIng) => item.id === pizzaIng.id
        );
        item.amount = pizzaIngredient ? pizzaIngredient.amount : 0;
      });
      commit("setState", {
        selectedDough: dough,
        selectedSize: size,
        selectedSauce: sauce,
        pizzaName: pizza.name,
        pizzaAmount: pizza.amount,
        pizzaId: pizza.id,
      });
    },
  },
};
