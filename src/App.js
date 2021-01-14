import React from "react";
import Header from "./totry/Header";
import Main from "./toplay/Main";
import Footer from "./totry/Footer"
import { Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
  }

  render() {  
    return (
      <div>
          <Header isLoggedIn={this.state.isLoggedIn}/>
          <Main />
          <Footer />
      </div>
    );
  }
}

export default App;
