import React from 'react';
import classes from './HomePage.module.css';

const homePage = (props) => {

    return (
        <div className={classes.Buttons} >
            <button onClick={props.signup}>Sign Up</button>
            <button onClick={props.login}>Log In</button>
        </div>
    )}; 

export default homePage;