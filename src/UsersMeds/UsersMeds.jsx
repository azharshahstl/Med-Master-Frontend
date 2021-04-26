import React from 'react'
import './UsersMeds.module.css'

const UsersMeds = props => {
  const { name, medications } = props;
  // console.log(props)
  // debugger

  if (medications !== undefined) {

    return (
      <> 
        <h3>{name}'s Medications</h3>
        <ul>
          {medications.map((medication, index) => {
            return (
              <li key={index}>
                {medication.name}: {medication.dosage} | Start date: {medication.startDate}
              </li>
            )
          })}
        </ul>
      </>
    )
  }
  else {
    return null
  }

}

export default UsersMeds
