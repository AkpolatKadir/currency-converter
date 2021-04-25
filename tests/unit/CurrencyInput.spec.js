import { mount } from "@vue/test-utils";
import { findByTestAttr } from "@/utils/testUtils";

import CurrencyInput from "@/components/CurrencyInput";

const defaultProps = { title: "Mock Title", id: "Mock Id", value: "123" };

const factory = (props = {}) => {
  return mount(CurrencyInput, {
    propsData: {
      ...defaultProps,
      ...props,
    },
  });
};

describe("CurrencyInput", () => {
  it("renders a correct label", () => {
    const mockTitle = "Mock Title";
    const wrapper = factory({ title: mockTitle });
    const label = findByTestAttr(wrapper, "input-label");

    expect(label.text()).toEqual(mockTitle);
  });

  it("emits onFocus signal on input focus", async () => {
    const wrapper = factory();
    const input = findByTestAttr(wrapper, "input");
    await input.trigger("focus");
    expect(wrapper.emitted().focus).toBeTruthy();
  });

  it("input renders default props value", () => {
    const mockValue = "1234";
    const wrapper = factory({ value: mockValue });
    const input = findByTestAttr(wrapper, "input");
    expect(input.element.value).toEqual(mockValue);
  });
});
