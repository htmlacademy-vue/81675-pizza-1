import { mount } from "@vue/test-utils";
import PlusMinus from "@/common/components/PlusMinus";

describe("PlusMinus", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(PlusMinus, options);
  };

  const propsData = {
    value: 5,
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Устанавливает начальное значение", () => {
    createComponent({ propsData });
    const inputValue = wrapper.find("input").element.value;
    expect(Number(inputValue)).toBe(propsData.value);
  });

  it("Декремент", async () => {
    createComponent({ propsData });
    await wrapper.find("[data-test='minus']").trigger("click");
    expect(wrapper.emitted().minus).toBeTruthy();
  });

  it("Инкремент", async () => {
    createComponent({ propsData });
    await wrapper.find("[data-test='plus']").trigger("click");
    expect(wrapper.emitted().plus).toBeTruthy();
  });
});
