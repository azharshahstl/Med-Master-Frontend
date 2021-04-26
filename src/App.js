import React from 'react';
// import { connect } from 'react-redux';


import './App.css';
import HomePage from './HomePage/HomePage'
import SignUpModal from './UI/Modals/SignUpModal'
import LogInModal from './UI/Modals/LoginModal'
import CurrentMedications from './CurrentMedications/CurrentMedications'
import UsersMeds from './UsersMeds/UsersMeds';
import SignUpLogInModal from './UI/Modals/SignUpLoginModal'
import UserMainContent from './containers/UserMainContent';
import { Switch, Route, withRouter, Link} from 'react-router-dom';
import InitialMedsPage from './InitialMedsPageContainer/InitialMedsPage'

class App extends React.Component {

  state = {
    user: {},
    token: '',
    medications: [], 
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
    this.setState({
      [event.target.name]: event.target.value 
    })
  
  };

  registrationHandler = () => {
    this.setState({
      registrationStatus: true, 
      signUpModal: false
    })
  };

  journalUpdated = (journal) => {
    let newJournals = [...this.state.user.journals, {id: parseInt(journal.id), date: journal.attributes.date, entry: journal.attributes.entry}]
    let newUser = {...this.state.user}
    newUser.journals = newJournals
    this.setState({user: newUser})
  }

  addMedHandler = (medication) => {
    fetch('http://localhost:4000/api/v1/medicines')
    .then(res => res.json())
    .then(({data}) => {
      let match = data.filter(med => med.attributes.name === medication.medName && med.attributes['doctors_name'] === medication.doctorName)
      if (match[0]){
        this.createDosage(medication, match[0].id)
      } else {
        fetch('http://localhost:4000/api/v1/medicines', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({medicine: {name: medication.medName, 'doctors_name': medication.doctorName}})
        })
        .then(res => res.json())
        .then(({data}) => {
          let newMeds = [...this.state.user.medicines, {id: parseInt(data.id), name: data.attributes.name, 'doctors_name': data.attributes['doctors_name']}]
          let newUser = {...this.state.user}
          newUser.medicines = newMeds
          this.setState({user: newUser})
          this.createDosage(medication, data.id)
        })
      }
    })
  }

  createDosage = (medication,medId) => {
    let newDosage = {
      'user_id': parseInt(this.state.user.id),
      'medicine_id': parseInt(medId),
      amount: parseInt(medication.dosage),
      'start_date': medication.startDate
    }
    fetch('http://localhost:4000/api/v1/dosages', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({dosage: newDosage})
    })
    .then(res => res.json())
    .then(({data}) => {
      let newDose = [...this.state.user.dosages, {id: parseInt(data.id), 'user_id': data.attributes['user_id'], 'medicine_id': data.attributes['medicine_id'], amount: data.attributes.amount, 'start_date': data.attributes['start_date'], 'end_date': data.attributes['end_date']}]
      let newUser = {...this.state.user}
      newUser.dosages = newDose
      this.setState({user: newUser}, () => {
        console.log(this.state.user)
        this.props.history.push('/current_medications')
      })
    })
  }

  endDosage = (dosage, day) => {
    let newDosage = {...dosage}
    newDosage['end_date'] = day
    return fetch(`http://localhost:4000/api/v1/dosages/${dosage.id}`,{
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newDosage)
    })
    .then(res => res.json())
    .then(newDose => {
      let newDosages = [...this.state.user.dosages]
      let foundDose = newDosages.filter(dose => dose.id === newDose.id)[0]
      foundDose['end_date'] = newDose['end_date']
      let newUser = {...this.state.user}
      newUser.dosages = newDosages
      this.setState({user: newUser})
    })
  }

  changeDosage = (dosage, day, newAmount) => {
    let newDosage = {...dosage}
    newDosage['start_date'] = day
    newDosage.amount = newAmount
    if (newDosage.amount !== dosage.amount){
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
          let newDosages = [...this.state.user.dosages, {id: parseInt(data.id), 'user_id': data.attributes['user_id'], 'medicine_id': data.attributes['medicine_id'], amount: data.attributes.amount, 'start_date': data.attributes['start_date'], 'end_date': data.attributes['end_date']}]
          let newUser = {...this.state.user}
          newUser.dosages = newDosages
          this.setState({user: newUser})
        })
      })
   }
  }
  
  componentDidMount() {
    if(localStorage.token){  
      fetch('http://localhost:4000/api/v1/user_persist',{
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
      })
      .then(res => res.json())
      .then(json => this.userAuthResponse(json))
    }
  }

  userAuthResponse = (json) => {
    if (json.user){
      localStorage.token = json.token
      this.setState({
        user: {
          id: json.user.data.id,
          ...json.user.data.attributes
        },
        token: json.token,
        registrationStatus: true
      }, () => this.props.history.push(json.user.data.attributes.dosages.length ? '/current_medications' : '/add_medication'))
      
    }
  }

  userLogin = ({name, password, email}) => {
    let user = {
      name: name,
      password: password
    }

    fetch('http://localhost:4000/api/v1/user_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error){
        this.userAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  userSignUp = ({name, password, email}) => {
    let newUser = {
      name: name,
      password: password,
      email: email
    }
    
    fetch('http://localhost:4000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(json => {
      if (!json.error) {
        this.userAuthResponse(json)
      } else {
        alert(json.error)
      }
    })
  }

  renderUserLogin = () => {
    return <SignUpLogInModal login={true} userLogin={this.userLogin}/>
  }

  renderUserSignUp = () => {
    return <SignUpLogInModal login={false} userSignUp={this.userSignUp}/>
  }

  renderUserMainContent = () => {
    return <UserMainContent user ={this.state.user} token={this.state.token} />
  }

  render () {
    return (
      <div className="App">
         {/* <SignUpModal 
          showModal={this.state.signUpModal} 
          closeModal={this.cancelSignUpHandler}
          signUpInfo={this.signupInfoHandler}
          register={this.registrationHandler}
        /> */}
        {/* {this.state.registrationStatus ? (this.state.medications.length ? <CurrentMedications medications={this.state.medications} endDosage={this.endDosage} changeDosage={this.changeDosage}/> : <InitialMedsPage addMed={this.addMedHandler}/>): null}
        {this.state.registrationStatus ? null : <HomePage signup={this.signUpHandler} login={this.logInHandler}/>} */}

        {/* <UsersMeds user={this.state.name} medications={this.state.medications} /> */}
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/add_medication" render={() => <InitialMedsPage addMed={this.addMedHandler} logout={this.logoutHandler}/>}/>
          <Route path="/current_medications" render={() => <CurrentMedications medicines={this.state.user.medicines} userId={this.state.user.id} dosages={this.state.user.dosages} endDosage={this.endDosage} changeDosage={this.changeDosage} journalUpdated={this.journalUpdated}/>} />
          <Route path="/user_login" render={this.renderUserLogin}/>
          <Route path="/user_signup" render={this.renderUserSignUp}/>
          <Route path="/user_main" render={this.renderUserMainContent}/>
          <Route path="/all_meds" render={() => <UsersMeds name={this.state.user.name} medications={this.state.user.medicines} dosages={this.state.user.dosages} journals={this.state.user.journals} />}/>
        </Switch>
      </div>
    );
}};

export default withRouter(App);