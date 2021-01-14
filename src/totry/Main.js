import React from 'react'

class Main extends React.Component{
    constructor(props){
        super(prop);
            this.state={
                isLoggedIn: true,
            };
    }
render(){
    return(
<div>
          <Signup
            // showSignup={this.state.showSignup}
            // switchModal={this.switchModal}
            // handleSignUp={this.handleSignUp}
            // handleChange={this.handleChange}
            // email={this.state.email}
            // password={this.state.password}
            // passwordConfirm={this.state.passwordConfirm}
            // error={this.state.error}
            // googleLogin={this.googleLogin}
            // facebookLogin={this.facebookLogin}
            // resetForm={this.resetForm}
          />
          <Login
            // showLogin={this.state.showLogin}
            // switchModal={this.switchModal}
            // handleLogin={this.handleLogin}
            // handleChange={this.handleChange}
            // email={this.state.email}
            // password={this.state.password}
            // passwordConfirm={this.state.passwordConfirm}
            // error={this.state.error}
            // googleLogin={this.googleLogin}
            // facebookLogin={this.facebookLogin}
            // resetForm={this.resetForm}
          />
          <Switch>
            <Route exact path="/" component={Home}/>
              {/* <Home />
            </Route> */}
            <Route path="/attendance">
              <Attendance
                // userID={this.state.userID}
                // userClassList={this.state.userClassList}
                // userAttendanceRecord={this.state.userAttendanceRecord}
              />
            </Route>
            <Route path="/records">
              <Records 
            //   userID={this.state.userID} userAttendanceRecord={this.state.userAttendanceRecord}
              />
            </Route>
            <Route path="/dashboard">
              <Dashboard 
            //   userID={this.state.userID} userClassList={this.state.userClassList}
              />
            </Route>
          </Switch>
          </div>
    )
}
    }

    export default Main
