import React from "react";
import { shallow, mount } from "enzyme";
import Dashboard from "./Dashboard";
import ClassesSection from "./ClassesSection";
import StudentsSection from "./StudentsSection";

const mockState = {
  classList: [],
};

describe("rendering components", () => {
  // shallow(<Dashboard userClassList={[]} />).setState({classLIst: mockState.classList})
  it("renders Dashboard component without crashing", () => {
    shallow(<Dashboard />);
  });
  it("renders ClassesSection component without crashing", () => {
    mount(<ClassesSection />);
  });
  it("renders StudentsSection component without crashing", () => {
    shallow(<StudentsSection />);
  });
});

describe("checking state", () => {
  //const componentInstance = wrapper.instance();
  it("starts blank", () => {
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    expect(instance.state.classList).toBe(undefined);
    expect(instance.state.itemEditSelection).toBe("");
    expect(instance.state.itemEditId).toBe("");
    expect(instance.state.classSelection).toBe(undefined);
  });
  it("edits closed", () => {
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    expect(instance.state.showModal).toBe(false);
    expect(instance.state.edits).toBe(false);
    expect(instance.state.hasBeenEdited).toBe(false);
  });
});

describe("adding classes and students", () => {
  //const componentInstance = wrapper.instance();
  it("adds class", () => {
    //mount(<ClassesSection />);
    window.alert = jest.fn()
    const wrapper = mount(<ClassesSection />);
    const elem = wrapper.find('form');
   expect(elem.length).toBe(1)
    //elem.simulate('submit')
    //expect(window.alert).toHaveBeenCalledWith("Please enter a class name")
  });
  
});
