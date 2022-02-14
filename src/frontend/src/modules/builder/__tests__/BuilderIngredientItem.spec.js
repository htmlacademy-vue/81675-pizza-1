import { createLocalVue, mount } from "@vue/test-utils";
import BuilderIngredientItem from "@/modules/builder/BuilderIngredientItem";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import pizzaData from "@/static/pizza.json";
import PlusMinus from "@/common/components/PlusMinus";

const localVue = createLocalVue();
localVue.use(Vuex);

const propsData = {
  item: pizzaData.ingredients[0],
};

describe("BuilderIngredientItem", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Инкремент", async () => {
    createComponent({ localVue, store, propsData });
    const plusMinus = wrapper.findComponent(PlusMinus);
    expect(plusMinus.props("value")).toBe(0);
    await plusMinus.vm.$emit("plus");
    expect(plusMinus.props("value")).toBe(1);
  });

  it("Декремент", async () => {
    createComponent({ localVue, store, propsData });
    const plusMinus = wrapper.findComponent(PlusMinus);
    expect(plusMinus.props("value")).toBe(0);
    await plusMinus.vm.$emit("plus");
    await plusMinus.vm.$emit("plus");
    await plusMinus.vm.$emit("minus");
    expect(plusMinus.props("value")).toBe(1);
  });
});
