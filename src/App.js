import React from 'react';
import { connect } from 'react-redux';


import './App.css';
import HomePage from './HomePage/HomePage'
import SignUpModal from './UI/Modals/SignUpModal'
import LogInModal from './UI/Modals/LoginModal'
import CurrentMedications from './CurrentMedications/CurrentMedications'

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
    }]
  }

  render () {
    return (
      <>
        {/* <SignUpModal />
        <LogInModal />
        <HomePage signup={this.signUpHandler} login={this.logInHandler}/>  */}
        <CurrentMedications medications={this.state.medications}/>
      </>
    );
}};

export default App;