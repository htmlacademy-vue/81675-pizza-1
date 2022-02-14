import { createLocalVue, shallowMount } from "@vue/test-utils";
import Cart from "@/views/Cart";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import pizzaData from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

const stubs = ["router-link"];

describe("Cart", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(Cart, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Создается заказ", async () => {
    const pizza = {
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
    };
    const orderData = {
      address: null,
      misc: [],
      phone: "",
      pizzas: [pizza],
      userId: "",
    };
    store.commit("Cart/addToCart", pizza);
    createComponent({ localVue, store, stubs });
    await wrapper.find("form").trigger("submit.prevent");

    expect(store.dispatch).toHaveBeenCalledWith(
      "Orders/createOrder",
      orderData
    );
    expect(store.state.Cart.isOrderComplete).toBe(true);
  });
});
