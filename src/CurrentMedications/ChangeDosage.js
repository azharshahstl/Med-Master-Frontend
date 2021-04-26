import React, {useState} from 'react'
import * as styles from './ChangeDosage.module.css'

const ChangeDosage = ({medicine, day, changeDosage, closeChangeDosage}) => {
    const [dosageData, setDosageData] = useState(medicine.dosage.amount)

    return (
        <div className={styles.changeDosageContainer}>
            <div className={styles.changeDosageCard}>
                <h3>Change dosage for {medicine.med.name}</h3>
                <input type="number" value={dosageData} onChange={(e) => setDosageData(e.target.value)}/>
                <div>
                    <button className={styles.entryBtns} onClick={(e) => {
                        changeDosage(medicine.dosage, day, dosageData)
                        closeChangeDosage()
                    }}>Save</button>
                    <button onClick={() => closeChangeDosage()} className={styles.entryBtns}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ChangeDosage