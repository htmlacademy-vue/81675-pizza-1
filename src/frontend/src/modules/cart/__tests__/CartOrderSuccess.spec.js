import { createLocalVue, shallowMount } from "@vue/test-utils";
import CartOrderSuccess from "@/modules/cart/CartOrderSuccess";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartOrderSuccess", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(CartOrderSuccess, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Компонент не отображается если заказ не создан", () => {
    createComponent({ localVue, store });
    expect(wrapper.find(".popup").exists()).toBe(false);
  });

  it("Компонент отображается если заказ создан", () => {
    store.commit("Cart/setState", { isOrderComplete: true });
    createComponent({ localVue, store });
    expect(wrapper.find(".popup").exists()).toBe(true);
  });
});
