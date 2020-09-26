import React from "react";
import { shallow } from "enzyme";
import InputEl from "./Input";

describe("Input Element", () => {
  const mockFn = jest.fn();

  it("Loads the default Dropdown", () => {
    const wrapper = shallow(<InputEl value={10} onChange={mockFn} disabled />);
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.prop("placeholder")).toBe("Enter Amount");
    wrapper.simulate("change", {
      target: {
        value: 15,
      },
    });
    expect(mockFn).toBeCalledWith(15);
  });
});
