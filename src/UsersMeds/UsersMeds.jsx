import React from 'react'
import './UsersMeds.module.css'

const UsersMeds = props => {
  const { user, medications } = props;

  return (
    <>
      <h3>{user.name}'s Medications</h3>
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

export default UsersMeds
