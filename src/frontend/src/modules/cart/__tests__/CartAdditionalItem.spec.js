import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";
import PlusMinus from "@/common/components/PlusMinus";
import miscData from "@/static/misc.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartAdditionalItem", () => {
  let store;
  let wrapper;

  const props = {
    item: miscData[0],
  };

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Добавляет доп.продукт в корзину", () => {
    createComponent({ localVue, store, propsData: props });
    wrapper.findComponent(PlusMinus).vm.$emit("plus");
    expect(store.state.Cart.misc).toEqual([{ id: miscData[0].id, amount: 1 }]);
  });

  it("Убирает доп.продукт из корзины", () => {
    createComponent({ localVue, store, propsData: props });
    const plusMinus = wrapper.findComponent(PlusMinus).vm;
    plusMinus.$emit("plus");
    plusMinus.$emit("plus");
    plusMinus.$emit("minus");
    expect(store.state.Cart.misc).toEqual([{ id: miscData[0].id, amount: 1 }]);
  });
});
