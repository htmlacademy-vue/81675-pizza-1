import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import CartAddressForm from "@/modules/cart/CartAddressForm";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartAddressForm", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(CartAddressForm, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Изменяется адрес в сторе", async () => {
    const propsData = {
      addressData: {
        street: "",
        building: "",
        flat: "",
      },
    };
    createComponent({ store, localVue, propsData });
    const streetInput = wrapper.find('input[name="street"]');
    const buildingInput = wrapper.find('input[name="house"]');
    const flatInput = wrapper.find('input[name="apartment"]');
    await streetInput.setValue("Ленина");
    expect(store.state.Orders.address).toEqual({
      street: "Ленина",
      building: "",
      flat: "",
    });
    await wrapper.setProps({
      addressData: {
        street: "Ленина",
        building: "",
        flat: "",
      },
    });
    await buildingInput.setValue("1");
    expect(store.state.Orders.address).toEqual({
      street: "Ленина",
      building: "1",
      flat: "",
    });
    await wrapper.setProps({
      addressData: {
        street: "Ленина",
        building: "1",
        flat: "",
      },
    });
    await flatInput.setValue("42");
    expect(store.state.Orders.address).toEqual({
      street: "Ленина",
      building: "1",
      flat: "42",
    });
  });
});
