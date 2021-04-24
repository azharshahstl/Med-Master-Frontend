import React from 'react';
// import { connect } from 'react-redux';


import './App.css';
import HomePage from './HomePage/HomePage'
import SignUpModal from './UI/Modals/SignUpModal'
import LogInModal from './UI/Modals/LoginModal'
import InitialMedsPage from './InitialMedsPage/InitialMedsPage'

class App extends React.Component {

  state = {
    user: {
      name: 'Azhar',
      email: 'a@a.com', 
      password: '123'
    }, 
    medications: [{
      name: 'Singular',
      dosage: '30mg', 
      startDate: '01/01/21'
    }, {
      name: 'Advair', 
      dosage: '500/25', 
      startDate: '03/23/21',
      endDate: '04/11/21'
    }], 
    signUpModal: false, 
    cancelSignUp: false, 
    registrationStatus: false
  };

  signUpHandler = () => {
    this.setState({signUpModal: true})
  };

  cancelSignUpHandler = () => {
    this.setState({signUpModal: false})
  };

  signupInfoHandler = (event) => {
    this.setState({ user: {
      [event.target.name]: event.target.value
    }})
  }

  registrationHandler = () => {
    this.setState({
      registrationStatus: true, 
      signUpModal: false
    })
  }

  render () {
    return (
      <>
        <SignUpModal 
          showModal={this.state.signUpModal} 
          closeModal={this.cancelSignUpHandler}
          signUpInfo={this.signupInfoHandler}
          register={this.registrationHandler}
        />
        {this.state.registrationStatus ? <InitialMedsPage /> : null}
        <LogInModal />
        <HomePage signup={this.signUpHandler} login={this.logInHandler}/> 
        
      </>
    );
}};

export default App;
