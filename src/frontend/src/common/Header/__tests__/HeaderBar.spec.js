import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import HeaderBar from "@/common/Header/HeaderBar";
import { generateMockStore } from "@/store/mocks";
import HeaderAuthed from "@/common/Header/HeaderAuthed";
import HeaderGuest from "@/common/Header/HeaderGuest";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("HeaderBar", () => {
  const stubs = ["router-link"];

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(HeaderBar, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Корректно рендерится для неавторизованного пользователя", () => {
    createComponent({ stubs, store, localVue });
    const headerAuthed = wrapper.findComponent(HeaderAuthed);
    const headerGuest = wrapper.findComponent(HeaderGuest);
    expect(headerAuthed.exists()).toBe(false);
    expect(headerGuest.exists()).toBe(true);
  });

  it("Корректно рендерится для авторизованного пользователя", () => {
    store.commit("Auth/setState", { user: { id: 1 } });
    createComponent({ stubs, store, localVue });
    const headerAuthed = wrapper.findComponent(HeaderAuthed);
    const headerGuest = wrapper.findComponent(HeaderGuest);
    expect(headerAuthed.exists()).toBe(true);
    expect(headerGuest.exists()).toBe(false);
  });

  it("Показывает сумму товаров в корзине", () => {
    createComponent({ stubs, store, localVue });
    expect(wrapper.text()).toContain("0 ₽");
  });
});
