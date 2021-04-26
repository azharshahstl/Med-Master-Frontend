import React from 'react'
import classes from './UsersMeds.module.css'
import { useHistory } from 'react-router-dom'

const UsersMeds = props => {
  let history = useHistory()

  const { name, medications, dosages, journals } = props;
  
  if (medications){
    let formattedDosages = dosages.map(dose => {
      let med = medications.filter(med => med.id === dose['medicine_id'])[0]
      return({name: med.name, amount: dose.amount, startDate: dose['start_date']})
    })

    return (
      <>
        <div className={classes.Div}>
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
          <button  className={classes.Button} onClick={() => history.push('/current_medications')}>Back</button>
        </div>
      </>
    )
  } else {
    history.push('/')
    return(<></>)
  }
}

export default UsersMeds
