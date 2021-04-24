import React, {useState} from 'react'

const JournalEntry = ({date, closeEntry}) => {
    const [entryData, setEntryData] = useState('')

    return (
        <div style={styles.journalEntryContainer}>
            <div style={styles.journalEntryCard}>
                <h3>Journal Entry for {date}</h3>
                <textarea placeholder='How are you feeling today...' value={entryData} onChange={(e) => setEntryData(e.target.value)} style={styles.entryTextArea}/>
                <div>
                    <button style={styles.entryBtns}>Save</button>
                    <button onClick={() => closeEntry()} style={styles.entryBtns}>Discard</button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    journalEntryContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        zIndex: '100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    journalEntryCard: {
        height: '40vh',
        width: '50vw',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '3vh',
        boxShadow: '10px 10px 8px #888888',
        display: 'flex',
        flexDirection: 'column',
        
    },
    entryTextArea: {
        height: '75%'
    },
    entryBtns: {
        width: '50vh',
        height: '5vh',
        backgroundColor: 'darkslateblue',
        borderRadius: '15px',
        color: 'white',
        fontSize: '3vh'
    }
}

export default JournalEntry