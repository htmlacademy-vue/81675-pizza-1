import { createLocalVue, shallowMount } from "@vue/test-utils";
import CartPizzaItem from "@/modules/cart/CartPizzaItem";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import pizzaData from "@/static/pizza.json";
import PlusMinus from "@/common/components/PlusMinus";

const localVue = createLocalVue();
localVue.use(Vuex);

const propsData = {
  item: {
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

describe("CartPizzaItem", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(CartPizzaItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    store.commit("Public/setState", {
      dough: pizzaData.dough,
      sizes: pizzaData.sizes,
      sauces: pizzaData.sauces,
      ingredients: pizzaData.ingredients,
    });
    store.commit("Cart/addToCart", propsData.item);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается название пиццы", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("h2").text()).toBe("Пицца");
  });

  it("Отображается размер и тесто", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("ul>li:nth-child(1)").text()).toBe("23 см, Тонкое");
  });

  it("Отображается соус", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("ul>li:nth-child(2)").text()).toBe("Соус: Томатный");
  });

  it("Отображается начинка", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find("ul>li:nth-child(3)").text()).toBe(
      "Начинка: Грибы, Чеддер"
    );
  });

  it("Увеличивается количество пицц в корзине", () => {
    createComponent({ localVue, store, propsData });
    const plusMinus = wrapper.findComponent(PlusMinus);
    plusMinus.vm.$emit("plus");
    expect(store.state.Cart.cart[0].amount).toBe(2);
  });

  it("Можно редактировать пиццу в корзине", async () => {
    const mocks = {
      $router: {
        push: jest.fn(),
      },
    };
    createComponent({ localVue, store, propsData, mocks });
    await wrapper.find("button.cart-list__edit").trigger("click");
    expect(store.state.Builder).toEqual({
      selectedIngredients: propsData.item.ingredients,
      selectedDoughId: propsData.item.doughId,
      selectedSizeId: propsData.item.sizeId,
      selectedSauceId: propsData.item.sauceId,
      pizzaName: propsData.item.name,
      pizzaAmount: propsData.item.amount,
      pizzaId: propsData.item.id,
    });
  });
});
