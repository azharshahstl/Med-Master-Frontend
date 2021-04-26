import React, {useState} from 'react'
import MedicineCard from './MedicineCard'
import JournalEntry from './JournalEntry';
import ChangeDosage from './ChangeDosage'
import * as styles from './CurrentMedications.module.css'
import { useHistory } from 'react-router-dom'

const CurrentMedications = ({medicines, dosages, userId, endDosage, changeDosage, journalUpdated}) => {
    let history = useHistory()

    const [showEntry, setShowEntry] = useState(false)
    const [showChangeDosage, setShowChangeDosage] = useState(null)

    const closeEntry = () => {
        setShowEntry(false)
    }

    const openChangeDosage = (med, dosage) => {
        setShowChangeDosage({med, dosage})
    }

    const closeChangeDosage = () => {
        setShowChangeDosage(null)
    }

    const currentDay = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return mm + '/' + dd + '/' + yyyy;
    }

    if(dosages){
        let activeDosages = dosages.filter(dose => Date.parse(dose['start_date']) <= Date.parse(currentDay()) && !dose['end_date'] )
        return (
            <div className={styles.currentMedsContainer}>
                <div className={styles.headerContainer}>
                    <h1>Current Medications</h1>
                    <h2>Today's Date</h2>
                    <h3>{currentDay()}</h3>
                </div>
                <div className={styles.medicinesContainer}>
                    {activeDosages.map(dose => <MedicineCard medicines={medicines} dosage={dose} endDosage={endDosage} day={currentDay()} openChangeDosage={openChangeDosage}/>)}
                </div>
                <div className={styles.actionsContainer}>
                    <button className={styles.actionBtns} onClick={() => setShowEntry(true)}>Make Journal Entry</button>
                    <button className={styles.actionBtns} onClick={() => history.push('/add_medication')}>Add a New Medication</button>
                    <button className={styles.actionBtns} onClick={() => history.push('/all_meds')}>View a List of All Meds Taken</button>
                    <button className={styles.actionBtns} onClick={() => {history.push('/')
                                    localStorage.clear() 
                                    }}>Log Out</button>
                </div>
                {showEntry ? <JournalEntry date={currentDay()} closeEntry={closeEntry} userId={userId} journalUpdated={journalUpdated}/> : <></>}
                {showChangeDosage ? <ChangeDosage medicine={showChangeDosage} closeChangeDosage={closeChangeDosage} changeDosage={changeDosage} day={currentDay()}/> : <></>}
            </div>
        )
    } else {
        history.push('/')
        return(<></>)
    }
}

export default CurrentMedications