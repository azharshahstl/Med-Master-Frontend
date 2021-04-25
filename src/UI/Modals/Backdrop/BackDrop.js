import React from 'react';
import classes from './BackDrop.module.css';

const backdrop = (props) => (
    props.showModal ? <div className={classes.Backdrop} onClick={props.close}></div> : null
    );

export default backdrop;