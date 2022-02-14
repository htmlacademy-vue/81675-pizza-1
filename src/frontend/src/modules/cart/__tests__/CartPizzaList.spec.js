import { createLocalVue, shallowMount } from "@vue/test-utils";
import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import CartPizzaList from "@/modules/cart/CartPizzaList";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartPizzaList", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(CartPizzaList, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается список CartPizzaItem", () => {
    store.commit("Cart/addToCart", { id: 1, amount: 1 });
    createComponent({ localVue, store });
    expect(wrapper.findAllComponents(CartPizzaItem).length).toBe(1);
  });
});
