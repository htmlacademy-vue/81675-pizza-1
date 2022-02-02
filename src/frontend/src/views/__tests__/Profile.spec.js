import { createLocalVue, shallowMount } from "@vue/test-utils";
import Profile from "@/views/Profile";
import { generateMockStore } from "@/store/mocks";
import Vuex from "vuex";
import AddressList from "@/modules/profile/AddressList";
import AddressForm from "@/modules/profile/AddressForm";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Profile", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(Profile, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    store.commit = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Инициируется создание нового адреса", async () => {
    createComponent({ localVue, store });
    await wrapper.find("button").trigger("click");
    expect(store.commit).toHaveBeenCalledWith("Address/startNewAddress");
  });

  it("Отображается список адресов пользователя", () => {
    createComponent({ localVue, store });
    expect(wrapper.findComponent(AddressList).exists()).toBe(true);
  });

  it("Форма добавления адреса по умолчанию не отображается", () => {
    createComponent({ localVue, store });
    expect(wrapper.findComponent(AddressForm).exists()).toBe(false);
  });
});
