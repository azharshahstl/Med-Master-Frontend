import React from 'react';
import BackDrop from './BackDrop/BackDrop'
import classes from './Modal.module.css'


const signUpModal = (props) => {
    return (
        <>
            <BackDrop showModal={props.showModal} close={props.closeModal}/>
            <div className={classes.Modal}
                style={{transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.showModal ? '1' : '0'}}>
                <label>NAME: </label>
                <input type='text' placeholder='Your Name' name='name' onChange={props.signUpInfo}/>
                <label>EMAIL: </label>
                <input type='email' placeholder='Your Email' name='email' onChange={props.signUpInfo}/>
                <label>PASSWORD: </label>
                <input type='password' placeholder='Your Password' name='password' onChange={props.signUpInfo}/>
                <button className={classes.Button} onClick={props.register}>Register</button>
            </div>
        </>
    )}; 

export default signUpModal;