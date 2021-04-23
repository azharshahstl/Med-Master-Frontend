import React from 'react';

const MedicineCard = ({medicine}) => {
    return(
        <div style={styles.medicineCard}>
            <div style={styles.cardRow}>
                <span>{medicine.name}</span>
                <span>{medicine.dosage}</span>
            </div>
            <div style={styles.cardRow}>
                <span>Start Date</span>
                <span>{medicine.startDate}</span>
            </div>
            <div style={styles.cardRow}>
                <button>Delete Medication</button>
                <button>Change Dosage</button>
            </div>
        </div>
    )
}

const styles = {
    medicineCard:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '30vh',
        height: '30vh',
        padding: '3vh',
        margin: '5vh',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'black',
        borderRadius: '15px',
        boxShadow: '10px 10px 8px #888888'
    },
    cardRow:{
        display: 'flex',
        justifyContent: 'space-between',
        width: 'inherit'
    }
}

export default MedicineCard