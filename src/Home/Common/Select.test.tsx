import React from "react";
import { shallow } from "enzyme";
import SelectEl from "./Select";
import { CURRENCYS } from "../../mockData";

describe("Select Element", () => {
  const mockFn = jest.fn();

  it("Loads the default Dropdown", () => {
    const wrapper = shallow(
      <SelectEl
        currentVal={CURRENCYS.EUR}
        optionLists={[CURRENCYS.EUR, CURRENCYS.GBP, CURRENCYS.USD]}
        onChange={mockFn}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("Loads the Dropdown", () => {
    const wrapper = shallow(
      <SelectEl
        currentVal={CURRENCYS.EUR}
        optionLists={[CURRENCYS.EUR, CURRENCYS.GBP, CURRENCYS.USD]}
        onChange={mockFn}
      />
    );
    const select = wrapper.find("select").at(0);
    expect(select.prop("value")).toBe(CURRENCYS.EUR);
    select.simulate("change", { target: { value: CURRENCYS.GBP } });
    expect(mockFn).toBeCalledWith(CURRENCYS.GBP);
  });
});
