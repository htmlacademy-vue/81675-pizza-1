import { createLocalVue, shallowMount } from "@vue/test-utils";
import AddressForm from "@/modules/profile/AddressForm";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AddressForm", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(AddressForm, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    store.dispatch = jest.fn();
    store.commit("Address/startNewAddress");
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Сохраняется новый адрес", async () => {
    const address = {
      name: "Адрес 1",
      street: "Ленина",
      building: "1",
      flat: "1",
      comment: "",
    };

    store.commit("Address/setState", { form: address });
    createComponent({ store, localVue });
    await wrapper.find("form").trigger("submit.prevent");
    expect(store.dispatch).toHaveBeenCalledWith("Address/addAddress", {
      ...address,
      userId: "",
    });
  });

  it("Редактируется существующий адрес", async () => {
    const address = {
      id: 1,
      name: "Адрес 1",
      street: "Ленина",
      building: "1",
      flat: "1",
      comment: "",
    };

    store.commit("Address/setState", { form: address });
    createComponent({ store, localVue });
    await wrapper.find("form").trigger("submit.prevent");
    expect(store.dispatch).toHaveBeenCalledWith("Address/editAddress", {
      ...address,
      userId: "",
    });
  });

  it("Удаляется существующий адрес", async () => {
    const address = {
      id: 1,
      name: "Адрес 1",
      street: "Ленина",
      building: "1",
      flat: "1",
      comment: "",
    };

    store.commit("Address/setState", { form: address });
    createComponent({ store, localVue });
    await wrapper.find("button[data-test='remove']").trigger("click");
    expect(store.dispatch).toHaveBeenCalledWith(
      "Address/removeAddress",
      address
    );
  });
});
