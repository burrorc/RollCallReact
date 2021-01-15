import React from "react";
import Header from "./totry/Header";
import Main from "./totry/Main";
import Footer from "./totry/Footer"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
    };
    this.changeLogIn = this.changeLogIn.bind(this)
  }
  changeLogIn() {
    this.setState((prevState) => {
      return {
        isLoggedIn: !prevState.isLoggedIn,
      }
    
    });
  }  
  render() {  
    return (
      <div>
          <Header isLoggedIn={this.state.isLoggedIn} changeLogIn={this.changeLogIn}/>
          <Main isLoggedIn={this.state.isLoggedIn}/>
          <Footer />
      </div>
    );
  }
}

export default App;
