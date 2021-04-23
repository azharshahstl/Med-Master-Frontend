import React from 'react';
import { connect } from 'react-redux';


import './App.css';
import HomePage from './HomePage/HomePage'
import SignUpModal from './UI/Modals/SignUpModal'
import LogInModal from './UI/Modals/LoginModal'

class App extends React.Component {

  render () {
    return (
      <>
        <SignUpModal />
        <LogInModal />
        <HomePage signup={this.signUpHandler} login={this.logInHandler}/> 
        
      </>
    );
}};

export default App;
