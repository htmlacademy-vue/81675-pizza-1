import Vuex from "vuex";
import BuilderPizzaView from "@/modules/builder/BuilderPizzaView";
import { generateMockStore } from "@/store/mocks";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import pizzaData from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается название пиццы", () => {
    store.commit("Builder/setState", { pizzaName: "Маргарита" });
    createComponent({ localVue, store });
    expect(wrapper.find("input").element.value).toBe("Маргарита");
  });

  it("Отображаются выбранные ингредиенты", () => {
    store.commit("Builder/ingredientAdd", pizzaData.ingredients[0].id);
    store.commit("Builder/ingredientAdd", pizzaData.ingredients[1].id);
    createComponent({ localVue, store });
    expect(wrapper.findAll(".pizza__filling").length).toBe(2);
  });

  it("Отображается цена пиццы", () => {
    store.commit("Public/setState", {
      sizes: pizzaData.sizes,
      sauces: pizzaData.sauces,
      ingredients: pizzaData.ingredients,
      dough: pizzaData.dough,
    });
    store.commit("Builder/setState", {
      selectedDoughId: pizzaData.dough[0].id,
      selectedSizeId: pizzaData.sizes[0].id,
      selectedSauceId: pizzaData.sauces[0].id,
    });
    store.commit("Builder/ingredientAdd", pizzaData.ingredients[0].id);
    createComponent({ localVue, store });
    expect(wrapper.find(".content__result p").text()).toBe("Итого: 383 ₽");
  });

  it("Пицца добавлятся в корзину", async () => {
    store.commit("Public/setState", {
      sizes: pizzaData.sizes,
      sauces: pizzaData.sauces,
      ingredients: pizzaData.ingredients,
      dough: pizzaData.dough,
    });
    store.commit("Builder/setState", {
      pizzaName: "Вьюпицца",
      selectedDoughId: pizzaData.dough[0].id,
      selectedSizeId: pizzaData.sizes[0].id,
      selectedSauceId: pizzaData.sauces[0].id,
    });
    store.commit("Builder/ingredientAdd", pizzaData.ingredients[0].id);
    createComponent({ localVue, store });
    await wrapper.find("button").trigger("click");
    expect(store.state.Cart.cart.length).toBe(1);
  });
});
