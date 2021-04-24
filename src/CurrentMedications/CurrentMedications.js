import React, {useState} from 'react'
import MedicineCard from './MedicineCard'
import JournalEntry from './JournalEntry';
import * as styles from './CurrentMedications.module.css'

const CurrentMedications = ({medications, endDosage}) => {
    const [showEntry, setShowEntry] = useState(false)

    const closeEntry = () => {
        setShowEntry(false)
    }

    const currentDay = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return mm + '/' + dd + '/' + yyyy;
    }

    let activeMedications = medications.filter(med => Date.parse(med.attributes['start_date']) <= Date.parse(currentDay()) && (!med.attributes['end_date'] || Date.parse(med.attributes['end_date']) > Date.parse(currentDay())))

    return (
        <div className={styles.currentMedsContainer}>
            <div className={styles.headerContainer}>
                <h1>Current Medications</h1>
                <h2>Today's Date</h2>
                <h3>{currentDay()}</h3>
            </div>
            <div className={styles.medicinesContainer}>
                {activeMedications.map(med => <MedicineCard medicine={med} endDosage={endDosage} day={currentDay()}/>)}
            </div>
            <div className={styles.actionsContainer}>
                <button className={styles.actionBtns} onClick={() => setShowEntry(true)}>Make Journal Entry</button>
                <button className={styles.actionBtns}>Add a New Medication</button>
                <button className={styles.actionBtns}>View a List of All Meds Taken</button>
            </div>
            {showEntry ? <JournalEntry date={currentDay()} closeEntry={closeEntry}/> : <></>}
        </div>
    )
}

export default CurrentMedications