import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Orders from "@/views/Orders";
import { generateMockStore } from "@/store/mocks";
import OrderItem from "@/modules/orders/OrderItem";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Orders", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(Orders, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается история заказов", () => {
    store.commit("Orders/setState", { orders: [{ id: 1 }] });
    createComponent({ localVue, store });
    expect(wrapper.findAllComponents(OrderItem)).toHaveLength(1);
  });
});
