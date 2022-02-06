import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import { ALL_PERSONS } from './helpers/queries'
import PhoneForm from './components/PhoneForm'

// const ALL_PERSONS = gql`
// query {
//   allPersons {
//     name
//     phone
//     id
//   }
// }
// `

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  /**
  * the use of the hook function useQuery is the dominant practice. 
  */
  const result = useQuery(ALL_PERSONS)

  /**
   * https://www.apollographql.com/docs/react/api/react/hooks/#result
   */
  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <Persons persons = {result.data.allPersons}/>
      <PersonForm setError={notify}/>
      <PhoneForm notify={notify}/>
    </div>

  )
}

export default App