import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import BuilderIngredientsSelector from "@/modules/builder/BuilderIngredientsSelector";
import pizzaData from "@/static/pizza.json";
import BuilderIngredientItem from "@/modules/builder/BuilderIngredientItem";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderIngredientSelector", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Рендерится список соусов", () => {
    store.commit("Public/setState", { sauces: pizzaData.sauces });
    createComponent({ localVue, store });
    const elements = wrapper.findAll('[data-test="sauce"]');
    expect(elements.length).toBe(pizzaData.sauces.length);
  });

  it("Выбирается соус", async () => {
    store.commit("Public/setState", { sauces: pizzaData.sauces });
    createComponent({ localVue, store });
    const elements = wrapper.findAll('[data-test="sauce"]');
    await elements.at(1).trigger("click");
    expect(store.state.Builder.selectedSauceId).toBe(2);
  });

  it("Рендерится список ингредиентов", () => {
    store.commit("Public/setState", { ingredients: pizzaData.ingredients });
    createComponent({ localVue, store });
    const items = wrapper.findAllComponents(BuilderIngredientItem);
    expect(items).toHaveLength(pizzaData.ingredients.length);
  });
});
