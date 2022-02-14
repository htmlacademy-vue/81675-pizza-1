import OrderItem from "@/modules/orders/OrderItem";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import miscData from "@/static/misc.json";
import pizzaData from "@/static/pizza.json";
import OrderItemPizza from "@/modules/orders/OrderItemPizza";

const localVue = createLocalVue();
localVue.use(Vuex);

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

const propsData = {
  order: {
    id: 1,
    orderPizzas: [
      {
        id: 1,
        sauceId: pizzaData.sauces[0].id,
        doughId: pizzaData.dough[0].id,
        sizeId: pizzaData.sizes[0].id,
        ingredients: [{ id: pizzaData.ingredients[0].id, amount: 1 }],
      },
    ],
    orderMisc: [{ id: miscData[0].id, amount: 1 }],
    orderAddress: {
      name: "Адрес",
    },
    phone: "+79123456789",
    addressId: 123,
  },
};

describe("OrderItem", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(OrderItem, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    store.commit("Public/setState", { misc: miscData });
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается список пицц", () => {
    createComponent({ localVue, store, propsData });

    expect(wrapper.findAllComponents(OrderItemPizza)).toHaveLength(
      propsData.order.orderPizzas.length
    );
  });

  it("Отображается список доп.продуктов", () => {
    createComponent({ localVue, store, propsData });

    expect(wrapper.findAll(".order__additional > li")).toHaveLength(
      propsData.order.orderMisc.length
    );
  });

  it("Отображается адрес доставки", () => {
    createComponent({ localVue, store, propsData });

    expect(wrapper.find(".order__address").text()).toBe(
      `Адрес доставки: ${propsData.order.orderAddress.name}`
    );
  });

  it("Заказ удаляется", async () => {
    createComponent({ localVue, store, propsData });
    await wrapper.find('[data-test="remove"]').trigger("click");
    expect(store.dispatch).toHaveBeenCalledWith(
      "Orders/removeOrder",
      propsData.order.id
    );
  });

  it("Можно повторить заказ", async () => {
    createComponent({ localVue, store, propsData, mocks });
    await wrapper.find('[data-test="reorder"]').trigger("click");
    expect(store.state.Cart.cart).toEqual(propsData.order.orderPizzas);
    expect(store.state.Cart.misc).toEqual(propsData.order.orderMisc);
    expect(store.state.Orders.userPhone).toEqual(propsData.order.phone);
    expect(store.state.Orders.addressId).toEqual(propsData.order.addressId);
    expect(store.state.Orders.isSelfDelivery).toEqual(false);
  });
});
