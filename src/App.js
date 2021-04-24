import React from 'react';
import { connect } from 'react-redux';


import './App.css';
import HomePage from './HomePage/HomePage'
import SignUpLogInModal from './UI/Modals/SignUpLoginModal'
import { Switch, Route, withRouter} from 'react-router-dom';

class App extends React.Component {

  state = {
    user: {
      name: '',
      email: '', 
      password: ''
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

  componentDidMount(){
    if(localStorage.token){  
      fetch('http://localhost:3000/user_persist',{
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

    fetch('http://localhost:3000/user_login', {
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
    
    fetch('http://localhost:3000/users', {
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

  render () {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/user_login" render={this.renderUserLogin}/>
          <Route path="/user_signup" render={this.renderUserSignUp}/>
          <Route path="/user_main" render={this.renderUserMainContent}/>
        </Switch>
      </div>
    );
}};

export default App;