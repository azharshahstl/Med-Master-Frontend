import classes from './InitialMedsPage.module.css';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

const InitialMedsPage = (props) => {
    let history = useHistory()

    const [medName, setMedName] = useState('')
    const [doctorName, setDoctorName] = useState('')
    const [dosage, setDosage] = useState(0)
    const [startDate, setStartDate] = useState('')

    const submitForm = (e) => {
        e.preventDefault()
        props.addMed({medName, doctorName, dosage, startDate})
    }
     
    const logout = () => {
        localStorage.clear() 
        return (<div>
                    <Redirect to='/'/>
                    alert{'You have logged out'}
                </div>)
    }

    return (
        <>
        <form>
            <div className={classes.MedInfo}>
                <label>Medication Name:</label>
                <input type='text' placeholder='medication name' name='name' value={medName} onChange={(e) => setMedName(e.target.value)} />
                <label>Doctor's Name:</label>
                <input type='text' placeholder="doctor's name" name='doctor' value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
                <label>Dosage:</label>
                <input type='text' placeholder='0' name='dosage' value={dosage} onChange={(e) => setDosage(e.target.value)} />
                <label>Start Date:</label>
                <input type='text' placeholder='MM/DD/YYYY' name='startDate' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <button className={classes.Button} onClick={submitForm}>Submit Medication</button>
            </div>
        </form> 
        <div className={classes.Div}>
            <button className={classes.Button} onClick={() => history.push('/current_medications')}>Back</button>
            <button className={classes.Button} onClick={logout}>Log Out</button>
         </div>
        </>
    )
}

export default InitialMedsPage;