import React from 'react';
import * as styles from './MedicineCard.module.css'

const MedicineCard = ({medicine, endDosage, day, openChangeDosage}) => {

    return(
        <div className={styles.medicineCard}>
            <div className={styles.cardRow}>
                <span>{medicine.attributes.medicine.name}</span>
                <span>{medicine.attributes.amount}</span>
            </div>
            <div className={styles.cardRow}>
                <span>Start Date</span>
                <span>{medicine.attributes['start_date']}</span>
            </div>
            <div className={styles.cardRow}>
                <button onClick={() => endDosage(medicine, day)}>Delete Medication</button>
                <button onClick={() => openChangeDosage(medicine)}>Change Dosage</button>
            </div>
        </div>
    )
}

export default MedicineCard