import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Home } from "./Home";
import { demoPacketData } from "../mockData";
import Pocket from "./Pockets/Pockets";
import { Exchange } from "./Exchange/Exchange";
import { defaultState } from "./homeReducer";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;
describe("Home Element", () => {
  beforeAll(() => {
    store = mockStore({ ...defaultState });
    store.clearActions();
  });

  it("Loads the default Dropdown", () => {
    const wrapper = shallow(
      <Home
        gbpPocket={demoPacketData}
        usdPocket={demoPacketData}
        eurPocket={demoPacketData}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state("currentPage")).toBe("home");
    const pockets = wrapper.find(Pocket);
    expect(pockets).toHaveLength(3);

    expect(wrapper.find(".pockets-header")).toHaveLength(1);
    expect(wrapper.find(Exchange)).toHaveLength(0);
  });

  it("Change the nav options", async () => {
    const wrapper = shallow(
      <Home
        gbpPocket={demoPacketData}
        usdPocket={demoPacketData}
        eurPocket={demoPacketData}
      />
    );
    const navs = wrapper.find("nav");
    expect(navs).toHaveLength(2);
    navs.at(1).simulate("click");
    await wrapper.update();
    expect(wrapper.state("currentPage")).toBe("exchange");

    expect(wrapper.find(".pockets-header")).toHaveLength(0);
    expect(wrapper.find(Exchange)).toBeTruthy();

    navs.at(0).simulate("click");
    await wrapper.update();
    expect(wrapper.state("currentPage")).toBe("home");

    expect(wrapper.find(".pockets-header")).toHaveLength(1);
    expect(wrapper.find(Exchange)).toHaveLength(0);

    navs.at(0).simulate("click");
    await wrapper.update();
    expect(wrapper.state("currentPage")).toBe("home");
  });

  it("Loads the redux connect", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home
          gbpPocket={demoPacketData}
          usdPocket={demoPacketData}
          eurPocket={demoPacketData}
        />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
