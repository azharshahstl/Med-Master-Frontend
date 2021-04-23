import React from 'react'

const CurrentMedications = () => {
    const currentDay = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        return mm + '/' + dd + '/' + yyyy;
    }
    return (
        <div>
            <div style={styles.currentMedHeader}>
                <h1>Current Medications</h1>
                <h2>Today's Date</h2>
                <h3>{currentDay()}</h3>
            </div>
            <div>
                Medicines Go Here
            </div>
            <div>
                Actions Go Here
            </div>
        </div>
    )
}

const styles = {
    currentMedHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '25%'
    }
}

export default CurrentMedications