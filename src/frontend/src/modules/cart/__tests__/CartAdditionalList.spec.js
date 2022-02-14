import { createLocalVue, mount } from "@vue/test-utils";
import CartAdditionalList from "@/modules/cart/CartAdditionalList";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import miscData from "@/static/misc.json";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartAdditionalList", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalList, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается список доп.продуктов", () => {
    store.commit("Public/setState", { misc: miscData });
    createComponent({ localVue, store });
    expect(wrapper.findAllComponents(CartAdditionalItem)).toHaveLength(
      miscData.length
    );
  });
});
