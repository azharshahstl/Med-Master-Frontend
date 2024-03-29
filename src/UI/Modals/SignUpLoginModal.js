import React from 'react';
import { Button, Card, Form, Input, Container, Col } from "reactstrap";
import classes from './SignUpLoginModal.module.css';

export default class SignUpLogInModal extends React.Component {

    state = {
        name: "",
        password: "",
        email: ""
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    generateSignUpForm = () => {
        return(
            <form className={classes.Form} onSubmit={(e) => {
                console.log(this)
                e.preventDefault()
                this.props.userSignUp(this.state)
            }}>
                <label>Name </label>
                <Input name="name" placeholder="Name" type="text" value={this.state.name} onChange={this.handleOnChange}/><br/>
                <label>Email </label>
                <Input name="email" placeholder="Email" type="email" value={this.state.email} onChange={this.handleOnChange}/><br/>
                <label>Password </label>
                <Input name="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleOnChange}/><br/>
                <button  type="submit">Sign Up</button>
                <button  onClick={() => window.location = "/"}>Go Back</button>
            </form>
        )
    }

    generateLoginForm = () => {
        return(
            <form className={classes.Form} onSubmit={(e) => {
                e.preventDefault()
                this.props.userLogin(this.state)
            }}>
                <label>Name </label>
                <Input name="name" placeholder="Name" type="text" value={this.state.name} onChange={this.handleOnChange}/><br/>
                <label>Password </label>
                <Input name="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleOnChange}/><br/><br/>
                <button >Login</button>
                <button onClick={() => window.location = "/"}>Go Back</button>
            </form>          
        )
    }

    render(){
        return(
        <div className={classes.Div}>
            <h3 className={classes.Header} >Welcome to the User Sign-Up/Log-In Page!</h3>
             {this.props.login ? this.generateLoginForm() : this.generateSignUpForm()}
        </div>
    )};

    // state = {
    //     name: "",
    //     password: "",
    //     email: ""
    // }

    // handleOnChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    // generateSignUpForm = () => {
    //     return(
    //         <Form className="register-form" onSubmit={(e) => {
    //             e.preventDefault()
    //             this.props.userSignUp(this.state)
    //         }}>
    //             <label>Name </label>
    //             <Input name="name" placeholder="Name" type="text" value={this.state.name} onChange={this.handleOnChange}/><br/>
    //             <label>Password </label>
    //             <Input name="password" placeholder="Password" type="password"  value={this.state.password} onChange={this.handleOnChange}/><br/>
    //             <label>Email </label>
    //             <Input name="email" placeholder="Email" type="email" value={this.state.email} onChange={this.handleOnChange}/><br/>
    //             <Button block className="login" variant='secondary' type="submit">Sign Up</Button>
    //             <Button block className="login" variant='secondary' onClick={() => window.location = "/"}>Go Back</Button>
    //         </Form>
    //     )
    // }

    // generateLoginForm = () => {
    //     return(
    //         <Form className="register-form" onSubmit={(e) => {
    //             e.preventDefault()
    //             this.props.userLogin(this.state)
    //         }}>
    //             <label>Name </label>
    //             <Input name="name" placeholder="Name" type="text" onChange={this.handleOnChange}/><br/>
    //             <label>Password </label>
    //             <Input name="password" placeholder="Password" type="password" onChange={this.handleOnChange}/><br/><br/>
    //             <Button block className="login" variant='secondary'>Login</Button>
    //             <Button block className="login" variant='secondary' onClick={() => window.location = "/"}>Go Back</Button>
    //         </Form>            
    //     )
    // }

    // render(){
    //     return(
    //     <div className="page-header">
    //         <Container>
    //             <Col className="ml-auto mr-auto" lg="4">
    //             <Card className="card-register ml-auto mr-auto">
    //                 <h3 className="title mx-auto">Welcome to the User Page!</h3>
    //                 {this.props.login ? this.generateLoginForm() : this.generateSignUpForm()}
    //             </Card>
    //             </Col>
    //         </Container>
    //     </div>
    // )};





}