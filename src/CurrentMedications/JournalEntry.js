import React from 'react'

const JournalEntry = ({date, closeEntry}) => {
    return (
        <div style={styles.journalEntryContainer}>
            <div style={styles.journalEntryCard}>
                <h3>Journal Entry for {date}</h3>
                <textarea placeholder='How are you feeling today...' style={styles.entryTextArea}/>
                <button>Save</button>
                <button onClick={() => closeEntry()}>Discard</button>
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
        flexDirection: 'column'
    },
    entryTextArea: {
        height: '75%'
    }
}

export default JournalEntry