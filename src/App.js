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

  changeDosage = (dosage, day, newAmount) => {
    let newDosage = {...dosage.attributes}
    newDosage['start_date'] = day
    newDosage.amount = newAmount
    if (newDosage.amount !== dosage.attributes.amount){
      this.endDosage(dosage, day)
      .then(() => {
        console.log('here')
        fetch('http://localhost:4000/api/v1/dosages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({dosage: newDosage})
        })
        .then(res => res.json())
        .then(({data}) => {
          let newMedications = [...this.state.medications, data]
          this.setState({medications: newMedications})
        })
      })
    }
  }

  render () {
    return (
      <>
        {/* <SignUpModal />
        <LogInModal />
        <HomePage signup={this.signUpHandler} login={this.logInHandler}/>  */}
        <CurrentMedications medications={this.state.medications} endDosage={this.endDosage} changeDosage={this.changeDosage}/>
      </>
    );
}};

export default App;