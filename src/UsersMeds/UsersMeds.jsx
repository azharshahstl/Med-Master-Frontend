import React from 'react'
import './UsersMeds.module.css'

const UsersMeds = props => {
  const { name, medications } = props;

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

export default UsersMeds
