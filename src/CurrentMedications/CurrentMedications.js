import React, {useState} from 'react'
import MedicineCard from './MedicineCard'
import JournalEntry from './JournalEntry';

const CurrentMedications = ({medications}) => {
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

    let activeMedications = medications.filter(med => Date.parse(med.startDate) <= Date.parse(currentDay()) && (!med.endDate || Date.parse(med.endDate) >= Date.parse(currentDay())))

    return (
        <div style={styles.currentMedsContainer}>
            <div style={styles.headerContainer}>
                <h1>Current Medications</h1>
                <h2>Today's Date</h2>
                <h3>{currentDay()}</h3>
            </div>
            <div style={styles.medicinesContainer}>
                {activeMedications.map(med => <MedicineCard medicine={med}/>)}
            </div>
            <div style={styles.actionsContainer}>
                <button style={styles.actionBtns} onClick={() => setShowEntry(true)}>Make Journal Entry</button>
                <button style={styles.actionBtns}>Add a New Medication</button>
                <button style={styles.actionBtns}>View a List of All Meds Taken</button>
            </div>
            {showEntry ? <JournalEntry date={currentDay()} closeEntry={closeEntry}/> : <></>}
        </div>
    )
}

const styles = {
    currentMedsContainer: {
        height: '100vh'
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        overflow: 'hidden',
        borderStyle: 'solid',
        borderWidth: '1px'
    },
    medicinesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '55%',
        overflowY: 'auto',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderTop: 'none'
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '25%',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderTop: 'none'
    },
    actionBtns: {
        width: '50vh',
        height: '5vh',
        backgroundColor: 'darkslateblue',
        borderRadius: '15px',
        color: 'white',
        fontSize: '3vh'
    }
}

export default CurrentMedications