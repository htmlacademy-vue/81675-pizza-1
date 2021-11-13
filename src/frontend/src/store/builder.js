import pizzaData from "@/static/pizza.json";

function initIngredients(ingredients) {
  return ingredients.map((item) => {
    const match = item.image.match(/(\w+).svg/);
    const nameEn = match?.[1] ?? "";
    return {
      ...item,
      nameEn,
      amount: 0,
    };
  });
}

export default {
  namespaced: true,
  state: {
    dough: pizzaData.dough,
    sizes: pizzaData.sizes,
    sauces: pizzaData.sauces,
    ingredients: initIngredients(pizzaData.ingredients),
    selectedDough: pizzaData.dough[0],
    selectedSize: pizzaData.sizes[0],
    selectedSauce: pizzaData.sauces[0],
    pizzaName: "",
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
    resetState(state) {
      state.selectedDough = pizzaData.dough[0];
      state.selectedSize = pizzaData.sizes[0];
      state.selectedSauce = pizzaData.sauces[0];
      state.pizzaName = "";
      state.ingredients = initIngredients(pizzaData.ingredients);
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
        state.selectedSize.multiplier *
        (state.selectedDough.price +
          state.selectedSauce.price +
          getters.ingredientsPrice)
      );
    },
  },
  actions: {
    editPizza({ commit }, pizza) {
      const dough = pizzaData.dough.find((item) => item.id === pizza.dough.id);
      const size = pizzaData.sizes.find((item) => item.id === pizza.size.id);
      const sauce = pizzaData.sauces.find((item) => item.id === pizza.sauce.id);
      const allIngredients = initIngredients(pizzaData.ingredients);
      pizza.ingredients.forEach((pizzaIngredient) => {
        const ingredient = allIngredients.find(
          (ingredient) => ingredient.id === pizzaIngredient.id
        );
        ingredient.amount = pizzaIngredient.amount;
      });
      commit("selectDough", dough);
      commit("selectSize", size);
      commit("selectSauce", sauce);
      commit("setPizzaName", pizza.name);
      commit("setIngredients", allIngredients);
    },
  },
};
