import React from 'react'
import './UsersMeds.module.css'

const UsersMeds = props => {
  const { name, medications, dosages, journals } = props;

  let formattedDosages = dosages.map(dose => {
    let med = medications.filter(med => med.id === dose['medicine_id'])[0]
    return({name: med.name, amount: dose.amount, startDate: dose['start_date']})
  })
  
  return (
    <>
      <h3>{name}'s Medications</h3>
      <ul>
        {formattedDosages.map((medication, index) => {
          return (
            <li key={index}>
              {medication.name}: {medication.amount} | Start date: {medication.startDate}
            </li>
          )
        })}
      </ul>
      <h3>{name}'s Journals</h3>
      <ul>
        {journals.map((journal, index) => {
          return (
            <li key={index}>
              {journal.date}: {journal.entry}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default UsersMeds
