import React from 'react';
import * as styles from './MedicineCard.module.css'

const MedicineCard = ({medicine}) => {
    return(
        <div className={styles.medicineCard}>
            <div className={styles.cardRow}>
                <span>{medicine.name}</span>
                <span>{medicine.dosage}</span>
            </div>
            <div className={styles.cardRow}>
                <span>Start Date</span>
                <span>{medicine.startDate}</span>
            </div>
            <div className={styles.cardRow}>
                <button>Delete Medication</button>
                <button>Change Dosage</button>
            </div>
        </div>
    )
}

export default MedicineCard