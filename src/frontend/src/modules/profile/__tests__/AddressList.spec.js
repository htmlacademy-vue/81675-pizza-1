import AddressList from "@/modules/profile/AddressList";
import { generateMockStore } from "@/store/mocks";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

const addresses = [
  {
    id: 1,
    name: "Адрес 1",
    street: "Ленина",
    building: 1,
    flat: 1,
    comment: "",
  },
];

describe("AddressList", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(AddressList, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    store.commit("Address/setState", { addresses });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Отображается список адресов", () => {
    createComponent({ store, localVue });
    expect(wrapper.findAll(".layout__address")).toHaveLength(addresses.length);
  });

  it("Редактирование адреса", async () => {
    createComponent({ store, localVue });
    await wrapper.find("button").trigger("click");
    expect(store.state.Address.form).toEqual(addresses[0]);
  });
});
