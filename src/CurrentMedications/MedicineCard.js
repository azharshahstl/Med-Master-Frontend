import React from 'react';
import * as styles from './MedicineCard.module.css'

const MedicineCard = ({medicines, dosage, endDosage, day, openChangeDosage}) => {
    let med = medicines.filter(med => med.id === dosage['medicine_id'])[0]
    return(
        <div className={styles.medicineCard}>
            <div className={styles.cardRow}>
                <span>{med.name}</span>
                <span>{dosage.amount}</span>
            </div>
            <div className={styles.cardRow}>
                <span>Start Date</span>
                <span>{dosage['start_date']}</span>
            </div>
            <div className={styles.cardRow}>
                <button className={styles.Button} onClick={() => endDosage(dosage, day)}>Delete Medication</button>
                <button className={styles.Button} onClick={() => openChangeDosage(med, dosage)}>Change Dosage</button>
            </div>
        </div>
    )
}

export default MedicineCard