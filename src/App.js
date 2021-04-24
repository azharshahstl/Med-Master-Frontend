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
    medications: []
  }

  componentDidMount(){
    fetch('http://localhost:4000/api/v1/dosages')
    .then(res => res.json())
    .then(({data}) => this.setState({medications: data}))
  }

  endDosage = (dosage, day) => {
    let newDosage = {...dosage}
    newDosage.attributes['end_date'] = day
    return fetch(`http://localhost:4000/api/v1/dosages/${dosage.id}`,{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newDosage.attributes)
    })
    .then(res => res.json())
    .then(updatedDosage => {
      let newMedications = [...this.state.medications]
      let foundMed = newMedications.filter(med => med.id === updatedDosage.id)
      foundMed = updatedDosage
      this.setState({medications: newMedications})
    })
  }

  render () {
    return (
      <>
        {/* <SignUpModal />
        <LogInModal />
        <HomePage signup={this.signUpHandler} login={this.logInHandler}/>  */}
        <CurrentMedications medications={this.state.medications} endDosage={this.endDosage}/>
      </>
    );
}};

export default App;