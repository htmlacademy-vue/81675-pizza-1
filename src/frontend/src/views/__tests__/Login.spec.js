import { generateMockStore } from "@/store/mocks";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "@/views/Login";

const localVue = createLocalVue();
localVue.use(Vuex);

const stubs = ["router-link"];

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

describe("Login", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(Login, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Заполняется форма аутентификации", async () => {
    const email = "foo@bar.com";
    const password = "123456";
    createComponent({ localVue, store, stubs, mocks });
    const emailInput = wrapper.find('input[name="email"]');
    await emailInput.setValue(email);
    const passwordInput = wrapper.find('input[name="pass"]');
    await passwordInput.setValue(password);
    await wrapper.find("form").trigger("submit.prevent");
    expect(store.dispatch).toHaveBeenCalledWith("Auth/login", {
      email,
      password,
    });
  });
});
