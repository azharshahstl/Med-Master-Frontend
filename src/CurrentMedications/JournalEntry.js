import React, {useState} from 'react'
import * as styles from './JournalEntry.module.css'

const JournalEntry = ({date, closeEntry, userId, journalUpdated}) => {
    const [entryData, setEntryData] = useState('')

    const saveJournal = (e) => {
        e.target.innerHTML = 'Saving...'
        e.target.disabled = true
        let body = {
            date: date,
            entry: entryData,
            'user_id': userId
        }
        fetch('http://localhost:4000/api/v1/journals',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(({data}) => journalUpdated(data))
        .then(closeEntry())
    }

    return (
        <div className={styles.journalEntryContainer}>
            <div className={styles.journalEntryCard}>
                <h3>Journal Entry for {date}</h3>
                <textarea placeholder='How are you feeling today...' value={entryData} onChange={(e) => setEntryData(e.target.value)} className={styles.entryTextArea}/>
                <div className={styles.Div}>
                    <button className={styles.entryBtns} onClick={(e) => saveJournal(e)}>Save</button>
                    <button onClick={() => closeEntry()} className={styles.entryBtns}>Discard</button>
                </div>
            </div>
        </div>
    )
}

export default JournalEntry