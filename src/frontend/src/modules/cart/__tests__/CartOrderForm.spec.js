import CartOrderForm from "@/modules/cart/CartOrderForm";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartOrderForm", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(CartOrderForm, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Изменяется номер телефона в сторе", async () => {
    createComponent({ localVue, store });
    const phoneInput = wrapper.find('input[name="tel"]');
    await phoneInput.setValue("+79123456789");
    expect(store.state.Orders.userPhone).toBe("+79123456789");
  });

  it("Инициализация deliveryOptionId для самовывоза", () => {
    createComponent({ localVue, store });
    expect(wrapper.vm.deliveryOptionId).toBe(-1);
  });

  it("Инициализация deliveryOptionId для нового адреса", () => {
    store.commit("Orders/setState", { isSelfDelivery: false });
    createComponent({ localVue, store });
    expect(wrapper.vm.deliveryOptionId).toBe(0);
  });

  it("Инициализация deliveryOptionId для существующего адреса", () => {
    store.commit("Orders/setState", { isSelfDelivery: false, addressId: 5 });
    createComponent({ localVue, store });
    expect(wrapper.vm.deliveryOptionId).toBe(5);
  });

  it("Самовывоз в сторе деактивируется при выборе нового адреса", async () => {
    createComponent({ localVue, store });
    const options = wrapper.findAll("option");
    await options.at(1).setSelected();
    expect(store.state.Orders.isSelfDelivery).toBe(false);
  });
});
