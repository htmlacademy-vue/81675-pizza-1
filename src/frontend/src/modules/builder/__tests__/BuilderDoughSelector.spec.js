import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import BuilderDoughSelector from "@/modules/builder/BuilderDoughSelector";
import { generateMockStore } from "@/store/mocks";
import pizzaData from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    store.commit("Public/setState", { dough: pizzaData.dough });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Рендерится список вариантов теста", () => {
    createComponent({ localVue, store });
    const elements = wrapper.findAll('[data-test="dough"]');
    expect(elements.length).toBe(pizzaData.dough.length);
  });

  it("Меняется выбранное тесто по клику", async () => {
    createComponent({ localVue, store });
    await wrapper.findAll("input").at(1).trigger("click");
    expect(store.state.Builder.selectedDoughId).toBe(pizzaData.dough[1].id);
  });
});
