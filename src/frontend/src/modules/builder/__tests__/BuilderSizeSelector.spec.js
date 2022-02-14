import Vuex from "vuex";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import BuilderSizeSelector from "@/modules/builder/BuilderSizeSelector";
import { generateMockStore } from "@/store/mocks";
import pizzaData from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Выбирается размер пиццы", async () => {
    store.commit("Public/setState", {
      sizes: pizzaData.sizes,
    });
    createComponent({ localVue, store });
    await wrapper.find("input").trigger("click");
    expect(store.state.Builder.selectedSizeId).toBe(pizzaData.sizes[0].id);
  });
});
