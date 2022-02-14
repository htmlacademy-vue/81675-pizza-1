import { createLocalVue, mount } from "@vue/test-utils";
import OrderItemPizza from "@/modules/orders/OrderItemPizza";
import { generateMockStore } from "@/store/mocks";
import pizzaData from "@/static/pizza.json";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

const propsData = {
  pizza: {
    id: 1,
    name: "Пицца",
    doughId: pizzaData.dough[0].id,
    sizeId: pizzaData.sizes[0].id,
    sauceId: pizzaData.sauces[0].id,
    ingredients: [
      { id: pizzaData.ingredients[0].id, amount: 1 },
      { id: pizzaData.ingredients[1].id, amount: 1 },
    ],
    amount: 1,
  },
};

describe("OrderItemPizza", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(OrderItemPizza, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    store.commit("Public/setState", {
      dough: pizzaData.dough,
      sizes: pizzaData.sizes,
      sauces: pizzaData.sauces,
      ingredients: pizzaData.ingredients,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается имя пиццы", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("h2").text()).toEqual("Пицца");
  });

  it("Отображается размер и тесто", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("ul>li:nth-child(1)").text()).toBe("23 см, тонкое");
  });

  it("Отображается соус", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("ul>li:nth-child(2)").text()).toBe("Соус: томатный");
  });

  it("Отображается начинка", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("ul>li:nth-child(3)").text()).toBe(
      "Начинка: грибы, чеддер"
    );
  });

  it("Отображается цена", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find(".order__price").text()).toBe("425 ₽");
  });
});
