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

  it("Инкремент", () => {
    createComponent({ localVue, store, propsData });
    const plusMinus = wrapper.findComponent(PlusMinus);
    expect(wrapper.vm.amount).toBe(0);
    plusMinus.vm.$emit("plus");
    expect(wrapper.vm.amount).toBe(1);
  });

  it("Декремент", () => {
    createComponent({ localVue, store, propsData });
    const plusMinus = wrapper.findComponent(PlusMinus);
    expect(wrapper.vm.amount).toBe(0);
    plusMinus.vm.$emit("plus");
    plusMinus.vm.$emit("plus");
    plusMinus.vm.$emit("minus");
    expect(wrapper.vm.amount).toBe(1);
  });
});
