import classes from './InitialMedsPage.module.css';
import React from 'react';

const initialMedsPage = (props) => {

    // onChangeHandler = () => {
    //     this.setState({

    //     })
    // }

    
    return (
        <form>
            <div className={classes.MedInfo}>
                <label>Medication Name:</label>
                <input type='text' placeholder='medication name' name='name' onChange={props.addMed} />
                <label>Dosage:</label>
                <input type='text' placeholder='medication name' name='dosage' onChange={props.addMed} />
                <label>Start Date:</label>
                <input type='text' placeholder='medication name' name='startDate' onChange={props.addMed} />
                <button>Submit Medication</button>
            </div>
        </form> 
    )
    }

export default initialMedsPage;