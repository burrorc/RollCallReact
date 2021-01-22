import React from "react";
import { shallow, mount } from "enzyme";
import Dashboard from "./Dashboard";
import ClassesSection from "./ClassesSection";
import StudentsSection from "./StudentsSection";


describe("rendering components", () => {
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
  it("starts blank", () => {
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    expect(instance.state.classList).toBe(undefined);
    expect(instance.state.itemEditSelection).toBe("");
    expect(instance.state.itemEditId).toBe("");
    expect(instance.state.classSelection).toBe(undefined);
  });
  
});

describe("changing edit state", () => {
  const wrapper = shallow(<Dashboard />);
  const instance = wrapper.instance();
  
  it("opens edits", () => {
    instance.openEdits();
    expect(instance.state.edits).toBe(true);
  });
  it("closes edits", () => {
    instance.closeEdits();
    expect(instance.state.edits).toBe(false);
  });
  
});

describe("closes modal for edits", () => {
  const wrapper = shallow(<Dashboard />);
  const instance = wrapper.instance();
  instance.state.showModal = true
  it("closes modal", () => {
    instance.cancelEdit();
    expect(instance.state.showModal).toBe(false);
  });
  
});
