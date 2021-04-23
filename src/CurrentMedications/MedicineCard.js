import React from 'react';

const MedicineCard = ({medicine}) => {
    return(
        <div style={styles.medicineCard}>
            <p>{medicine.name}</p>
            <p>{medicine.dosage}</p>
            <p>{medicine.startDate}</p>
        </div>
    )
}

const styles = {
    medicineCard:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '10vh',
        height: '10vh',
        padding: '5vh',
        margin: '5vh',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'black',
        borderRadius: '15px',
        boxShadow: '10px 10px 8px #888888'
    }
}

export default MedicineCard