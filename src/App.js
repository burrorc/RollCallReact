import React from "react";
import Header from "./toplay/Header";
import Main from "./toplay/Main";
import { BrowserRouter, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }
  isLoggedIn() {
    this.setState((prevState) => {
      return {
        authenticated: !prevState.authenticated,
      };
    });
  }

  render() {
    let displayLinks;
    if (this.state.authenticated) {
      displayLinks = (
        <div>
          <ul>
            <li>
              <Link to="/attendance">Attendance</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
      );
    } else {
      displayLinks = (
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div>
        <BrowserRouter>
          <Header displayLinks={displayLinks} isLoggedIn={this.isLoggedIn} />
          <Main authenticated={this.state.authenticated}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
