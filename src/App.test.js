import React from "react";
import App from "./App";
import { shallow, mount } from "enzyme";
import Header from "./NEW/components/Header";
import Footer from "./NEW/components/Footer";
import Signup from "./NEW/components/Signup";
import Login from "./NEW/components/Login";
import PrivateRoute from "./NEW/components/PrivateRoute";
import PublicRoute from "./NEW/components/PublicRoute";
import { Link } from "react-router-dom";
// import Home from "./NEW/pages/Home/Home";
// import Attendance from "./NEW/pages/Attendance/Attendance";
// import Dashboard from "./NEW/pages/Dashboard/Dashboard";
// import Records from "./NEW/pages/Records/Records";

const myState = {
  isLoggedIn: false,
  error: null,
  userName: null,
  userID: null,
  userClassList: [],
  userAttendanceRecord: [],
  email: "",
  password: "",
  passwordConfirm: "",
};

describe("rendering components", () => {
  it("renders App component without crashing", () => {
    shallow(<App />);
  });
  it("renders App component without crashing", () => {
    shallow(<Header />);
  });
  it("renders App component without crashing", () => {
    shallow(<Footer />);
  });
  it("renders App component without crashing", () => {
    shallow(<Signup />);
  });
  it("renders App component without crashing", () => {
    shallow(<Login />);
  });
  it("renders App component without crashing", () => {
    shallow(<PrivateRoute />);
  });
  it("renders App component without crashing", () => {
    shallow(<PublicRoute />);
  });
});

describe("checking state", () => {
  //const componentInstance = wrapper.instance();
  it("begins logged out", () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    expect(wrapper.state('isLoggedIn')).toBe(false);
  });
  it("registers login change", () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.changeLogIn();
    expect(wrapper.state('isLoggedIn')).toBe(true);

  });
  
});
