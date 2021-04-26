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
    name: '',
    email: '', 
    password: '', 
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

  addMedHandler = (event) => {
      const medsCopy = [...this.state.medications]
      let newMedObject = {}
      newMedObject[event.target.name] = event.target.value

      this.setState({
        medications: [...medsCopy,
          newMedObject
        ]
      })
  };

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
  
  componentDidMount() {
    if(localStorage.token){  
      fetch('http://localhost:4000/user_persist',{
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
      })
      .then(res => res.json())
      .then(json => this.userAuthResponse(json))
    } else {
      fetch('http://localhost:4000/api/v1/dosages')
      .then(res => res.json())
      .then(({data}) => this.setState({medications: data}))
    }
  }

  userAuthResponse = (json) => {
    if (json.user){
      localStorage.token = json.token
      this.setState({
        user: {
          id: json.user.data.attributes.id,
          name: json.user.data.attributes.name,
        },
        token: json.token
      }, () => this.props.history.push('/user_main'))
    }
  }

  userLogin = ({name, password, email}) => {
    let user = {
      name: name,
      password: password
    }

    fetch('http://localhost:4000/user_login', {
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
         <SignUpModal 
          showModal={this.state.signUpModal} 
          closeModal={this.cancelSignUpHandler}
          signUpInfo={this.signupInfoHandler}
          register={this.registrationHandler}
        />
        {this.state.registrationStatus ? <InitialMedsPage addMed={this.addMedHandler}/> : null}
        {/* <LogInModal /> */}
        {this.state.registrationStatus ? null : <HomePage signup={this.signUpHandler} login={this.logInHandler}/>}

        <UsersMeds user={this.state.name} medications={this.state.medications} />
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/current_medications" render={() => <CurrentMedications medications={this.state.medications} endDosage={this.endDosage} changeDosage={this.changeDosage}/>} />
          <Route path="/user_login" render={this.renderUserLogin}/>
          <Route path="/user_signup" render={this.renderUserSignUp}/>
          <Route path="/user_main" render={this.renderUserMainContent}/>
        </Switch>
      </div>
    );
}};

export default withRouter(App);