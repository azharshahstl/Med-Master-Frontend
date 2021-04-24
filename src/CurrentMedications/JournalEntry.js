import React, {useState} from 'react'
import * as styles from './JournalEntry.module.css'

const JournalEntry = ({date, closeEntry}) => {
    const [entryData, setEntryData] = useState('')

    return (
        <div className={styles.journalEntryContainer}>
            <div className={styles.journalEntryCard}>
                <h3>Journal Entry for {date}</h3>
                <textarea placeholder='How are you feeling today...' value={entryData} onChange={(e) => setEntryData(e.target.value)} className={styles.entryTextArea}/>
                <div>
                    <button className={styles.entryBtns}>Save</button>
                    <button onClick={() => closeEntry()} className={styles.entryBtns}>Discard</button>
                </div>
            </div>
        </div>
    )
}

export default JournalEntry