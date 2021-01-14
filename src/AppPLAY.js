import React from "react";
import Header from "./toplay/Header";
import Main from "./toplay/Main";
import { Link } from "react-router-dom";

let start;
if(localStorage.getItem('playIn')){
  start=true
  console.log(start)
}else{
  start=false
  console.log(start)
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: start,
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }
  isLoggedIn() {
    this.setState((prevState) => {
      return {
        authenticated: !prevState.authenticated,
      }
    
    });
    if(this.state.authenticated===true){
      console.log('yep')
      localStorage.setItem('playIn', true)
    }else{
      console.log('nope')
      localStorage.removeItem('playIn')
    }
  }

  render() {
    let displayLinks;
    if (this.state.authenticated) {
      displayLinks = (
        <div>
          <ul>
          <li>
              <Link to="/">Home</Link>
            </li>
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
          <Header displayLinks={displayLinks} isLoggedIn={this.isLoggedIn} />
          <Main authenticated={this.state.authenticated}/>
      </div>
    );
  }
}

export default App;
